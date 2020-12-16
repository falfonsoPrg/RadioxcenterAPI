const router = require('express').Router()
const EntidadController = require('../controllers/EntidadController')
const ConvenioController = require('../controllers/ConvenioController')
const Mensajes = require('../middlewares/Mensajes')
const {UpdateEntidadValidation, CreateEntidadvalidation} = require('../middlewares/Validation')

router.get('/convenios', async(req,res)=>{
    const convenios = await ConvenioController.getConveniosFromAllEntidades()
    if(convenios.length > 0) {
        return res.send({
            respuesta: convenios
        })
    }
    return res.status(400).send()
})

router.get('/:cod_entidad', async(req,res) =>{
    const cod_entidad = req.params.cod_entidad
    const entidad = await EntidadController.getEntidad(cod_entidad)
    if (entidad){
        return res.send({
            respuesta: entidad
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    const entidad = await EntidadController.getEntidades()
    if(entidad.length > 0) {
        return res.send({
            respuesta: entidad
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    const {error} = CreateEntidadvalidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const entidad = await EntidadController.createEntidad(req.body)
    if( entidad.errors || entidad.name== "SequelizeDatabaseError"|| entidad.name== "SequelizeForeignKeyConstraintError") {
        console.log(entidad.name)
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    const {error} = UpdateEntidadValidation(req.body)
    if (error) return res.status(422).send({
        error: error.details[0].message
    })
    const entidad = await EntidadController.updateEntidad(req.body)
    if(entidad[0]==0 || entidad.name== "SequelizeForeignKeyConstraintError"){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

//Rutas de la relación muchos a muchos con Servicios
//  GET    /api/entidades/convenios
//  GET    /api/entidades/{cod_entidad}/convenios
//  GET    /api/entidades/{cod_entidad}/convenios/{cod_servicio}
// POST    /api/entidades/{cod_entidad}/convenios/
// DELETE  /api/entidades/{cod_entidad}/convenios/{cod_servicio}

router.get('/:cod_entidad/convenios', async(req,res)=>{
    const cod_entidad = req.params.cod_entidad
    const convenios = await ConvenioController.getConveniosFromEntidades(cod_entidad)
    if(convenios.length > 0) {
        return res.send({
            respuesta: convenios
        })
    }
    return res.status(404).send()
})

router.delete('/:cod_entidad/convenios/:cod_servicio', async(req,res)=>{
    const cod_entidad = req.params.cod_entidad
    const cod_servicio = req.params.cod_servicio
    const convenios = await ConvenioController.deleteServicioFromEntidad(cod_entidad, cod_servicio)
    if(convenios != 0) {
        return res.status(204).send()
    }
    return res.status(404).send()
})



module.exports = router