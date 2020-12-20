const router = require('express').Router()
const InformacionRXController = require('../controllers/InformacionRXController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateInformacionRXValidation, UpdateInformacionRXValidation} = require('../middlewares/Validation')

router.get('/:cod_informacion_rx', async(req,res)=>{
    /**
        #swagger.tags = ['informacionRX']
        #swagger.path = '/informacionRX/{cod_informacion_rx}'
        #swagger.description = 'Endpoint para obtener información de RX'
     */
    const cod_informacion_rx = req.params.cod_informacion_rx
    const informacionRX = await InformacionRXController.getInformacionRX(cod_informacion_rx)

    if(informacionRX) {
        return res.send({
            respuesta: informacionRX
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})
router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['informacionRX']
        #swagger.path = '/informacionRX'
        #swagger.description = 'Endpoint para obtener toda información de RX'
     */
    const informacionRX = await InformacionRXController.getInformacionesRX()
    if(informacionRX.length > 0){
        return res.send({
            respuesta: informacionRX
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req,res)=>{
    /**
        #swagger.tags = ['informacionRX']
        #swagger.path = '/informacionRX'
        #swagger.description = 'Endpoint para crear información de RX.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/InformacionRX'
            }
        }]
     */
    const {error} = CreateInformacionRXValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const informacionRX = await InformacionRXController.createInformacionRX(req.body)
    if(informacionRX.errors || informacionRX.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['informacionRX']
        #swagger.path = '/informacionRX'
        #swagger.description = 'Endpoint para editar información de RX.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/InformacionRX'
            }
        }]
     */
    const {error} = UpdateInformacionRXValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const informacionRX = await InformacionRXController.updateInformacionRX(req.body)
    if(informacionRX[0]== 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router