const router = require('express').Router()
const TipoConsentimientoController = require('../controllers/TipoConsentimientoController')
const Mensajes = require('../middlewares/Mensajes')
const {UpdateTipoConsentimientoValidation, CreateTipoConsentimientoValidation} = require('../middlewares/Validation')

router.get('/all' , async (req, res) =>{
    /**
        #swagger.tags = ['Tipo Consentimiento']
        #swagger.path = '/tipoConsentimientos/all'
        #swagger.description = 'Endpoint para obtener todos los tipos de consentimiento'
     */
    const tipo_consentimientos = await TipoConsentimientoController.getTipoConsentimientos()
    if(tipo_consentimientos.length > 0){
        return res.send({
            respuesta: tipo_consentimientos
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.get('/:cod_tipo_consentimiento', async (req,res)=>{
    /**
        #swagger.tags = ['Tipo Consentimiento']
        #swagger.path = '/tipoConsentimientos/{cod_tipo_consentimiento}'
        #swagger.description = 'Endpoint para obtener un tipo de consentimiento'
     */
    const cod_tipo_consentimiento = req.params.cod_tipo_consentimiento
    const tipo_consentimiento = await TipoConsentimientoController.getTipoConsentimiento(cod_tipo_consentimiento)
    if(tipo_consentimiento){
        return res.send({
            respuesta: tipo_consentimiento
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/' , async (req, res) =>{
    /**
        #swagger.tags = ['Tipo Consentimiento']
        #swagger.path = '/tipoConsentimientos'
        #swagger.description = 'Endpoint para obtener tipos de consentimiento activos'
     */
    const tipo_consentimientos = await TipoConsentimientoController.getTipoConsentimientosActivos()
    if(tipo_consentimientos.length > 0){
        return res.send({
            respuesta: tipo_consentimientos
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['Tipo Consentimiento']
        #swagger.path = '/tipoConsentimientos'
        #swagger.description = 'Endpoint para crear un tipo de consentimiento.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoConsentimiento'
            }
        }]
     */
    const {error} = CreateTipoConsentimientoValidation(req.body)
    if (error) return res.status(422).send({
        error: error.details[0].message
    })

    const tipo_consentimiento = await TipoConsentimientoController.createTipoConsentimiento(req.body)
    if(tipo_consentimiento.errors || tipo_consentimiento.name == "SequelizeDatabaseError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})
router.put('/' ,async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Consentimiento']
        #swagger.path = '/tipoConsentimientos'
        #swagger.description = 'Endpoint para editar un tipo de consentimiento.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoConsentimiento'
            }
        }]
     */
    const {error} = UpdateTipoConsentimientoValidation(req.body)
    if (error) return res.status(422).send({
        error: error.details[0].message
    })
    const tipo_consentimiento = await TipoConsentimientoController.updateTipoConsentimiento(req.body)
    if (tipo_consentimiento[0] == 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})
module.exports = router
