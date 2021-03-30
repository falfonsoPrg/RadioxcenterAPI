const router = require('express').Router()
const pdfMaker = require("../services/PDFMaker")
const ConsentimientoController = require('../controllers/ConsentimientoController')
const TransaccionController = require('../controllers/TransaccionController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateConsentimientoValidation} = require('../middlewares/Validation')

router.get('/usuario/:documento_usuario' , async(req,res)=>{
    /**
        #swagger.tags = ['Consentimientos']
        #swagger.path = '/consentimientos/usuario/{documento_usuario}'
        #swagger.description = 'Endpoint para obtener consentimientos de un usuario'
     */
    const consentimientos = await TransaccionController.getAllConsentimientosDeUnUsuario(req.params.documento_usuario);
    if(consentimientos.length > 0){
        return res.send({
            respuesta: consentimientos
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.get('/:cod_consentimiento', async(req,res)=>{
    /**
        #swagger.tags = ['Consentimientos']
        #swagger.path = '/consentimientos/{cod_consentimiento}'
        #swagger.description = 'Endpoint para obtener un consentimiento'
     */
    const cod_consentimiento = req.params.cod_consentimiento
    const consentimiento = await ConsentimientoController.getConsentimiento(cod_consentimiento)
    if(consentimiento){
        return res.send({
            respuesta: consentimiento
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})
router.get('/' , async(req,res)=>{
    /**
        #swagger.tags = ['Consentimientos']
        #swagger.path = '/consentimientos'
        #swagger.description = 'Endpoint para obtener consentimientos'
     */
    const consentimientos = await ConsentimientoController.getConsentimientos()
    if(consentimientos.length > 0){
        return res.send({
            respuesta: consentimientos
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=> {
    /**
        #swagger.tags = ['Consentimientos']
        #swagger.path = '/consentimientos'
        #swagger.description = 'Endpoint para crear un consentimiento.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Consentimiento'
            },
        },
        {
            description: 'description of file',
            in:'formData',
            name: 'signature',
            type: 'file',
            required: true,
        }]
     */
    const {error} = CreateConsentimientoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    try {
        var matches = req.body.signature.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        if (matches.length !== 3) {
            return res.status(400).send({
                error: Mensajes.ErrorAlGuardarArchivo
            })
        }
        pdfMaker.createPDF1(req.body.signature)
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardarArchivo
        })
    }
    // const consentimiento = await ConsentimientoController.createConsentimiento(req.body)
    // if(consentimiento.errors || consentimiento.name){
    //     return res.status(400).send({
    //         error: Mensajes.ErrorAlGuardar
    //     })
    // }
    return res.status(201).send()
})
router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Consentimientos']
        #swagger.path = '/consentimientos'
        #swagger.description = 'Endpoint para editar un consentimiento.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Consentimiento'
            }
        }]
     */
    const consentimiento = await ConsentimientoController.updateConsentimiento(req.body)
    if (consentimiento[0] == 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router