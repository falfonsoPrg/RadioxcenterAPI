const router = require('express').Router()
const TipoPrefEntregaController = require('../controllers/TipoPrefEntregaController')
const TipoPrefEntregaValidation = require('../controllers/TipoPrefEntregaController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateTipoPrefEntregaValidation, UpdateTipoPrefEntregaValidation} = require('../middlewares/Validation')

router.get('/:cod_tipo_pref_entrega', async(req, res)=>{
    const cod_tipo_pref_entrega = req.params.cod_tipo_pref_entrega
    const tipo_pref_entrega = await TipoPrefEntregaController.getTipoPrefEntrega(cod_tipo_pref_entrega)
    if(tipo_pref_entrega){
        return res.send({
            respuesta: tipo_pref_entrega
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })

})
router.get('/', async(req,res)=>{
    const tipo_pref_entregas = await TipoPrefEntregaController.getTipoPrefEntregas()
    if(tipo_pref_entregas.length > 0 ){
        return res.send({
            respuesta: tipo_pref_entregas
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})
router.post('/', async(req,res)=>{
    const {error} = CreateTipoPrefEntregaValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const tipo_pref_entrega = await TipoPrefEntregaController.createTipoPrefEntrega(req.body)
    if(tipo_pref_entrega.errors || tipo_pref_entrega.name == "SequelizeDatabaseError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})
router.put('/', async (req,res)=>{
    const {error} = UpdateTipoPrefEntregaValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const tipo_pref_entrega = await TipoPrefEntregaController.updateTipoPrefEntrega(req.body)
    if (tipo_pref_entrega[0] == 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})
module.exports = router