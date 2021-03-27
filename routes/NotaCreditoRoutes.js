const router = require('express').Router()
const NotaCreditoController = require('../controllers/NotaCreditoController')
const FacturaController = require('../controllers/FacturaController')
const NumeracionController = require('../controllers/NumeracionController')
const Mensajes = require('../middlewares/Mensajes')
const Constantes = require('../middlewares/Constantes')
const pdfMaker = require('../services/PDFMaker')
//const {, } = require('../middlewares/Validation')

router.get('/:cod_nota_credito', async(req,res)=>{
    /**
        #swagger.tags = ['Nota Credito']
        #swagger.path = '/notacredito/{cod_nota_credito}'
        #swagger.description = 'Endpoint para obtener una nota credito'
     */
    const cod_nota_credito = req.params.cod_nota_credito
    const notaCredito = await NotaCreditoController.getNotaCredito(cod_nota_credito)
    if(notaCredito){
        return res.send({
            respuesta: notaCredito
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['Nota Credito']
        #swagger.path = '/notacredito'
        #swagger.description = 'Endpoint para obtener una notas credito'
     */
    const notasCredito = await NotaCreditoController.getNotasCredito()
    if(notasCredito.length > 0){
        return res.send({
            respuesta: notasCredito
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})
router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Nota Credito']
        #swagger.path = '/notacredito'
        #swagger.description = 'Endpoint para crear una nota credito.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/NotaCredito'
            }
        }]
     */
    
    var factura = await FacturaController.getFactura(req.body.cod_factura)

    var numeracion = await NumeracionController.getNumeracion(Constantes.NTCR_CODE)
    
    var ruta = pdfMaker.crearNotaCredito(factura, numeracion)

    var notaC = {
        numero_nota_credito: numeracion.numeracion_actual,
        ruta_nota_credito: ruta,
        cod_factura: req.body.cod_factura,
        cod_tipo_nota_credito: Constantes.TNTCR_COMERCIAL,
        fecha_nota_credito: new Date(),
        descripcion_nota_credito: "Factura número: " + factura.numero_factura,
        valor_total: factura.valor_total_factura
    }

    const notaCredito = await NotaCreditoController.createNotaCredito(notaC)
    if(notaCredito.errors || notaCredito.name){
        return res.status(400).send({
            error:Mensajes.ErrorAlGuardar
        })
    }

    await NumeracionController.aumentarNumeracion(Constantes.NTCR_CODE)
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Nota Credito']
        #swagger.path = '/notacredito'
        #swagger.description = 'Endpoint para editar una nota credito.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/NotaCredito'
            }
        }]
     */
    // const {error} = UpdateFormaDePagoEntidadValidation(req.body)
    // if(error) return res.status(422).send({
    //     error: error.details[0].message
    // })
    const notaCredito = await NotaCreditoController.updateNotaCredito(req.body)
    if (notaCredito[0]== 0 || notaCredito.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router

