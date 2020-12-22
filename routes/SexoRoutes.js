const router =  require('express').Router()
const SexoController = require('../controllers/SexoController')
const Mensajes = require ('../middlewares/Mensajes')
const {CreateSexoValidation, UpdateSexoValidation} = require('../middlewares/Validation')

router.get('/:cod_sexo' , async(req,res)=>{
    /**
        #swagger.tags = ['Sexos']
        #swagger.path = '/sexos/{cod_sexo}'
        #swagger.description = 'Endpoint para obtener un tipo de sexo'
     */
    const cod_sexo = req.params.cod_sexo
    const sexo = await SexoController.getSexo(cod_sexo)
    if (sexo) {
        return res.send({
            respuesta: sexo
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})
router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['Sexos']
        #swagger.path = '/sexos'
        #swagger.description = 'Endpoint para obtener tipos de sexo'
     */
    const sexos = await SexoController.getSexos()
    if (sexos.length > 0){
        return res.send({
            respuesta: sexos
        })
    }
})
router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Sexos']
        #swagger.path = '/sexos'
        #swagger.description = 'Endpoint para crear un tipo de sexo.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Sexo'
            }
        }]
     */
    const {error} = CreateSexoValidation(req.body)
    if (error) return res.status(422).send({
        error: error.details[0].message
    })
    
    const sexo = await SexoController.createSexo(req.body)
    if (sexo.errors || sexo.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Sexos']
        #swagger.path = '/sexos'
        #swagger.description = 'Endpoint para editar un tipo de sexo.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Sexo'
            }
        }]
     */
    const {error} = UpdateSexoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const sexo = await SexoController.updateSexo(req.body)
    if(sexo[0] == 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
    
})

module.exports = router