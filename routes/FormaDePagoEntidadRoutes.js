const router = require('express').Router()
const FormaDePagoEntidadController = require('../controllers/FormaDePagoEntidadController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateFormaDePagoEntidadValidation, UpdateFormaDePagoEntidadValidation} = require('../middlewares/Validation')

router.get('/:cod_forma_de_pago_entidad', async(req,res)=>{
    const cod_forma_de_pago_entidad = req.params.cod_forma_de_pago_entidad
    const formaDePagoEntidad = await FormaDePagoEntidadController.getFormaDePagoEntidad(cod_forma_de_pago_entidad)
    if(formaDePagoEntidad){
        return res.send({
            respuesta: formaDePagoEntidad
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    const formaDePagoEntidad = await FormaDePagoEntidadController.getFormaDePagoEntidades()
    if(formaDePagoEntidad.length > 0){
        return res.send({
            respuesta: formaDePagoEntidad
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})
router.post('/', async(req,res)=>{
    const {error} = CreateFormaDePagoEntidadValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    
    const formaDePagoEntidad = await FormaDePagoEntidadController.createFormaDePagoEntidad(req.body)
    if(formaDePagoEntidad.errors || formaDePagoEntidad.name == "SequelizeDatabaseError" || formaDePagoEntidad.name == "SequelizeForeignKeyConstraintError"){
        return res.status(400).send({
            error:Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    const {error} = UpdateFormaDePagoEntidadValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const formaDePagoEntidad = await FormaDePagoEntidadController.updateFormaDePagoEntidad(req.body)
    if (formaDePagoEntidad[0]== 0 || formaDePagoEntidad.name == "SequelizeForeignKeyConstraintError"){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router

