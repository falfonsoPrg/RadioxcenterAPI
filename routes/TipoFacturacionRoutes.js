const router = require('express').Router()
const TipoFacturacionController = require('../controllers/TipoFacturacionController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateTipoFacturacionValidation , UpdateTipoFacturacionValidation} = require('../middlewares/Validation')

router.get('/:cod_tipo_facturacion', async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Facturación']
        #swagger.path = '/tipoFacturaciones/{cod_tipo_facturacion}'
        #swagger.description = 'Endpoint para obtener un tipo de facturación'
     */
   const cod_tipo_facturacion= req.params.cod_tipo_facturacion
   const tipo_facturacion = await TipoFacturacionController.getTipoFacturacion(cod_tipo_facturacion)
   if(tipo_facturacion){
       return res.send({
           respuesta: tipo_facturacion
       })
   }
   return res.status(404).send({
       error: Mensajes.RegistroNoEncontradoPorParametro
   })
})

router.get('/', async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Facturación']
        #swagger.path = '/tipoFacturaciones'
        #swagger.description = 'Endpoint para obtener tipos de facturación'
     */
    const tipo_facturaciones = await TipoFacturacionController.getTipoFacturaciones()
    if(tipo_facturaciones.length > 0){
        return res.send({
            respuesta: tipo_facturaciones
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async(req, res)=>{
    /**
        #swagger.tags = ['Tipo Facturación']
        #swagger.path = '/tipoFacturaciones'
        #swagger.description = 'Endpoint para crear un tipo de facturación.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoFacturacion'
            }
        }]
     */
    const {error} = CreateTipoFacturacionValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const tipo_facturacion = await TipoFacturacionController.createTipoFacturacion(req.body)
    if (tipo_facturacion.errors || tipo_facturacion.name == "SequelizeDatabaseError"){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})
router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Tipo Facturación']
        #swagger.path = '/tipoFacturaciones'
        #swagger.description = 'Endpoint para editar un tipo de facturación.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/TipoFacturacion'
            }
        }]
     */
    const {error} = UpdateTipoFacturacionValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const tipo_facturacion = await TipoFacturacionController.updateTipoFacturacion(req.body)
    if(tipo_facturacion[0]==0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router