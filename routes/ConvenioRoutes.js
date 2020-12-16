const router = require('express').Router()
const ConvenioController = require('../controllers/ConvenioController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateConvenioValidation, UpdateConvenioValidation} = require('../middlewares/Validation')

router.get('/:cod_convenio', async(req,res)=>{
    const cod_convenio = req.params.cod_convenio
    const convenio = await ConvenioController.getConvenio(cod_convenio)
    if(convenio){
        return res.send({
            respuesta: convenio
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    const convenio = await ConvenioController.getConvenios()
    console.log(convenio)
    if(convenio.length > 0){
        return res.send({
            respuesta: convenio
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    const {error} = CreateConvenioValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const convenio = await ConvenioController.createConvenio(req.body)
    if(convenio.errors || convenio.name=="SequelizeDatabaseError" || convenio.name=="SequelizeForeignKeyConstraintError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    const {error} = UpdateConvenioValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const convenio = await ConvenioController.updateConvenio(req.body)
    if(convenio[0]== 0 || convenio.name == "SequelizeForeignKeyConstraintError"){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})



module.exports = router