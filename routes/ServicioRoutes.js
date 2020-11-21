const router = require('express').Router()
const ServicioController = require('../controllers/ServicioController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateServicioValidation} = require('../middlewares/Validation')

router.get('/:cod_servicio', async(req,res)=>{
    const cod_servicio = req.params.cod_servicio
    const servicio = await ServicioController.getServicio(cod_servicio)
    if(servicio){
        return res.send({
            respuesta: servicio
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})
router.get('/' , async(req,res)=>{
    const servicios = await ServicioController.getServicios()
    if(servicios.length > 0){
        return res.send({
            respuesta: servicios
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=> {
    const {error} = CreateServicioValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const servicio = await ServicioController.createservicio(req.body)
    if(servicio.errors || servicio.name == "SequelizeDatabaseError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
        
    }
    return res.status(201).send()
})
router.put('/', async(req,res)=>{
    const servicio = await ServicioController.updateServicio(req.body)
    if (servicio[0] == 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

//Rutas de la relación muchos a muchos con Paquetes

router.get('/:cod_servicio/paquetes', async(req,res)=>{

})
router.get('/:cod_servicio/paquetes/:cod_paquete', async(req,res)=>{

})
router.post('/:cod_servicio/paquetes/', async(req,res)=>{

})
router.delete('/:cod_servicio/paquetes/:cod_paquete', async(req,res)=>{

})
module.exports = router