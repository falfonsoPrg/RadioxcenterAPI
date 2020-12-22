const router = require('express').Router()
const TipoDocumentoController = require('../controllers/TipoDocumentoController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateTipoDocumentoValidation, UpdateTipoDocumentoValidation, UpdateTipoFacturacionValidation} = require('../middlewares/Validation')

router.get('/:cod_tipo_documento', async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Documento']
        #swagger.path = '/tipoDocumentos/{cod_tipo_documento}'
        #swagger.description = 'Endpoint para obtener un tipo de documento'
     */
    const cod_tipo_documento = req.params.cod_tipo_documento
    const tipo_documento = await TipoDocumentoController.getTipoDocumento(cod_tipo_documento)
    if(tipo_documento){
        return res.send({
            respuesta: tipo_documento
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})
router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Documento']
        #swagger.path = '/tipoDocumentos'
        #swagger.description = 'Endpoint para obtener tipos de documento'
     */
    const tipo_documentos = await TipoDocumentoController.getTipoDocumentos()
    if(tipo_documentos.length > 0){
        return res.send({
            respuesta: tipo_documentos
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})
router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Documento']
        #swagger.path = '/tipoDocumentos'
        #swagger.description = 'Endpoint para crear un tipo de documento.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoDocumento'
            }
        }]
     */
    const {error} = CreateTipoDocumentoValidation(req.body)
    if (error) return res.status(422).send({
        error: error.details[0].message
    })
    const tipo_documento = await TipoDocumentoController.createTipoDocumento(req.body)
    if(tipo_documento.errors || tipo_documento.name == "SequelizeDatabaseError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})
router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Documento']
        #swagger.path = '/tipoDocumentos'
        #swagger.description = 'Endpoint para editar un tipo de documento.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoDocumento'
            }
        }]
     */
    const {error} = UpdateTipoDocumentoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const tipo_documento = await TipoDocumentoController.updateTipoDocumento(req.body)
    if(tipo_documento[0] == 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})


module.exports = router