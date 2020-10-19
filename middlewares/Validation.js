const Joi = require('@hapi/joi')

module.exports.LoginEmpleadoValidation = LoginEmpleadoValidation = (data) => {
    const schema = Joi.object({
        usuario_empleado: Joi.string().required(),
        contrasenia_empleado: Joi.string().required()
    })
    return schema.validate(data)
}
module.exports.CreateEmpleadoValidation = CreateEmpleadoValidation = (data) => {
    const schema = Joi.object({
        nombres_empleado: Joi.string().required(),
        apellidos_empleado: Joi.string().required(),
        documento_empleado: Joi.number().required(),
        direccion_empleado: Joi.string().required(),
        fnacimiento_empleado: Joi.date().required(),
        telefono_empleado: Joi.string().required(),
        correo_empleado: Joi.string().email().required(),
        contrasenia_empleado: Joi.string().required(),
        usuario_empleado: Joi.string().required(),
        cod_tipo_empleado: Joi.number().required(),
        cod_tipo_documento: Joi.number().required()
    })
    return schema.validate(data)
}

module.exports.CreateDepartamentoValidation = CreateDepartamentoValidation = (data) => {
    const schema = Joi.object({
        nom_departamento: Joi.string().required()
    })
    return schema.validate(data)
}
module.exports.UpdateDepartamentoValidation = UpdateDepartamentoValidation = (data) => {
    const schema = Joi.object({
        cod_departamento: Joi.number().required(),
        nom_departamento: Joi.string()
    })
    return schema.validate(data)
}