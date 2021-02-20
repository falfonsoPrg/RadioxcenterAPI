const router = require('express').Router()
const PaqueteController = require('../controllers/PaqueteController')
const PaqueteServicioController = require('../controllers/PaqueteServicioController')
const ServicioController = require('../controllers/ServicioController')
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

    //TODO: Crear el servicio que  comienze con PA
    const servicioPaquete = await ServicioController.createservicio({
        nombre_servicio: req.body.nombre_paquete,
        descripcion_servicio: req.body.nombre_paquete,
        precio_servicio: req.body.precio_paquete,
        iva_servicio: 0
    },"PA")
    const paquete = await PaqueteController.createPaquete(req.body)
    if( paquete.errors || paquete.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    if( servicioPaquete.errors || servicioPaquete.name){
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
    
    var valor_antiguo = req.body.valor_antiguo
    delete req.body.valor_antiguo

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
    if(valor_antiguo != ""){
        const servicio = await ServicioController.getServicioPorNombre("SE-"+valor_antiguo)
        if(!servicio[0]){
            return res.status(404).send({
                error: Mensajes.ErrorAlActualizar
            })
        }
        const updatedServicio = await ServicioController.updateServicio({
            nombre_servicio: "SE-"+req.body.nombre_paquete,
            cod_servicio: servicio[0].cod_servicio,
            precio_servicio: req.body.precio_paquete,
            descripcion_servicio: req.body.nombre_paquete
        })
        if(updatedServicio[0]==0){
            return res.status(404).send({
                error: Mensajes.ErrorAlActualizar
            })
        }
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
router.put('/:cod_paquete/servicios/', async(req,res)=>{
    /**
        #swagger.tags = ['Paquetes']
        #swagger.path = '/paquetes/{cod_paquete}/servicios'
        #swagger.description = 'Endpoint para editar los servicios de un paquete.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/EditarPaqueteServicio'
            }
        }]
     */
    const servicios_paquete = req.body.servicios_paquete
    const list_paquete = await ServicioController.getServicios();
    const error = servicios_paquete.every(element => list_paquete.find(x => x.cod_servicio == element));
    if(!error){
        return res.status(400).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    await PaqueteServicioController.removeAllServiciosFromPaquete(req.params.cod_paquete);
    for (let i = 0; i < servicios_paquete.length; i++) {
        const savedPaquete = await PaqueteServicioController.createPaqueteServicio({
            cod_servicio: servicios_paquete[i],
            cod_paquete: req.params.cod_paquete
        });
        if(savedPaquete.errors || savedPaquete.name){
            return res.status(400).send({
                error: Mensajes.ErrorAlActualizar
            })
        }
    }
    return res.status(204).send()
})

module.exports = router