const router = require('express').Router()
const EntidadController = require('../controllers/EntidadController')
const ConvenioController = require('../controllers/ConvenioController')
const ServicioController = require('../controllers/ServicioController')
const Mensajes = require('../middlewares/Mensajes')
const {UpdateEntidadValidation, CreateEntidadvalidation} = require('../middlewares/Validation')

router.get('/convenios', async(req,res)=>{
    const countConvenios = await ConvenioController.getCountConvenios()
    const convenios = await EntidadController.getAllFromEntidad();
    if(convenios.length > 0) {
        return res.send({
            respuesta: arr
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

router.put('/:cod_entidad/convenios/', async(req,res)=>{
    const servicios_convenio = req.body.servicios_convenio
    const valores_servicios = req.body.valores_servicios
    const list = await ServicioController.getServicios()
    const error = servicios_convenio.every(element => list.find(x => x.cod_servicio == element));
    if(!error){
        return res.status(400).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    //Remove all convenios
    await ConvenioController.deleteAllServiciosFromEntidad(req.params.cod_entidad)
    //Iterate through servicios_convenio adding them
    for (let i = 0; i < servicios_convenio.length; i++) {
        const savedConvenio = await ConvenioController.createConvenio({
            cod_servicio: servicios_convenio[i],
            cod_entidad: req.params.cod_entidad,
            valor_servicio: valores_servicios[i],
            fecha_inicial_convenio: req.body.fecha_inicial_convenio,
            fecha_final_convenio: req.body.fecha_final_convenio
        });
        if(savedConvenio.errors || savedConvenio.name){
            return res.status(400).send({
                error: Mensajes.ErrorAlActualizar
            })
        }
    }
    return res.status(204).send()
})



module.exports = router