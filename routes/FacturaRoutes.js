const router = require('express').Router()
const FacturaController = require('../controllers/FacturaController')
const Mensajes = require('../middlewares/Mensajes')
const {  } = require('../middlewares/Validation')
const path = require("path");
const fs = require('fs');

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