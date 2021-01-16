const router = require('express').Router()
const ConvenioController = require('../controllers/ConvenioController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateConvenioValidation, UpdateConvenioValidation} = require('../middlewares/Validation')

router.get('/:cod_convenio', async(req,res)=>{
    /**
        #swagger.tags = ['Convenios']
        #swagger.path = '/convenios/{cod_convenio}'
        #swagger.description = 'Endpoint para obtener un convenio'
     */
    const cod_convenio = req.params.cod_convenio
    const convenio = await ConvenioController.getConvenio(cod_convenio)
    if(convenio){
        return res.send({
            respuesta: convenio
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['Convenios']
        #swagger.path = '/convenios'
        #swagger.description = 'Endpoint para obtener convenios'
     */
    const convenio = await ConvenioController.getConvenios()
    if(convenio.length > 0){
        return res.send({
            respuesta: convenio
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Convenios']
        #swagger.path = '/convenios'
        #swagger.description = 'Endpoint para registrar un convenio.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Convenio'
            }
        }]
     */
    const {error} = CreateConvenioValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const convenio = await ConvenioController.createConvenio(req.body)
    if(convenio.errors || convenio.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Convenios']
        #swagger.path = '/convenios'
        #swagger.description = 'Endpoint para editar un convenio.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Convenio'
            }
        }]
     */
    const {error} = UpdateConvenioValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const convenio = await ConvenioController.updateConvenio(req.body)
    if(convenio[0]== 0 || convenio.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})



module.exports = router