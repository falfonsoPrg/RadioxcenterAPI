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

module.exports.CreateCiudadValidation = CreateCiudadValidation = (data) => {
    const schema = Joi.object({
        nom_ciudad: Joi.string().required(),
        cod_departamento: Joi.number().required()
    })
    return schema.validate(data)
}
module.exports.UpdateCiudadValidation = UpdateCiudadValidation = (data) => {
    const schema = Joi.object({
        cod_ciudad: Joi.number().required(),
        nom_ciudad: Joi.string(),
        cod_departamento: Joi.number()
    })
    return schema.validate(data)
}

module.exports.CreateTipoEmpleadoValidation = CreateTipoEmpleadoValidation = (data) => {
    const schema = Joi.object({
        nombre_tipo_empleado: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.UpdateTipoEmpleadoValidation =  UpdateTipoEmpleadoValidation = (data) => {
    const schema = Joi.object({
        cod_tipo_empleado: Joi.number().required(),
        nombre_tipo_empleado: Joi.string()
    })
    return schema.validate(data)
}

module.exports.CreateTipoConsentimientoValidation = CreateTipoConsentimientoValidation = (data) => {
    const schema = Joi.object({
        nombre_tipo_consentimiento: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.UpdateTipoConsentimientoValidation = UpdateTipoConsentimientoValidation = (data) => {
    const schema = Joi.object({
        cod_tipo_consentimiento: Joi.number().required(),
        nombre_tipo_consentimiento: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.CreateTipoFacturacionValidation = CreateTipoFacturacionValidation = (data) => {
    const schema = Joi.object({
        nombre_tipo_facturacion: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.UpdateTipoFacturacionValidation = UpdateTipoFacturacionValidation = (data) => {
    const schema = Joi.object({
        cod_tipo_facturacion: Joi.number().required(),
        nombre_tipo_facturacion: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.CreateUsuarioValidation = CreateUsuarioValidation = (data) =>{
    const schema = Joi.object({
        nombres_usuario: Joi.string().required(),
        apellidos_usuario: Joi.string().required(),
        telefono_usuario: Joi.string().required(),
        direccion_usuario: Joi.string().required(),
        documento_usuario: Joi.number().required(),
        ocupacion_usuario: Joi.string().required(),
        fecha_nacimiento_usuario: Joi.date().required(),
        correo_usuario: Joi.string().required(),
        genero_usuario: Joi.string().required(),
        celular_usuario: Joi.string().required(),
        cod_sexo: Joi.number().required(),
        cod_tipo_documento: Joi.number().required(),
        cod_ciudad: Joi.number().required(),
        cod_tipo_pref_entrega: Joi.number().required()
    })
    return schema.validate(data)
}
// espacio para update usuario validate


module.exports.CreateTipoDocumentoValidation = CreateTipoDocumentoValidation = (data) =>{
    const schema = Joi.object({
        nombre_tipo_documento: Joi.string().required()
    })
    return schema.validate(data)
}
module.exports.UpdateTipoDocumentoValidation = UpdateTipoDocumentoValidation = (data) =>{
    const schema= Joi.object({
        cod_tipo_documento: Joi.number().required(),
        nombre_tipo_documento: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.CreateTipoNotaCreditoValidation = CreateTipoNotaCreditoValidation = (data) =>{
    const schema = Joi.object({
        nombre_tipo_nota_credito: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.UpdateTipoNotaCreditoValidation = UpdateTipoNotaCreditoValidation = (data) =>{
    const schema = Joi.object({
        cod_tipo_nota_credito: Joi.number().required(),
        nombre_tipo_nota_credito: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.CreateTipoPrefEntregaValidation = CreateTipoPrefEntregaValidation = (data) =>{
    const schema = Joi.object({
        nombre_tipo_pref_entrega: Joi.string().required()
    })
    return schema.validate(data)
}
module.exports.UpdateTipoPrefEntregaValidation = UpdateTipoPrefEntregaValidation = (data) =>{
    const schema = Joi.object({
        cod_tipo_pref_entrega: Joi.number().required(),
        nombre_tipo_pref_entrega: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.CreateSexoValidation = CreateSexoValidation = (data) =>{
    const schema = Joi.object({
        nombre_sexo: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.UpdateSexoValidation = UpdateSexoValidation = (data) =>{
    const schema = Joi.object({
        cod_sexo: Joi.number().required(),
        nombre_sexo: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.CreateServicioValidation = CreateServicioValidation = (data) =>{
    const schema = Joi.object({
        nombre_servicio: Joi.string().required(),
        descripcion_servicio: Joi.string().required(),
        precio_servicio: Joi.number().required(),
        iva_servicio: Joi.number()
    })
    return schema.validate(data)
} 
 // falta crear el de update de servicio

 module.exports.CreateTipoPagoValidation = CreateTipoPagoValidation = (data) =>{
     const schema = Joi.object({
         nombre_tipo_pago: Joi.string().required()
     })
     return schema.validate(data)
 }

 module.exports.UpdateTipoPagoValidation = UpdateTipoPagoValidation = (data) =>{
     const schema = Joi.object({
         cod_tipo_pago: Joi.number().required(),
         nombre_tipo_pago: Joi.string().required()
     })
     return schema.validate(data)
 }

 module.exports.CreatePaqueteValidation = CreatePaqueteValidation = (data) =>{
     const schema = Joi.object({
         nombre_paquete: Joi.string().required(),
         precio_paquete: Joi.number().required()
     })
     return schema.validate(data)
 }
 module.exports.UpdatePaqueteValidation = UpdatePaqueteValidation = (data) =>{
     const schema = Joi.object({
         cod_paquete: Joi.number().required(),
         nombre_paquete: Joi.string().required(),
         precio_paquete: Joi.number().required()
     })
     return schema.validate(data)
 }
