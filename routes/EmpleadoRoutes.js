const router = require('express').Router()
const EmpleadoController = require('../controllers/EmpleadoController')
const Mensajes = require('../middlewares/Mensajes')
const {UpdateEmpleadoValidation} = require('../middlewares/Validation')

router.get('/cod_empleado', async(req,res)=>{
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

module.exports = router