const router = require('express').Router()
const CiudadController = require('../controllers/CiudadController')
const Mensajes = require('../middlewares/Mensajes')
const { CreateCiudadValidation,UpdateCiudadValidation } = require('../middlewares/Validation')

router.get('/:cod_ciudad', async (req,res)=>{
    const cod_ciudad = req.params.cod_ciudad
    const ciudad = await CiudadController.getCiudad(cod_ciudad)
    if(ciudad){
        return res.send({
            respuesta: ciudad
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async (req,res)=>{
    const ciudades = await CiudadController.getCiudades()
    if(ciudades.length > 0){
        return res.send({
            respuesta: ciudades
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async (req,res)=>{
    const {error} = CreateCiudadValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const ciudad = await CiudadController.createCiudad(req.body)
    if(ciudad.errors || ciudad.name == "SequelizeDatabaseError" || ciudad.name == "SequelizeForeignKeyConstraintError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    console.log(ciudad)
    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    const {error} = UpdateCiudadValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const ciudad = await CiudadController.updateCiudad(req.body);
    if(ciudad[0] == 0 || ciudad.name == "SequelizeForeignKeyConstraintError"){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})


module.exports = router;