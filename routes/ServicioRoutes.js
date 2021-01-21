const router = require('express').Router()
const ServicioController = require('../controllers/ServicioController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateServicioValidation} = require('../middlewares/Validation')

router.get('/:cod_servicio', async(req,res)=>{
    /**
        #swagger.tags = ['Servicios']
        #swagger.path = '/servicios/{cod_servicio}'
        #swagger.description = 'Endpoint para obtener un servicio'
     */
    const cod_servicio = req.params.cod_servicio
    const servicio = await ServicioController.getServicio(cod_servicio)
    if(servicio){
        return res.send({
            respuesta: servicio
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})
router.get('/' , async(req,res)=>{
    /**
        #swagger.tags = ['Servicios']
        #swagger.path = '/servicios'
        #swagger.description = 'Endpoint para obtener servicios'
     */
    const excludeServicios = req.query.excludeServicios ? req.query.excludeServicios : 'false'
    const excludeConvenios = req.query.excludeConvenios ? req.query.excludeConvenios : 'false'
    const excludePaquetes = req.query.excludePaquetes ? req.query.excludePaquetes : 'false'

    const servicios = await ServicioController.getServicios(excludeServicios,excludeConvenios,excludePaquetes)
    if(servicios.length > 0){
        return res.send({
            respuesta: servicios
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=> {
    /**
        #swagger.tags = ['Servicios']
        #swagger.path = '/servicios'
        #swagger.description = 'Endpoint para crear un servicio.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Servicio'
            }
        }]
     */
    const {error} = CreateServicioValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const servicio = await ServicioController.createservicio(req.body)
    if(servicio.errors || servicio.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
        
    }
    return res.status(201).send()
})
router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Servicios']
        #swagger.path = '/servicios'
        #swagger.description = 'Endpoint para editar un servicio.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Servicio'
            }
        }]
     */
    const servicio = await ServicioController.updateServicio(req.body)
    if (servicio[0] == 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

//Rutas de la relación muchos a muchos con Paquetes  -- WIP

// router.get('/:cod_servicio/paquetes', async(req,res)=>{

// })
// router.get('/:cod_servicio/paquetes/:cod_paquete', async(req,res)=>{

// })
// router.post('/:cod_servicio/paquetes/', async(req,res)=>{

// })
// router.delete('/:cod_servicio/paquetes/:cod_paquete', async(req,res)=>{

// })
module.exports = router