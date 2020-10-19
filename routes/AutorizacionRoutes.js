const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Empleado = require("../controllers/EmpleadoController")
const Mensajes = require('../middlewares/Mensajes')
const {CreateEmpleadoValidation,LoginEmpleadoValidation} = require('../middlewares/Validation')

router.post('/register', async (req,res)=>{
    const {error} = CreateEmpleadoValidation(req.body)
    if(error) return res.status(422).send({error: error.details[0].message})
    
    const encontroEmpleado = await Empleado.getEmpleadosP(undefined,undefined,req.body.documento_empleado,req.body.correo_empleado,req.body.usuario_empleado)
    if(encontroEmpleado.length > 0){
        return res.status(422).send({error: Mensajes.RegistroYaSeEncuentraRegistrado})
    }
    
    //Hashea la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.contrasenia_empleado, salt)

    const empl = req.body
    empl.contrasenia_empleado = hashedPassword

    const empleado = await Empleado.createEmpleado(empl);
    if(empleado.errors || empleado.name){
        return res.status(400).send({
            error: Mensajes.ErrorAlGuardar
        })
    }
    return res.status(201).send()
})

//Login
router.post('/login', async (req,res)=>{
    //Validacion
    const {error} = LoginEmpleadoValidation(req.body)
    if(error) return res.status(422).send({error: error.details[0].message})

    //Valida que el usuario SI exista
    const encontroEmpleado = await Empleado.getEmpleadosP(undefined,undefined,undefined,undefined,req.body.usuario_empleado)
    if(encontroEmpleado.length == 0){
        return res.status(422).send({error: Mensajes.RegistroNoSeEncuentraRegistrado})
    }
    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.contrasenia_empleado,encontroEmpleado[0].contrasenia_empleado)
    if(!validPass) return res.status(422).send({error:'Credenciales incorrectas'})

    //Create and put a token
    const token = jwt.sign({documento_empleado:encontroEmpleado[0].documento_empleado},process.env.JWTOKEN,{
        expiresIn: "1d"
    })
    res.header('auth-token',token).send({token:token})
})


module.exports = router;