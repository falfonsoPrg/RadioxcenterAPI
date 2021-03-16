const router = require('express').Router()
const EntidadController = require('../controllers/EntidadController')
const FacturaController = require('../controllers/FacturaController')
const TransaccionController = require('../controllers/TransaccionController')
const TransaccionFacturaController = require('../controllers/TransaccionFacturaController')
const NumeracionController = require('../controllers/NumeracionController')
const Constantes = require('../middlewares/Constantes')
const Mensajes = require('../middlewares/Mensajes')
const PDFMaker = require('../services/PDFMaker')
const { FacturarEntidadValidation } = require('../middlewares/Validation')

router.get('/entidades', async (req,res)=>{
    /**
        #swagger.tags = ['Facturas']
        #swagger.path = '/facturas/entidades'
        #swagger.description = 'Endpoint para obtener facturas de las entidades'
     */
    const facturas = await TransaccionFacturaController.getTransaccionFacturas()
    if(facturas.length > 0){
        return res.send({
            respuesta: facturas
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})
router.get('/:cod_factura', async (req,res)=>{
    /**
        #swagger.tags = ['Facturas']
        #swagger.path = '/facturas/{cod_factura}'
        #swagger.description = 'Endpoint para obtener una factura'
     */
    const cod_factura = req.params.cod_factura
    const factura = await FacturaController.getFactura(cod_factura)
    if(factura){
        return res.send({
            respuesta: factura
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['Facturas']
        #swagger.path = '/facturas'
        #swagger.description = 'Endpoint para obtener facturas'
     */
    const facturas = await FacturaController.getFacturas()
    if(facturas.length > 0){
        return res.send({
            respuesta: facturas
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['Facturas']
        #swagger.path = '/facturas'
        #swagger.description = 'Endpoint para registrar una factura.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Factura'
            }
        }]
     */
    // const {error} = CreateDepartamentoValidation(req.body)
    // if(error) return res.status(422).send({
    //     error: error.details[0].message
    // })

    const factura = await FacturaController.createFactura(req.body)
    if(factura.errors || factura.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/facturarEntidad/:cod_entidad', async (req,res)=>{
    /**
        #swagger.tags = ['Facturas']
        #swagger.path = '/facturas/facturarEntidad/{cod_entidad}'
        #swagger.description = 'Endpoint para facturar varias transacciones a una entidad.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Factura'
            }
        }]
     */
    const {error} = FacturarEntidadValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const entidad = await EntidadController.getEntidad(req.params.cod_entidad)

    const transacciones = await TransaccionController.getTransacciones()

    var cod_transacciones = req.body.cod_transacciones

    const allExist = cod_transacciones.filter(ct => transacciones.includes(t => t.cod_transaccion == ct))
    if(allExist.length != cod_transacciones.length){
        return res.status(400).send({error: Mensajes.ErrorAlGuardar})
    }

    const numeracion = await NumeracionController.getNumeracion(Constantes.FAEL_CODE)
    var ruta = PDFMaker.createFacturaEntidad(entidad, transacciones, numeracion.numeracion_actual)
    var resumenFactura = ""
    var total = 0
    transacciones.forEach(t => {
        resumenFactura += "Transacción #" + t.numero_transaccion + " "
        total += t.valor_transaccion
    });

    const factura = await FacturaController.createFactura({
        numero_factura: numeracion.numeracion_actual,
        resumen_factura: resumenFactura,
        ruta_factura: ruta,
        documento_usuario: entidad.nit_entidad,
        valor_total_factura: total,
        fecha_factura: new Date(),
        direccion_mac: req.body.ipv4,
        cod_tipo_pago: Constantes.FAEL_CODE
    })

    await transacciones.forEach(async (t) => {
        await TransaccionFacturaController.createTransaccionFactura({
            cod_transacciones: t.cod_transaccion,
            cod_factura: factura.cod_factura
        })
    });

    await NumeracionController.aumentarNumeracion(Constantes.FAEL_CODE)

    return res.status(204).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['Facturas']
        #swagger.path = '/facturas'
        #swagger.description = 'Endpoint para editar una factura.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Factura'
            }
        }]
     */
    // const {error} = UpdateDepartamentoValidation(req.body)
    // if(error) return res.status(422).send({
    //     error: error.details[0].message
    // })

    const factura = await FacturaController.updateFactura(req.body);
    if(factura[0] == 0 || factura.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})


module.exports = router;