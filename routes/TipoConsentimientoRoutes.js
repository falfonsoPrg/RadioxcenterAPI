const router = require('express').Router()
const TipoConsentimientoController = require('../controllers/TipoConsentimientoController')
const { Departamento } = require('../database/sequelize')
const Mensajes = require('../middlewares/Mensajes')
const {UpdateTipoConsentimientoValidation, CreateTipoConsentimientoValidation} = require('../middlewares/Validation')

router.get('/:cod_tipo_consentimiento', async (req,res)=>{
    const cod_tipo_consentimiento = req.params.cod_tipo_consentimiento
    const tipo_consentimiento = await TipoConsentimientoController.getTipoConsentimiento(cod_tipo_consentimiento)
    if(tipo_consentimiento){
        return res.send({
            respuesta: tipo_consentimiento
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/' , async (req, res) =>{
    const tipo_consentimientos = await TipoConsentimientoController.getTipoConsentimientos()
    if(tipo_consentimientos.length > 0){
        return res.send({
            respuesta: tipo_consentimientos
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async (req,res)=>{
    const {error} = CreateTipoConsentimientoValidation(req.body)
    if (error) return res.status(422).send({
        error: error.details[0].message
    })

    const tipo_consentimiento = await TipoConsentimientoController.createTipoConsentimiento(req.body)
    if(tipo_consentimiento.errors || tipo_consentimiento.name == "SequelizeDatabaseError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})
router.put('/' ,async(req,res)=>{
    const {error} = UpdateTipoConsentimientoValidation(req.body)
    if (error) return res.status(422).send({
        error: error.details[0].message
    })
    const tipo_consentimiento = await TipoConsentimientoController.updateTipoConsentimiento(req.body)
    if (tipo_consentimiento[0] == 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})
module.exports = router
