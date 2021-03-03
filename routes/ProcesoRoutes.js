﻿const router = require('express').Router()

const ProcesoController = require('../controllers/ProcesoController')
const TipoDocumentoController = require('../controllers/TipoDocumentoController')
const UsuarioController = require('../controllers/UsuarioController')
const TransaccionController = require('../controllers/TransaccionController')
const TransaccionServicioController = require('../controllers/TransaccionServicioController')
const FacturaController = require('../controllers/FacturaController')
const TransaccionFactura = require('../controllers/TransaccionFacturaController')
const ConsentimientoController = require('../controllers/ConsentimientoController')


const Mensajes = require('../middlewares/Mensajes')
const {CreateProcesoValidation,
    UpdateProcesoValidation,
    AgregarTutorValidation,
    CreateUsuarioValidation} = require('../middlewares/Validation')

const Singleton = require('../services/ProcesosSingleton')
const singleton = new Singleton().getInstance()
const pdfMaker = require("../services/PDFMaker")

router.get('/:cod_proceso', async(req,res)=>{
    /**
        #swagger.tags = ['Procesos-DEPRECATED']
        #swagger.path = '/procesos/{cod_proceso}'
        #swagger.description = 'Endpoint para obtener un proceso'
     */
    const cod_proceso = req.params.cod_proceso
    const proceso = await ProcesoController.getProceso(cod_proceso)

    if(proceso) {
        return res.send({
            respuesta: proceso
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['Procesos-DEPRECATED']
        #swagger.path = '/procesos'
        #swagger.description = 'Endpoint para obtener procesos'
     */
    const proceso = await ProcesoController.getProcesos()
    if(proceso.length > 0){
        return res.send({
            respuesta: proceso
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})
router.post('/crearUsuario', async(req,res)=>{
    /**
        #swagger.tags = ['Procesos']
        #swagger.path = '/procesos/crearUsuario'
        #swagger.description = 'Endpoint para crear un proceso a un usuario.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/UsuarioProceso'
            }
        }]
     */

    const {error} = CreateUsuarioValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    if(req.body.esNuevo){
        const existUser = await UsuarioController.getUsuarioPorDocumentoYCorreo(req.body.documento_usuario, req.body.correo_usuario)
        if(existUser.length > 0){
            return res.status(400).send({
                error: Mensajes.ErrorAlGuardar
            })
        }
    }
    
    const rta = singleton.setNewUsuario(req.body)
    if(rta) return res.status(202).send()
    return res.status(500).send({
        error: Mensajes.ErrorAlGuardar
    })
})
router.post('/agregarTutor', async(req,res)=>{
    /**
        #swagger.tags = ['Procesos']
        #swagger.path = '/procesos/agregarTutor'
        #swagger.description = 'Endpoint para agregar un tutor a un proceso de un usuario usuario.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Tutor'
            }
        }]
     */
    var doc = req.body.documento_usuario
    delete  req.body.documento_usuario

    const {error} = AgregarTutorValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const rta = singleton.setTutor(req.body, doc)
    if(rta) return res.status(202).send()
    return res.status(500).send({
        error: Mensajes.ErrorAlGuardar
    })
})
router.post('/agregarTransaccion', async(req,res)=>{
    /**
        #swagger.tags = ['Procesos']
        #swagger.path = '/procesos/agregarTransaccion'
        #swagger.description = 'Endpoint para agregar una transaccion a un proceso de un usuario usuario.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TransaccionProceso'
            }
        }]
     */

    const {error} = AgregarTransaccionValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })


    const rta = singleton.setTransaccion(req.body,req.body.documento_usuario)
    if(rta) return res.status(202).send()
    return res.status(500).send({
        error: Mensajes.ErrorAlGuardar
    })
})
router.post('/crearConsentimiento', async(req,res)=>{
    /**
        #swagger.tags = ['Procesos']
        #swagger.path = '/procesos/crearConsentimiento'
        #swagger.description = 'Endpoint para agregar un consentimiento a un proceso de un usuario usuario.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/ConsentimientoProceso'
            }
        }]
     */
    const usuarioSingleton = singleton.getUsuario(req.body.documento_usuario)
    if(usuarioSingleton == undefined){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    console.log("Usuario obtenido de la memoria")

    if(usuarioSingleton.data.esNuevo){
        //Agregar el usuario a la bd
        const usuario = await UsuarioController.createUsuario( usuarioSingleton.data )
        if(usuario.errors || usuario.name){
            console.log(usuario)
            return res.status(400).send({
                error: Mensajes.ErrorAlGuardar
            })
        }
        console.log("Usuario agregado en la BD")
    }

    const usuario = await UsuarioController.getUsuarioPorDocumento( usuarioSingleton.data.documento_usuario )
    if(usuario.length == 0){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    console.log("Usuario obtenido de la BD")
    

    //Agregar una transacción
    const transaccion = await TransaccionController.createTransaccion(usuarioSingleton.transaccion)
    if(transaccion.errors || transaccion.name){
    console.log(transaccion)
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    console.log("Transaccion agregado en la BD")
    //Agregar los servicios a la transaccion
    const tmpServicios = usuarioSingleton.transaccion.servicios
    tmpServicios.forEach( async (serv) => {
        await TransaccionServicioController.createTransaccionServicio({
            cod_servicio: serv.cod_servicio,
            cod_transaccion: transaccion.cod_transaccion
        })
    });
    console.log("Servicios agregados en la BD")

    //Agregar el consentimiento
    try {
        var matches = req.body.signature.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        if (matches.length !== 3) {
            return res.status(400).send({
                error: Mensajes.ErrorAlGuardarArchivo
            })
        }
        var dataToConsentimiento = usuarioSingleton.data
        dataToConsentimiento.tipoDocumento = usuario[0].Tipo_Documento.nombre_tipo_documento
        var ruta;
        if(usuarioSingleton.data.tutor){
            const tipoDocumentoTutor = await TipoDocumentoController.getTipoDocumento(usuarioSingleton.tutor.cod_tipo_documento)
            usuarioSingleton.tutor.tipoDocumento = tipoDocumentoTutor.nombre_tipo_documento
            ruta = pdfMaker.crearConsentimientoCovidTutor(req.body.signature,dataToConsentimiento,usuarioSingleton.tutor)
        }else{
            ruta = pdfMaker.crearConsentimientoCovid(req.body.signature,dataToConsentimiento)
        }
        var consent = await ConsentimientoController.createConsentimiento({
            cod_tipo_consentimiento: 1,
            ubicacion_consentimiento: ruta,
            cod_transaccion: transaccion.cod_transaccion
        })
        if(consent.errors || consent.name){
            console.log(consent)
            return res.status(400).send({
                error: Mensajes.ErrorAlGuardar
            })
        }
        singleton.setConsentimiento(ruta, req.body.documento_usuario)
        console.log("PDF consentimiento covid Creado")


        if(usuarioSingleton.transaccion.tipo_compra != "Convenio"){
            var dataToSend = usuarioSingleton.data.tutor ? usuarioSingleton.tutor : usuario[0]
            const rutaFactura = PDFMaker.createFactura(dataToSend,usuarioSingleton.data.tutor,usuarioSingleton.procesos,123456) //TODO
            const factura = await FacturaController.createFactura({
                ruta_factura: rutaFactura,
                numero_factura: 123456,
                documento_usuario: usuarioSingleton.data.documento_usuario,
                valor_total_factura: usuarioSingleton.transaccion.valor_transaccion,
                fecha_factura: new Date(),
                direccion_mac: "28:cf:da:01:ea:05",
                cod_tipo_pago: 1
            });
            if(factura.errors || factura.name){
                console.log(factura)
                return res.status(400).send({
                    error: Mensajes.ErrorAlGuardar
                })
            }
            console.log("Factura creada en la base de datos");
            const transaccionFactura = await TransaccionFactura.createTransaccionFactura({
                cod_transaccion: transaccion.cod_transaccion,
                cod_factura: factura.cod_factura
            })
            if(transaccionFactura.errors || transaccionFactura.name){
                console.log(transaccionFactura)
                return res.status(400).send({
                    error: Mensajes.ErrorAlGuardar
                })
            }
            console.log("Transacción agregada a la factura en la base de datos");
        }

        res.status(201).send();
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardarArchivo
        })
    }
})
router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Procesos-DEPRECATED']
        #swagger.path = '/procesos'
        #swagger.description = 'Endpoint para crear un proceso.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Proceso'
            }
        }]
     */
    const {error} = CreateProcesoValidation(req.body)
    if (error) return res.status(422).send({
        error: error.details[0].message
    })
    const proceso = await ProcesoController.createProceso(req.body)
    if(proceso.errors || proceso.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(202).send()
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Procesos-DEPRECATED']
        #swagger.path = '/procesos'
        #swagger.description = 'Endpoint para editar un proceso.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Proceso'
            }
        }]
     */
    const {error} = UpdateProcesoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const proceso = await ProcesoController.updateProceso(req.body)
    if( proceso[0]== 0 || proceso.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router