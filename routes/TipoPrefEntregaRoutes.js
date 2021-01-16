const router = require('express').Router()
const TipoPrefEntregaController = require('../controllers/TipoPrefEntregaController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateTipoPrefEntregaValidation, UpdateTipoPrefEntregaValidation} = require('../middlewares/Validation')

router.get('/:cod_tipo_pref_entrega', async(req, res)=>{
    /**
        #swagger.tags = ['Tipo Preferencia Entrega']
        #swagger.path = '/tipoPrefEntrega/{cod_tipo_pref_entrega}'
        #swagger.description = 'Endpoint para obtener un tipo de preferencia entrega'
     */
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
    /**
        #swagger.tags = ['Tipo Preferencia Entrega']
        #swagger.path = '/tipoPrefEntrega'
        #swagger.description = 'Endpoint para obtener tipos de preferencia entrega'
     */
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
    /**
        #swagger.tags = ['Tipo Preferencia Entrega']
        #swagger.path = '/tipoPrefEntrega'
        #swagger.description = 'Endpoint para crear un tipo preferencia entrega.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoPreferenciaEntrega'
            }
        }]
     */
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
    /**
        #swagger.tags = ['Tipo Preferencia Entrega']
        #swagger.path = '/tipoPrefEntrega'
        #swagger.description = 'Endpoint para editar un tipo preferencia entrega.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoPreferenciaEntrega'
            }
        }]
     */
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