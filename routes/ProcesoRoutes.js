const router = require('express').Router()
const ProcesoController = require('../controllers/ProcesoController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateProcesoValidation, UpdateProcesoValidation} = require('../middlewares/Validation')

router.get('/:cod_proceso', async(req,res)=>{
    const cod_proceso = req.params.cod_proceso
    const proceso = await ProcesoController.getProceso(cod_proceso)

    if(proceso) {
        return res.send({
            respuesta: proceso
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async(req,res)=>{
    const proceso = await ProcesoController.getProcesos()
    if(proceso.length > 0){
        return res.send({
            respuesta: proceso
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    const {error} = CreateProcesoValidation(req.body)
    if (error) return res.status(422).send({
        error: error.details[0].message
    })
    const proceso = await ProcesoController.createProceso(req.body)
    if(proceso.errors || proceso.name=="SequelizeDatabaseError" || proceso.name == "SequelizeForeignKeyConstraintError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(202).send()
})

router.put('/', async(req,res)=>{
    const {error} = UpdateProcesoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const proceso = await ProcesoController.updateProceso(req.body)
    if( proceso[0]== 0 || proceso.name == "SequelizeForeignKeyConstraintError"){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router