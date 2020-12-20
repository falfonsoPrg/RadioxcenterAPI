const router = require('express').Router()
const CiudadController = require('../controllers/CiudadController')
const Mensajes = require('../middlewares/Mensajes')
const { CreateCiudadValidation,UpdateCiudadValidation } = require('../middlewares/Validation')

router.get('/:cod_ciudad', async (req,res)=>{
    /**
        #swagger.tags = ['Ciudades']
        #swagger.path = '/ciudades/{cod_ciudad}'
        #swagger.description = 'Endpoint para obtener una ciudad'
     */
    const cod_ciudad = req.params.cod_ciudad
    const ciudad = await CiudadController.getCiudad(cod_ciudad)
    if(ciudad){
        return res.status(200).send({
            respuesta: ciudad
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['Ciudades']
        #swagger.path = '/ciudades'
        #swagger.description = 'Endpoint para obtener ciudades'
     */
    const ciudades = await CiudadController.getCiudades()
    if(ciudades.length > 0){
        return res.status(200).send({
            respuesta: ciudades
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['Ciudades']
        #swagger.path = '/ciudades'
        #swagger.description = 'Endpoint para registrar una ciudad.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Ciudad'
            }
        }]
     */
    const {error} = CreateCiudadValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const ciudad = await CiudadController.createCiudad(req.body)
    if(ciudad.errors || ciudad.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }

    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['Ciudades']
        #swagger.path = '/ciudades'
        #swagger.description = 'Endpoint para editar una ciudad.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Ciudad'
            }
        }]
     */
    const {error} = UpdateCiudadValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const ciudad = await CiudadController.updateCiudad(req.body);
    if(ciudad[0] == 0 || ciudad.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})


module.exports = router;