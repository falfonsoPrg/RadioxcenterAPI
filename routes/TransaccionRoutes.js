const router  = require('express').Router()
const TransaccionController = require('../controllers/TransaccionController')
const Mensajes = require('../middlewares/Mensajes')
const { CreateTransaccionValidation, UpdateTransaccionValidation} = require('../middlewares/Validation')

router.get('/:cod_transaccion', async(req,res)=>{
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
    const transaccion = await TransaccionController.getTransacciones()

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
    const {error}= CreateTransaccionValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const transaccion = await TransaccionController.createTransaccion(req.body)
    if(transaccion.errors || transaccion.name == "SequelizeDatabaseError" || transaccion.name== "SequelizeForeignKeyConstraintError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    const {error} = UpdateTransaccionValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const transaccion= await TransaccionController.updateTransaccion(req.body)
    if(transaccion[0]==0 || transaccion.name== "SequelizeForeignKeyConstraintError") {
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router
