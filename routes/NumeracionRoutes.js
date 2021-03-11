const router = require('express').Router()
const NumeracionController = require('../controllers/NumeracionController')
const Mensajes = require('../middlewares/Mensajes')
//const {, } = require('../middlewares/Validation')

router.get('/:cod_numeracion', async(req,res)=>{
    /**
        #swagger.tags = ['Numeración']
        #swagger.path = '/numeracion/{cod_numeracion}'
        #swagger.description = 'Endpoint para obtener una numeracion'
     */
    const cod_numeracion = req.params.cod_numeracion
    const numeracion = await NumeracionController.getNumeracion(cod_numeracion)
    if(numeracion){
        return res.send({
            respuesta: numeracion
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['Numeración']
        #swagger.path = '/numeracion'
        #swagger.description = 'Endpoint para obtener numeraciones'
     */
    const numeraciones = await NumeracionController.getNumeraciones()
    if(numeraciones.length > 0){
        return res.send({
            respuesta: numeraciones
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})
router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Numeración']
        #swagger.path = '/numeracion'
        #swagger.description = 'Endpoint para crear una numeración.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Numeracion'
            }
        }]
     */
    // const {error} = Validation(req.body)
    // if(error) return res.status(422).send({
    //     error: error.details[0].message
    // })
    
    const numeracion = await NumeracionController.createNumeracion(req.body)
    if(numeracion.errors || numeracion.name){
        return res.status(400).send({
            error:Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Numeración']
        #swagger.path = '/numeracion'
        #swagger.description = 'Endpoint para editar una numeración.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Numeracion'
            }
        }]
     */
    // const {error} = Validacion(req.body)
    // if(error) return res.status(422).send({
    //     error: error.details[0].message
    // })
    const numeracion = await NumeracionController.updateNumeracion(req.body)
    if (numeracion[0]== 0 || numeracion.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router

