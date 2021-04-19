const router  = require('express').Router()
const TransaccionController = require('../controllers/TransaccionController')
const UsuarioController = require('../controllers/UsuarioController')
const EntidadController = require('../controllers/EntidadController')
const DoctorController = require('../controllers/DoctorController')
const ServicioController = require('../controllers/ServicioController')
const Mensajes = require('../middlewares/Mensajes')
const { CreateTransaccionValidation, UpdateTransaccionValidation} = require('../middlewares/Validation')
const Generador = require("../services/GenerateReport")

router.get('/entidades/:cod_entidad',async(req,res)=>{
    /**
        #swagger.tags = ['Transacciones']
        #swagger.path = '/transacciones/entidades/{cod_entidad}'
        #swagger.description = 'Endpoint para obtener todas las transacciones pendientes de una entidad'
     */
    const transacciones = await TransaccionController.getTransaccionesDeEntidadesNoPagadas(req.params.cod_entidad) 
    if(transacciones.length > 0){
        return res.send({
            respuesta: transacciones
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})
router.post('/generarReporte',async(req,res)=>{
   /**
        #swagger.tags = ['Transacciones']
        #swagger.path = '/transacciones/generarReporte'
        #swagger.description = 'Endpoint para crear un reporte de transacciones.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/ReporteTransaccion'
            }
        }]
     */
    const transacciones = await TransaccionController.getAllTransacciones()
    const usuarios = await UsuarioController.getUsuariosParaReporte()
    const entidades = await EntidadController.getEntidades()
    const doctores = await DoctorController.getDoctores()
    const servicios = await ServicioController.getServicios()
    var fechaInicial = req.body.fecha_inicial
    var fechaFinal = req.body.fecha_final
    await Generador.GenerarReporteDiarioDeTransacciones(fechaInicial, fechaFinal,transacciones,usuarios,entidades,doctores, servicios)
    res.send()
})
router.get('/:cod_transaccion', async(req,res)=>{
    /**
        #swagger.tags = ['Transacciones']
        #swagger.path = '/transacciones/{cod_transaccion}'
        #swagger.description = 'Endpoint para obtener una transacción'
     */
    const cod_transaccion = req.params.cod_transaccion
    const transaccion = await TransaccionController.getTransaccion(cod_transaccion)

    if(transaccion){
        return res.send({
            respuesta: transaccion
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/',async(req,res)=>{
    /**
        #swagger.tags = ['Transacciones']
        #swagger.path = '/transacciones'
        #swagger.description = 'Endpoint para obtener transacciones'
     */
    const transaccion = await TransaccionController.getAllTransacciones()
    if(transaccion.length > 0){
        return res.send({
            respuesta: transaccion
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Transacciones']
        #swagger.path = '/transacciones'
        #swagger.description = 'Endpoint para crear una transacción.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Transaccion'
            }
        }]
     */
    const {error}= CreateTransaccionValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const transaccion = await TransaccionController.createTransaccion(req.body)
    if(transaccion.errors || transaccion.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Transacciones']
        #swagger.path = '/transacciones'
        #swagger.description = 'Endpoint para editar una transacción.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Transaccion'
            }
        }]
     */
    const {error} = UpdateTransaccionValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const transaccion= await TransaccionController.updateTransaccion(req.body)
    if(transaccion[0]==0 || transaccion.name) {
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router
