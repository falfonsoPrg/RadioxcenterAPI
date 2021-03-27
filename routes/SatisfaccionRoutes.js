const router = require('express').Router()
const SatisfaccionController = require('../controllers/SatisfaccionController')
const UsuarioController = require('../controllers/UsuarioController')
const Mensajes = require ('../middlewares/Mensajes')
const { CreateSatisfaccionValidation, UpdateSatisfaccionValidation } = require('../middlewares/Validation')

router.get('/:cod_satisfaccion', async (req, res)=>{
    /**
        #swagger.tags = ['Satisfaccion']
        #swagger.path = '/satisfacciones/{cod_satisfaccion}'
        #swagger.description = 'Endpoint para obtener una satisfaccion'
     */
    const cod_satisfaccion = req.params.cod_satisfaccion
    const satisfaccion = await SatisfaccionController.getSatisfaccion(cod_satisfaccion)
    if(satisfaccion){
        return res.send({
            respuesta: satisfaccion
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/' , async(req, res) =>{
    /**
        #swagger.tags = ['Satisfaccion']
        #swagger.path = '/satisfacciones'
        #swagger.description = 'Endpoint para obtener satisfacciones'
     */
    const satisfacciones = await SatisfaccionController.getSatisfacciones()
    if(satisfacciones.length > 0){
        return res.send({
            respuesta: satisfacciones
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Satisfaccion']
        #swagger.path = '/satisfacciones'
        #swagger.description = 'Endpoint para crear una satisfaccion.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Satisfaccion'
            }
        }]
     */
    const {error} = CreateSatisfaccionValidation(req.body)
    const usuario = await UsuarioController.getUsuarioPorDocumento(req.body.documento_usuario)
    req.body.cod_usuario = usuario[0].cod_usuario
    delete req.body.documento_usuario
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const satisfaccion = await SatisfaccionController.createSatisfaccion(req.body)
    if (satisfaccion.errors || satisfaccion.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['Satisfaccion']
        #swagger.path = '/satisfacciones'
        #swagger.description = 'Endpoint para editar una satisfaccion.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Satisfaccion'
            }
        }]
     */
    const {error} = UpdateSatisfaccionValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const satisfaccion = await SatisfaccionController.updateSatisfaccion(req.body)
    if(satisfaccion[0]==0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router;