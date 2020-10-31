const router = require('express').Router()
const TipoDocumentoController = require('../controllers/TipoDocumentoController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateTipoDocumentoValidation, UpdateTipoDocumentoValidation, UpdateTipoFacturacionValidation} = require('../middlewares/Validation')

router.get('/:cod_tipo_documento', async(req,res)=>{
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