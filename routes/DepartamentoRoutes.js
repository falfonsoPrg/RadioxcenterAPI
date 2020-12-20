const router = require('express').Router()
const DepartamentoController = require('../controllers/DepartamentoController')
const Mensajes = require('../middlewares/Mensajes')
const { CreateDepartamentoValidation,UpdateDepartamentoValidation } = require('../middlewares/Validation')

router.get('/:cod_departamento', async (req,res)=>{
    /**
        #swagger.tags = ['Departamentos']
        #swagger.path = '/departamentos/{cod_departamento}'
        #swagger.description = 'Endpoint para obtener un departamento'
     */
    const cod_departamento = req.params.cod_departamento
    const departamento = await DepartamentoController.getDepartamento(cod_departamento)
    if(departamento){
        return res.send({
            respuesta: departamento
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontradoPorParametro
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['Departamentos']
        #swagger.path = '/departamentos'
        #swagger.description = 'Endpoint para obtener departamentos'
     */
    const departamentos = await DepartamentoController.getDepartamentos()
    if(departamentos.length > 0){
        return res.send({
            respuesta: departamentos
        })
    }
    return res.status(404).send({
        error: Mensajes.RegistroNoEncontrado
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['Departamentos']
        #swagger.path = '/departamentos'
        #swagger.description = 'Endpoint para registrar un departamento.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Departamento'
            }
        }]
     */
    const {error} = CreateDepartamentoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const departamento = await DepartamentoController.createDepartamento(req.body)
    if(departamento.errors || departamento.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['Departamentos']
        #swagger.path = '/departamentos'
        #swagger.description = 'Endpoint para editar un departamento.'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Departamento'
            }
        }]
     */
    const {error} = UpdateDepartamentoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const departamento = await DepartamentoController.updateDepartamento(req.body);
    if(departamento[0] == 0 || departamento.name){
        return res.status(404).send({
            error: Mensajes.ErrorAlActualizar
        })
    }
    return res.status(204).send()
})


module.exports = router;