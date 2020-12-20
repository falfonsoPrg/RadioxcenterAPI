const router = require('express').Router()
const PaqueteController = require('../controllers/PaqueteController')
const PaqueteServicioController = require('../controllers/PaqueteServicioController')
const Mensajes = require('../middlewares/Mensajes')
const {CreatePaqueteValidation, UpdatePaqueteValidation} = require('../middlewares/Validation')

router.get('/:cod_paquete', async(req,res)=>{
    /**
        #swagger.tags = ['Paquetes']
        #swagger.path = '/paquetes/{cod_paquete}'
        #swagger.description = 'Endpoint para obtener un paquete'
     */
    const cod_paquete= req.params.cod_paquete
    const paquete = await PaqueteController.getPaquete(cod_paquete)
    if(paquete){
        return res.send({
            respuesta: paquete
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['Paquetes']
        #swagger.path = '/paquetes'
        #swagger.description = 'Endpoint para obtener paquetes'
     */
    const paquete = await PaqueteController.getPaquetes()
    if(paquete.length > 0) {
        return res.send({
            respuesta: paquete
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Paquetes']
        #swagger.path = '/paquetes'
        #swagger.description = 'Endpoint para crear un paquete.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Paquete'
            }
        }]
     */
    const {error} = CreatePaqueteValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const paquete = await PaqueteController.createPaquete(req.body)
    if( paquete.errors || paquete.name=="SequelizeDatabaseError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send({respuesta: paquete})
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Paquetes']
        #swagger.path = '/paquetes'
        #swagger.description = 'Endpoint para editar un paquete.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Paquete'
            }
        }]
     */
    const {error} = UpdatePaqueteValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const paquete = await PaqueteController.updatePaquete(req.body)
    if(paquete[0]==0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

router.get('/:cod_paquete/servicios', async(req,res)=>{
    /**
        #swagger.tags = ['Paquetes']
        #swagger.path = '/paquetes/{cod_paquete}/servicios'
        #swagger.description = 'Endpoint para obtener todos los servicios de un paquete'
     */
    const cod_paquete= req.params.cod_paquete
    const paqueteServicio = await PaqueteServicioController.getServiciosFromPaquetes(cod_paquete)
    if(paqueteServicio.length > 0) {
        return res.send({
            respuesta: paqueteServicio
        })
    }

})
router.get('/:cod_paquete/servicios/:cod_servicio', async(req,res)=>{
    /**
        #swagger.tags = ['Paquetes']
        #swagger.path = '/paquetes/{cod_paquete}/servicios/{cod_servicio}'
        #swagger.description = 'WIP - Endpoint para obtener un servicio de un paquete - WIP'
     */
    const bdy = {
        cod_paquete: req.params.cod_paquete,
        cod_servicio: req.params.cod_servicio
    }
})
router.post('/:cod_paquete/servicios/', async(req,res)=>{
    /**
        #swagger.tags = ['Paquetes']
        #swagger.path = '/paquetes/{cod_paquete}/servicios'
        #swagger.description = 'Endpoint para crear un servicio de un paquete.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                type:'object',
                properties:{
                    cod_servicio:{
                        type: 'string'
                    }
                }
            }
        }]
     */
    req.body.cod_paquete = req.params.cod_paquete
    const paqueteServicio = await PaqueteServicioController.createPaqueteServicio(req.body)
    if(paqueteServicio.errors || paqueteServicio.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})
router.delete('/:cod_paquete/servicios/:cod_servicio', async(req,res)=>{
    //Recibo 1 arreglo con los servicios que quedan finalmente req.body.servicios_paquete
})

module.exports = router