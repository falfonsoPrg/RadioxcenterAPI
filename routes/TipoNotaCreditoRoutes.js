const router = require('express').Router()
const TipoNotaCreditoController = require('../controllers/TipoNotaCreditoController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateTipoNotaCreditoValidation, UpdateTipoNotaCreditoValidation} = require('../middlewares/Validation')

router.get('/:cod_tipo_nota_credito', async(req,res)=>{
    const cod_tipo_nota_credito = req.params.cod_tipo_nota_credito
    const tipo_nota_credito = await TipoNotaCreditoController.getTipoNotaCredito(cod_tipo_nota_credito)
    if(tipo_nota_credito){
        return res.send({
            respuesta: tipo_nota_credito
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})
router.get('/', async(req,res) =>{
    const tipo_nota_creditos = await TipoNotaCreditoController.getTipoNotaCreditos()
    if (tipo_nota_creditos.length > 0){
        return res.send({
            respuesta: tipo_nota_creditos
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})
router.post('/', async(req,res)=>{
    const {error} = CreateTipoNotaCreditoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const tipo_nota_credito = await TipoNotaCreditoController.createTipoNotaCredito(req.body)
    if(tipo_nota_credito.errors || tipo_nota_credito.name == "SequelizeDatabaseError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })        
    }
    return res.status(201).send()
})
router.put('/', async(req,res)=>{
    const {error} = UpdateTipoNotaCreditoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const tipo_nota_credito = await TipoNotaCreditoController.updateTipoNotaCredito(req.body)
    if(tipo_nota_credito[0] == 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})
module.exports= router