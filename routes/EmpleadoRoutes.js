const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const EmpleadoController = require('../controllers/EmpleadoController')
const Mensajes = require('../middlewares/Mensajes')
const {UpdateEmpleadoValidation} = require('../middlewares/Validation')

router.get('/:cod_empleado', async(req,res)=>{
    /**
        #swagger.tags = ['Empleados']
        #swagger.path = '/empleados/{cod_empleado}'
        #swagger.description = 'Endpoint para obtener un empleado'
     */
    const cod_empleado = req.params.cod_empleado
    const empleado = await EmpleadoController.getEmpleado(cod_empleado)
    if (empleado) {
        return res.send({
            respuesta: empleado
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['Empleados']
        #swagger.path = '/empleados'
        #swagger.description = 'Endpoint para obtener empleados'
     */
    const empleado = await EmpleadoController.getEmpleados()
    if(empleado.length > 0) {
        return res.send({
            respuesta: empleado
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.put('/' ,async(req,res)=>{
    /**
        #swagger.tags = ['Empleados']
        #swagger.path = '/empleados'
        #swagger.description = 'Endpoint para editar un empleado.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Empleado'
            }
        }]
     */
    const {error} = UpdateEmpleadoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    if(req.body.contrasenia_empleado != null ){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.contrasenia_empleado, salt)
        const empl = req.body
        empl.contrasenia_empleado= hashedPassword
        const empleado = await EmpleadoController.updateEmpleado(empl);
        if(empleado[0]== 0 || empleado.name) {
            return res.status(404).send({
                error: Mensajes.ErrorAlActualizar
            })
        }
        return res.status(204).send()
    } else {
        const empleado = await EmpleadoController.updateEmpleado(req.body);
        if(empleado[0]== 0 || empleado.name) {
            return res.status(404).send({
                error: Mensajes.ErrorAlActualizar
            })
        }
        return res.status(204).send()
    }

})

module.exports = router