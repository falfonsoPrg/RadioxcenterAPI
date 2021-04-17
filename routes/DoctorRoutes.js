const router = require('express').Router()
const DoctorController = require('../controllers/DoctorController')
const EntidadDoctorController = require('../controllers/EntidadDoctorController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateDoctorValidation, UpdateDoctorValidation} = require('../middlewares/Validation')

router.get('/:cod_doctor', async(req,res)=>{
    /**
        #swagger.tags = ['Doctores']
        #swagger.path = '/doctores/{cod_doctor}'
        #swagger.description = 'Endpoint para obtener un doctor'
     */
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
    /**
        #swagger.tags = ['Doctores']
        #swagger.path = '/doctores'
        #swagger.description = 'Endpoint para obtener doctores'
     */
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
    /**
        #swagger.tags = ['Doctores']
        #swagger.path = '/doctores'
        #swagger.description = 'Endpoint para registrar un doctor.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Doctor'
            }
        }]
     */
    const {error} = CreateDoctorValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const doctor = await DoctorController.createDoctor(req.body)
    if(doctor.errors || doctor.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    if(req.body.esParticular){
        const entidad_doctor = await EntidadDoctorController.createEntidadDoctor({
            cod_entidad: Constantes.ENTIDADPARTICULAR,
            cod_doctor: doctor.cod_doctor
        })
        if(entidad_doctor.errors || entidad_doctor.name){
            return res.status(400).send({
                error: Mensajes.ErrorAlGuardar
            })
        }
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Doctores']
        #swagger.path = '/doctores'
        #swagger.description = 'Endpoint para editar un doctores.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Doctor'
            }
        }]
     */
    const {error} = UpdateDoctorValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const doctor = await DoctorController.updateDoctor(req.body)
    if(doctor[0]== 0 || doctor.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router