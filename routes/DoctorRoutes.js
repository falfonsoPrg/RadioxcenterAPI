const router = require('express').Router()
const DoctorController = require('../controllers/DoctorController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateDoctorValidation, UpdateDoctorValidation} = require('../middlewares/Validation')

router.get('/:cod_doctor', async(req,res)=>{
    const cod_doctor = req.params.cod_doctor
    const doctor = await DoctorController.getDoctor(cod_doctor)
    if(doctor){
        return res.send({
            respuesta: doctor
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})
router.get('/', async(req,res)=>{
    const doctor = await DoctorController.getDoctores()
    if(doctor.length > 0) {
        return res.send({
            respuesta: doctor
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    const {error} = CreateDoctorValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const doctor = await DoctorController.createDoctor(req.body)
    if(doctor.errors || doctor.name == "SequelizeDatabaseError" || doctor.name == "SequelizeForeignKeyConstraintError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    const {error} = UpdateDoctorValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const doctor = await DoctorController.updateDoctor(req.body)
    if(doctor[0]== 0 || doctor.name == "SequelizeForeignKeyConstraintError"){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router