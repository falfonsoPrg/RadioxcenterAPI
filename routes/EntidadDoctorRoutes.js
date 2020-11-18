const router = require('express').Router()
const EntidadDoctorController = require('../controllers/EntidadDoctorController')
const Mensajes = require('../middlewares/Mensajes')
const {UpdateEntidadDoctorValidation, CreateEntidadDoctorValidation} = require('../middlewares/Validation')

router.get('/:cod_entidad_doctor', async(req,res)=>{
    const cod_entidad_doctor = req.params.cod_entidad_doctor
    const entidadDoctor= await EntidadDoctorController.getEntidadDoctor(cod_entidad_doctor)
    if (entidadDoctor){
        return res.send({
            respuesta: entidadDoctor
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    const entidadDoctor = await EntidadDoctorController.getEntidadDoctores()
    if(entidadDoctor.length > 0) {
        return res.send({
            respuesta: entidadDoctor
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    const {error} = CreateEntidadDoctorValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const entidadDoctor = await EntidadDoctorController.createEntidadDoctor(req.body)
    if(entidadDoctor.errors || entidadDoctor.name == "SequelizeDatabaseError" || entidadDoctor.name == "SequelizeForeignKeyConstraintError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    const {error} = UpdateEntidadDoctorValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const entidadDoctor = await EntidadDoctorController.updateEntidadDoctor(req.body)
    if(entidadDoctor[0]==0 || entidadDoctor.name == "SequelizeForeignKeyConstraintError"){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router