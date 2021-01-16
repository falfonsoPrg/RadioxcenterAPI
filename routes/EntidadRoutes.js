const router = require('express').Router()
const EntidadController = require('../controllers/EntidadController')
const ConvenioController = require('../controllers/ConvenioController')
const ServicioController = require('../controllers/ServicioController')
const Mensajes = require('../middlewares/Mensajes')
const {UpdateEntidadValidation, CreateEntidadvalidation} = require('../middlewares/Validation')

router.get('/convenios', async(req,res)=>{
    /**
        #swagger.tags = ['Entidades']
        #swagger.path = '/entidades/convenios'
        #swagger.description = 'Endpoint para obtener todos los convenios de todas las entidades'
     */
    const convenios = await EntidadController.getAllFromEntidad();
    if(convenios.length > 0) {
        return res.send({
            respuesta: convenios
        })
    }
    return res.status(400).send()
})

router.get('/:cod_entidad', async(req,res) =>{
    /**
        #swagger.tags = ['Entidades']
        #swagger.path = '/entidades/{cod_entidad}'
        #swagger.description = 'Endpoint para obtener una entidad'
     */
    const cod_entidad = req.params.cod_entidad
    const entidad = await EntidadController.getEntidad(cod_entidad)
    if (entidad){
        return res.send({
            respuesta: entidad
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['Entidades']
        #swagger.path = '/entidades'
        #swagger.description = 'Endpoint para obtener entidades'
     */
    const entidad = await EntidadController.getEntidades()
    if(entidad.length > 0) {
        return res.send({
            respuesta: entidad
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Entidades']
        #swagger.path = '/entidades'
        #swagger.description = 'Endpoint para crear una entidad.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Entidad'
            }
        }]
     */
    const {error} = CreateEntidadvalidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const entidad = await EntidadController.createEntidad(req.body)
    if( entidad.errors || entidad.name) {
        console.log(entidad.name)
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Entidades']
        #swagger.path = '/entidades'
        #swagger.description = 'Endpoint para editar una entidad.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Entidad'
            }
        }]
     */
    const {error} = UpdateEntidadValidation(req.body)
    if (error) return res.status(422).send({
        error: error.details[0].message
    })
    const entidad = await EntidadController.updateEntidad(req.body)
    if(entidad[0]==0 || entidad.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

router.get('/:cod_entidad/convenios', async(req,res)=>{
    /**
        #swagger.tags = ['Entidades']
        #swagger.path = '/entidades/{cod_entidad}/convenios'
        #swagger.description = 'Endpoint para obtener todos los convenios de  una entidad'
     */
    const cod_entidad = req.params.cod_entidad
    const convenios = await ConvenioController.getConveniosFromEntidades(cod_entidad)
    if(convenios.length > 0) {
        return res.send({
            respuesta: convenios
        })
    }
    return res.status(404).send()
})

router.put('/:cod_entidad/convenios/', async(req,res)=>{
    /**
        #swagger.tags = ['Entidades']
        #swagger.path = '/entidades/{cod_entidad}/convenios'
        #swagger.description = 'Endpoint para editar los convenios de una entidad.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/EditarConvenioEntidad'
            }
        }]
     */
    const servicios_convenio = req.body.servicios_convenio
    const valores_servicios = req.body.valores_servicios
    const list = await ServicioController.getServicios()
    const error = servicios_convenio.every(element => list.find(x => x.cod_servicio == element));
    if(!error){
        return res.status(400).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    //Remove all convenios
    await ConvenioController.deleteAllServiciosFromEntidad(req.params.cod_entidad)
    //Iterate through servicios_convenio adding them
    for (let i = 0; i < servicios_convenio.length; i++) {
        const savedConvenio = await ConvenioController.createConvenio({
            cod_servicio: servicios_convenio[i],
            cod_entidad: req.params.cod_entidad,
            valor_servicio: valores_servicios[i],
            fecha_inicial_convenio: req.body.fecha_inicial_convenio,
            fecha_final_convenio: req.body.fecha_final_convenio
        });
        if(savedConvenio.errors || savedConvenio.name){
            return res.status(400).send({
                error: Mensajes.ErrorAlActualizar
            })
        }
    }
    return res.status(204).send()
})

router.put('/:cod_entidad/convenios/:cod_servicio', async(req,res)=>{
    /**
        #swagger.tags = ['Entidades']
        #swagger.path = '/entidades/{cod_entidad}/convenios/{cod_servicio}'
        #swagger.description = 'Endpoint para editar un servicio de un convenio con una entidad.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/ConvenioUpdate'
            }
        }]
     */
    

    let entidad = await ConvenioController.getConveniosPorEntidadYServicio(req.params.cod_entidad, req.params.cod_servicio)
    let entidadAux = {
        cod_convenio: entidad.cod_convenio,
        valor_servicio: req.body.valor_servicio,
        fecha_inicial_convenio: req.body.fecha_inicial_convenio,
        fecha_final_convenio: req.body.fecha_final_convenio,
        cod_servicio: req.params.cod_servicio,
        cod_entidad: req.params.cod_entidad
    } 

    entidad = await ConvenioController.updateConvenio(entidadAux)
    
    if(entidad[0]==0 || entidad.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router