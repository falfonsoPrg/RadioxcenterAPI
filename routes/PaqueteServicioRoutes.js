const router = require('express').Router()
const PaqueteServicioController = require('../controllers/PaqueteServicioController')
const Mensajes = require('../middlewares/Mensajes')
const {CreatePaqueteServicioValidation, UpdatePaqueteServicioValidation} = require('../middlewares/Validation')

router.get('/:cod_paquete_servicio', async(req,res)=>{
    const cod_paquete_servicio = req.params.cod_paquete_servicio
    const paqueteServicio = await PaqueteServicioController.getPaqueteServicio(cod_paquete_servicio)

    if(paqueteServicio) {
        return res.send({
            respuesta: paqueteServicio
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})
router.get('/',async(req,res)=>{
    const paqueteServicio = await PaqueteServicioController.getPaqueteServicios()

    if(paqueteServicio.length > 0) {
        return res.send({
            respuesta: paqueteServicio
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    const {error} = CreatePaqueteServicioValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const paqueteServicio = await PaqueteServicioController.createPaqueteServicio(req.body)
    if(paqueteServicio.errors || paqueteServicio.name== "SequelizeDatabaseError"|| paqueteServicio.name=="SequelizeForeignKeyConstraintError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})
router.put('/' , async(req,res)=>{
    const {error} = UpdatePaqueteServicioValidation(req.body)
    if (error) return res.status(422).send({
        error: error.details[0].message
    })

    const paqueteServicio = await PaqueteServicioController.updatePaqueteServicio(req.body)
    if(paqueteServicio[0]== 0 || paqueteServicio.name=="SequelizeForeignKeyConstraintError"){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router