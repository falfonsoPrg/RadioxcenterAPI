const router = require('express').Router()
const ProcesoController = require('../controllers/ProcesoController')
const UsuarioController = require('../controllers/UsuarioController')
const TransaccionController = require('../controllers/TransaccionController')
const TransaccionServicioController = require('../controllers/TransaccionServicioController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateProcesoValidation, UpdateProcesoValidation} = require('../middlewares/Validation')
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
                $ref: '#/definitions/Usuario'
            }
        }]
     */
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
console.log("Buscando usuario en memoria")
    const usuarioSingleton = singleton.getUsuario(req.body.documento_usuario)
    if(usuarioSingleton == undefined){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }

    console.log("Usuario obtenido de la memoria")
    //Agregar el usuario a la bd
    const usuario = await UsuarioController.createUsuario( usuarioSingleton.data )
    console.log(usuario)
    if(usuario.errors || usuario.name){
console.log(usuario)
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    console.log("Usuario agregado en la BD")
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
    // const {error} = CreateConsentimientoValidation(req.body)
    // if(error) return res.status(422).send({
    //     error: error.details[0].message
    // })
    try {
        var matches = req.body.signature.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        if (matches.length !== 3) {
            return res.status(400).send({
                error: Mensajes.ErrorAlGuardarArchivo
            })
        }
        const ruta = pdfMaker.createPDF1(req.body.signature,usuarioSingleton.data)
        console.log("PDF Creado")
        //Si no es convenio entonces creo la factura, otherwise
        singleton.setConsentimiento(ruta, req.body.documento_usuario)
        console.log("Consentimiento actualizado en Singleton")
        res.send();
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