const router = require('express').Router()
const ProcesoController = require('../controllers/ProcesoController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateProcesoValidation, UpdateProcesoValidation} = require('../middlewares/Validation')
const Singleton = require('../services/ProcesosSingleton')
const singleton = new Singleton().getInstance()
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
    singleton.setNewUsuario(req.body)
    res.send("Ok")
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
    singleton.setTutor(req.body, doc)
    res.send("Ok")
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
    singleton.setTransaccion(req.body,req.body.documento_usuario)
    res.send("Ok")
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