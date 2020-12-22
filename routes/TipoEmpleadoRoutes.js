const router = require('express').Router()
const TipoEmpleadoController = require('../controllers/TipoEmpleadoController')
const Mensajes = require ('../middlewares/Mensajes')
const { CreateTipoEmpleadoValidation, UpdateTipoEmpleadoValidation } = require('../middlewares/Validation')

router.get('/:cod_tipo_empleado', async (req, res)=>{
    /**
        #swagger.tags = ['Tipo Empleado']
        #swagger.path = '/tipoEmpleados/{cod_tipo_empleado}'
        #swagger.description = 'Endpoint para obtener un tipo de empleado'
     */
    const cod_tipo_empleado = req.params.cod_tipo_empleado
    const tipo_empleado = await TipoEmpleadoController.getTipoEmpleado(cod_tipo_empleado)
    if(tipo_empleado){
        return res.send({
            respuesta: tipo_empleado
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/' , async(req, res) =>{
    /**
        #swagger.tags = ['Tipo Empleado']
        #swagger.path = '/tipoEmpleados'
        #swagger.description = 'Endpoint para obtener tipos de empleado'
     */
    const tipo_empleados = await TipoEmpleadoController.getTipoEmpleados()
    if(tipo_empleados.length > 0){
        return res.send({
            respuesta: tipo_empleados
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Empleado']
        #swagger.path = '/tipoEmpleados'
        #swagger.description = 'Endpoint para crear un tipo de empleado.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoEmpleado'
            }
        }]
     */
    const {error} = CreateTipoEmpleadoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const tipo_empleado = await TipoEmpleadoController.createTipoEmpleado(req.body)
    if (tipo_empleado.errors || tipo_empleado.name == "SequelizeDatabaseError"){
        return res.status(404).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['Tipo Empleado']
        #swagger.path = '/tipoEmpleados'
        #swagger.description = 'Endpoint para editar un tipo de empelado.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoEmpleado'
            }
        }]
     */
    const {error} = UpdateTipoEmpleadoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const tipo_empleado = await TipoEmpleadoController.updateTipoEmpleado(req.body)
    if(tipo_empleado[0]==0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router;