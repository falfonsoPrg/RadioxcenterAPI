const router = require('express').Router()

const Constantes = require("../middlewares/Constantes")
const ProcesoController = require('../controllers/ProcesoController')
const TipoDocumentoController = require('../controllers/TipoDocumentoController')
const UsuarioController = require('../controllers/UsuarioController')
const TransaccionController = require('../controllers/TransaccionController')
const TransaccionServicioController = require('../controllers/TransaccionServicioController')
const FacturaController = require('../controllers/FacturaController')
const TransaccionFactura = require('../controllers/TransaccionFacturaController')
const ConsentimientoController = require('../controllers/ConsentimientoController')
const NumeracionController = require('../controllers/NumeracionController')


const Mensajes = require('../middlewares/Mensajes')
const {CreateProcesoValidation,
    UpdateProcesoValidation,
    AgregarTutorValidation,
    AgregarTransaccionValidation,
    CreateUsuarioValidation} = require('../middlewares/Validation')

const Singleton = require('../services/ProcesosSingleton')
const singleton = new Singleton().getInstance()
const SingletonLogger = require('../services/Logger')
const logger = new SingletonLogger().getInstance()
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

        //Agregar el usuario a la bd
        const usuario = await UsuarioController.createUsuario( req.body )
        if(usuario.errors || usuario.name){
            return res.status(400).send({
                error: Mensajes.ErrorAlGuardar
            })
        }
    }else{
        await UsuarioController.updateUsuario( req.body )
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
    logger.log("Proceso crearConsentimiento INICIADO");

    const usuarioSingleton = singleton.getUsuario(req.body.documento_usuario)
    if(usuarioSingleton == undefined){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    logger.log("Usuario obtenido de la memoria");
    const usuario = await UsuarioController.getUsuarioPorDocumento( usuarioSingleton.data.documento_usuario )
    if(usuario.length == 0){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    logger.log("Usuario obtenido de la base de datos");

    const numeracionTransaccion = await NumeracionController.getNumeracion(Constantes.TRAN_CODE)
    usuarioSingleton.transaccion.numero_transaccion = numeracionTransaccion.numeracion_actual
    //Agregar una transacción
    const transaccion = await TransaccionController.createTransaccion(usuarioSingleton.transaccion)
    if(transaccion.errors || transaccion.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    logger.log("Transacción creada en la base de datos");

    await NumeracionController.aumentarNumeracion(Constantes.TRAN_CODE)
    //Agregar los servicios a la transaccion
    const tmpServicios = usuarioSingleton.transaccion.servicios
    tmpServicios.forEach( async (serv) => {
        await TransaccionServicioController.createTransaccionServicio({
            cod_servicio: serv.cod_servicio,
            cod_transaccion: transaccion.cod_transaccion
        })
    });
    logger.log("Servicios agregados a la transacción");

    //Agregar el consentimiento
    try {
        var matches = req.body.signature.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        if (matches.length !== 3) {
            return res.status(400).send({
                error: Mensajes.ErrorAlGuardarArchivo
            })
        }
        var rutas = []
        var dataToConsentimiento = Object.assign({}, usuarioSingleton.data)
        var tutorToConsentimiento = Object.assign({}, usuarioSingleton.tutor)
        pdfMaker.crearConsentimientoDatos(dataToConsentimiento, usuarioSingleton.data.tutor,tutorToConsentimiento,req.body.signature)
        if(usuarioSingleton.transaccion.consentimiento[Constantes.CONSENTIMIENTO_COVID] == true){
            dataToConsentimiento.tipoDocumento = usuario[0].Tipo_Documento.nombre_tipo_documento
            var rutaCovid;
            try {
                if(usuarioSingleton.data.tutor){
                    const tipoDocumentoTutor = await TipoDocumentoController.getTipoDocumento(usuarioSingleton.tutor.cod_tipo_documento)
                    usuarioSingleton.tutor.tipoDocumento = tipoDocumentoTutor.nombre_tipo_documento
                    rutaCovid = pdfMaker.crearConsentimientoCovidTutor(req.body.signature,dataToConsentimiento,tutorToConsentimiento,req.body.covid,req.body.responsable)
                }else{
                    rutaCovid = pdfMaker.crearConsentimientoCovid(req.body.signature,dataToConsentimiento,req.body.covid,req.body.responsable)
                }
            } catch (error) {
                console.log(error)
            }
            
            var consent = await ConsentimientoController.createConsentimiento({
                cod_tipo_consentimiento: Constantes.CONSENTIMIENTO_COVID,
                ubicacion_consentimiento: rutaCovid,
                cod_transaccion: transaccion.cod_transaccion
            })
            if(consent.errors || consent.name){
                return res.status(400).send({
                    error: Mensajes.ErrorAlGuardar
                })
            }
            logger.log("Consentimiento Covid creado");

            rutas.push(rutaCovid)
        }
        if(usuarioSingleton.transaccion.consentimiento[Constantes.CONSENTIMIENTO_INTRAORAL] == true){
            var dataToSendIntra = Object.assign({}, usuarioSingleton.data)
            var tutorToSendIntra = Object.assign({}, usuarioSingleton.tutor)
            var rutaIntra = pdfMaker.crearConsentimientoIntraoral(dataToSendIntra,tutorToSendIntra,req.body.signature,req.body.condiciones,req.body.responsable)
            var consentIntra = await ConsentimientoController.createConsentimiento({
                cod_tipo_consentimiento: Constantes.CONSENTIMIENTO_INTRAORAL,
                ubicacion_consentimiento: rutaIntra,
                cod_transaccion: transaccion.cod_transaccion
            })
            if(consentIntra.errors || consentIntra.name){
                return res.status(400).send({
                    error: Mensajes.ErrorAlGuardar
                })
            }
            logger.log("Consentimiento Intra oral creado");
            rutas.push(rutaIntra)
        }
        if(usuarioSingleton.transaccion.consentimiento[Constantes.CONSENTIMIENTO_EXTRAORAL] == true){
            var dataToSendExtra = Object.assign({},usuarioSingleton.data)
            var tutorToSendExtra = Object.assign({},usuarioSingleton.tutor)
            var rutaExtra = pdfMaker.crearConsentimientoExtraoral(dataToSendExtra,tutorToSendExtra,req.body.signature,req.body.condiciones,req.body.responsable)
            var consentIntra = await ConsentimientoController.createConsentimiento({
                cod_tipo_consentimiento: Constantes.CONSENTIMIENTO_EXTRAORAL,
                ubicacion_consentimiento: rutaExtra,
                cod_transaccion: transaccion.cod_transaccion
            })
            if(consentIntra.errors || consentIntra.name){
                return res.status(400).send({
                    error: Mensajes.ErrorAlGuardar
                })
            }
            logger.log("Consentimiento Extra oral creado");
            rutas.push(rutaExtra)
        }
        singleton.setConsentimiento(rutas, req.body.documento_usuario)
        if(usuarioSingleton.transaccion.paga_cliente == true){
            usuarioSingleton.transaccion.cod_entidad_doctor=null
        }

        if(usuarioSingleton.transaccion.paga_cliente || (usuarioSingleton.transaccion.tipo_compra != "Convenio" && (usuarioSingleton.transaccion.cod_entidad_doctor == 0 || usuarioSingleton.transaccion.cod_entidad_doctor==null))  ){
            const numeracionFactura = await NumeracionController.getNumeracion(Constantes.FPOS_CODE)
            var dataToSend = usuarioSingleton.data.tutor ? usuarioSingleton.tutor : usuario[0]
            const rutaFactura = PDFMaker.createFactura(dataToSend,usuarioSingleton.data.tutor,usuarioSingleton.procesos,numeracionFactura,"FPOS")
            logger.log("Factura creada en el servidor");
            singleton.setFactura(usuarioSingleton.data.documento_usuario, rutaFactura)
            var resumenFactura = ""
            usuarioSingleton.procesos.forEach(p => {
                resumenFactura += p.nombre_servicio + " "
            })
            const factura = await FacturaController.createFactura({
                ruta_factura: rutaFactura,
                numero_factura: numeracionFactura.numeracion_actual,
                resumen_factura: resumenFactura,
                documento_usuario: usuarioSingleton.data.documento_usuario,
                valor_total_factura: usuarioSingleton.transaccion.valor_transaccion,
                fecha_factura: new Date(),
                direccion_mac: usuarioSingleton.transaccion.ipv4,
                cod_tipo_pago: Constantes.TPAGO_EFECTIVO
            });
            if(factura.errors || factura.name){
                return res.status(400).send({
                    error: Mensajes.ErrorAlGuardar
                })
            }
            logger.log("Factura creada en la base de datos");
            await NumeracionController.aumentarNumeracion(Constantes.FPOS_CODE)
            const transaccionFactura = await TransaccionFactura.createTransaccionFactura({
                cod_transaccion: transaccion.cod_transaccion,
                cod_factura: factura.cod_factura
            })
            if(transaccionFactura.errors || transaccionFactura.name){
                return res.status(400).send({
                    error: Mensajes.ErrorAlGuardar
                })
            }
            logger.log("Agregada transaccion a la factura en la base de datos");
        }
        logger.log("Proceso crearConsentimiento TERMINADO");

        res.status(201).send();
    } catch (error) {
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