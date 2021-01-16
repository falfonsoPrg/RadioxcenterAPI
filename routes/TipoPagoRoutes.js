const router = require('express').Router()
const TipoPagoController = require('../controllers/TipoPagoController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateTipoPagoValidation, UpdateTipoPagoValidation} = require('../middlewares/Validation')

router.get('/:cod_tipo_pago', async (req, res)=>{
    /**
        #swagger.tags = ['Tipo Pago']
        #swagger.path = '/tipoPagos/{cod_tipo_pago}'
        #swagger.description = 'Endpoint para obtener un tipo de pago'
     */
    const cod_tipo_pago = req.params.cod_tipo_pago
    const tipoPago = await TipoPagoController.getTipoPago(cod_tipo_pago)
    if (tipoPago){
        return res.send({
            respuesta: tipoPago
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Pago']
        #swagger.path = '/tipoPagos'
        #swagger.description = 'Endpoint para obtener tipos de pago'
     */
    const tipoPago = await TipoPagoController.getTipoPagos()
    if(tipoPago.length > 0 ){
        return res.send({
            respuesta: tipoPago
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Pago']
        #swagger.path = '/tipoPagos'
        #swagger.description = 'Endpoint para crear un tipo de pago.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoPago'
            }
        }]
     */
    const {error} = CreateTipoPagoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const tipoPago = await TipoPagoController.createTipoPago(req.body)
    if(tipoPago.errors || tipoPago.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Pago']
        #swagger.path = '/tipoPagos'
        #swagger.description = 'Endpoint para editar un tipo de pago.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoPago'
            }
        }]
     */
    const {error} = UpdateTipoPagoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const tipoPago = await TipoPagoController.updateTipoPago(req.body)
    if(tipoPago[0]==0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports= router