const router = require('express').Router()
const NumeracionController = require('../controllers/NumeracionController')
const FacturaController = require('../controllers/FacturaController')
const NotaCreditoController = require('../controllers/NotaCreditoController')
const TransaccionController = require('../controllers/TransaccionController')
const Constantes = require('../middlewares/Constantes')
const Mensajes = require('../middlewares/Mensajes')
//const {, } = require('../middlewares/Validation')

router.get('/:cod_numeracion', async(req,res)=>{
    /**
        #swagger.tags = ['Numeración']
        #swagger.path = '/numeracion/{cod_numeracion}'
        #swagger.description = 'Endpoint para obtener una numeracion'
     */
    const cod_numeracion = req.params.cod_numeracion
    const numeracion = await NumeracionController.getNumeracion(cod_numeracion)
    if(numeracion){
        return res.send({
            respuesta: numeracion
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['Numeración']
        #swagger.path = '/numeracion'
        #swagger.description = 'Endpoint para obtener numeraciones'
     */
    const numeraciones = await NumeracionController.getNumeraciones()
    if(numeraciones.length > 0){
        return res.send({
            respuesta: numeraciones
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})
router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Numeración']
        #swagger.path = '/numeracion'
        #swagger.description = 'Endpoint para crear una numeración.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Numeracion'
            }
        }]
     */
    // const {error} = Validation(req.body)
    // if(error) return res.status(422).send({
    //     error: error.details[0].message
    // })
    
    const numeracion = await NumeracionController.createNumeracion(req.body)
    if(numeracion.errors || numeracion.name){
        return res.status(400).send({
            error:Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Numeración']
        #swagger.path = '/numeracion'
        #swagger.description = 'Endpoint para editar una numeración.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Numeracion'
            }
        }]
     */
    var actual = await NumeracionController.getNumeracion(req.body.cod_numeracion)
    
    if(req.body.numeracion_inicial == actual.numeracion_inicial &&
        req.body.numeracion_final == actual.numeracion_final &&
        req.body.numeracion_aumento == actual.numeracion_aumento &&
        req.body.numeracion_actual == actual.numeracion_actual){
        return res.status(204).send()
    }

    if(req.body.numeracion_inicial >= req.body.numeracion_final){
        return res.status(422).send({
            error: "La numeración inicial no puede ser mayor o igual que la final"
        })
    }
    if(req.body.numeracion_inicial != actual.numeracion_inicial || req.body.numeracion_final != actual.numeracion_final){
        if(req.body.cod_numeracion == Constantes.FAEL_CODE || req.body.cod_numeracion == Constantes.FPOS_CODE){
            var facturas = await FacturaController.getFacturas()
            facturas = facturas.filter(f => f.cod_tipo_pago == req.body.cod_numeracion && f.numero_factura >= req.body.numeracion_inicial && f.numero_factura <= req.body.numeracion_final);
            if(facturas.length>0){
                return res.status(422).send({
                    error: "Ya existen facturas en el rango dado"
                })
            }
        }
        if(req.body.cod_numeracion == Constantes.NTCR_CODE){
            var ntCreditos = await NotaCreditoController.getNotasCredito()
            ntCreditos = ntCreditos.filter(nt => nt.numero_nota_credito >= req.body.numeracion_inicial && nt.numero_nota_credito <= req.body.numeracion_final)
            if(ntCreditos.length>0){
                return res.status(422).send({
                    error: "Ya existen notas de crédito en el rango dado"
                })
            }
        }
        req.body.numeracion_actual = actual.numeracion_inicial
    }

    const numeracion = await NumeracionController.updateNumeracion(req.body)
    if (numeracion[0]== 0 || numeracion.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router

