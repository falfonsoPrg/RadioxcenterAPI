const router = require('express').Router()
const TransaccionServicioController = require('../controllers/TransaccionServicioController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateTransaccionServicioValidation, UpdateTransaccionServicioValidation} = require('../middlewares/Validation')

router.get('/:cod_transaccion_servicio', async(req,res)=>{
    const cod_transaccion_servicio = req.params.cod_transaccion_servicio
    const transaccionServicio = await TransaccionServicioController.getTransaccionServicio(cod_transaccion_servicio)

    if(transaccionServicio){
        return res.send({
            respuesta: transaccionServicio
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    const transaccionServicio = await TransaccionServicioController.getTransaccionServicios()
    if(transaccionServicio.length > 0){
        return res.send({
            respuesta: transaccionServicio
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    const {error} = CreateTransaccionServicioValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const transaccionServicio = await TransaccionServicioController.createTransaccionServicio(req.body)
    if(transaccionServicio.errors || transaccionServicio.name== "SequelizeDatabaseError" || transaccionServicio.name=="SequelizeForeignKeyConstraintError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }

    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    const {error} = UpdateTransaccionServicioValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const transaccionServicio = await TransaccionServicioController.updateTransaccionServicio(req.body)
    if(transaccionServicio[0]==0 || transaccionServicio.name=="SequelizeForeignKeyConstraintError"){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router