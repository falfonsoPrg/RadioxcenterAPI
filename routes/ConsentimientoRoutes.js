const router = require('express').Router()
const multer = require('multer');
const pdfMaker = require("../services/PDFMaker")
const ConsentimientoController = require('../controllers/ConsentimientoController')
const Mensajes = require('../middlewares/Mensajes')
const {CreateConsentimientoValidation} = require('../middlewares/Validation')
var path = require("path");
const fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..','files','uploadImages'))
    },
    filename: function (req, file, cb) {
      cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname));
    }
  })
var upload = multer({ storage: storage })

router.get('/download', (req,res) => {
    /**
        #swagger.tags = ['Consentimientos']
        #swagger.path = '/consentimientos/download'
        #swagger.description = 'Endpoint para obtener consentimientos'
     */
    const file = path.join(__dirname,'..','files/pdf/consentimiento_juanito.pdf')
    if(!fs.existsSync(file)) return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
    return res.download(file)
})

router.get('/:cod_consentimiento', async(req,res)=>{
    /**
        #swagger.tags = ['Consentimientos']
        #swagger.path = '/consentimientos/{cod_consentimiento}'
        #swagger.description = 'Endpoint para obtener un consentimiento'
     */
    const cod_consentimiento = req.params.cod_consentimiento
    const consentimiento = await ConsentimientoController.getConsentimiento(cod_consentimiento)
    if(consentimiento){
        return res.send({
            respuesta: consentimiento
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})
router.get('/' , async(req,res)=>{
    /**
        #swagger.tags = ['Consentimientos']
        #swagger.path = '/consentimientos'
        #swagger.description = 'Endpoint para obtener consentimientos'
     */
    const consentimientos = await ConsentimientoController.getConsentimientos()
    if(consentimientos.length > 0){
        return res.send({
            respuesta: consentimientos
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/',upload.single('signature'), async(req,res)=> {
    /**
        #swagger.tags = ['Consentimientos']
        #swagger.path = '/consentimientos'
        #swagger.description = 'Endpoint para crear un consentimiento.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Consentimiento'
            },
        },
        {
            description: 'description of file',
            in:'formData',
            name: 'signature',
            type: 'file',
            required: true,
        }]
     */
    console.log("We are testing")
    const {error} = CreateConsentimientoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    console.log("Before save file")
    console.log(req.body)
    if(!req.file) return res.status(422).send({
        error: Mensajes.ErrorAlGuardarArchivo
    })
    console.log(req.file)
    pdfMaker.createPDF1(req.file.path)
    return res.send({resultado: req.file})
    // const consentimiento = await ConsentimientoController.createConsentimiento(req.body)
    // if(consentimiento.errors || consentimiento.name){
    //     return res.status(400).send({
    //         error: Mensajes.ErrorAlGuardar
    //     })
        
    // }
    // return res.status(201).send()
})
router.put('/', async(req,res)=>{
    /**
        #swagger.tags = ['Consentimientos']
        #swagger.path = '/consentimientos'
        #swagger.description = 'Endpoint para editar un consentimiento.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Consentimiento'
            }
        }]
     */
    const consentimiento = await ConsentimientoController.updateConsentimiento(req.body)
    if (consentimiento[0] == 0){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})

module.exports = router