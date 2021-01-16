const router = require('express').Router()
const UsuarioController = require('../controllers/UsuarioController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateUsuarioValidation} = require('../middlewares/Validation')

router.get('/:cod_usuario', async(req,res) =>{
    /**
        #swagger.tags = ['Usuarios']
        #swagger.path = '/usuarios/{cod_usuario}'
        #swagger.description = 'Endpoint para obtener un usuario'
     */
    const cod_usuario = req.params.cod_usuario
    const usuario = await UsuarioController.getUsuario(cod_usuario)
    if(usuario){
        return res.send({
            respuesta: usuario
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})
router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['Usuarios']
        #swagger.path = '/usuarios'
        #swagger.description = 'Endpoint para obtener usuarios'
     */
    const usuarios= await UsuarioController.getUsuarios()
    if (usuarios.length > 0){
        return res.send({
            respuesta: usuarios
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Usuarios']
        #swagger.path = '/usuarios'
        #swagger.description = 'Endpoint para registrar un usuario.'
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
    const {error} = CreateUsuarioValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const usuario = await UsuarioController.createUsuario(req.body)

    if (usuario.errors || usuario.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async (req, res)=>{
    /**
        #swagger.tags = ['Usuarios']
        #swagger.path = '/usuarios'
        #swagger.description = 'Endpoint para editar un usuario.'
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
    const usuario = await UsuarioController.updateUsuario(req.body)
    if (usuario[0] == 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router