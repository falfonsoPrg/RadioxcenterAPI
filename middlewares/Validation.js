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
module.exports.UpdateEmpleadoValidation = UpdateEmpleadoValidation = (data) => {
    const schema = Joi.object({
        cod_empleado: Joi.number().required(),
        nombres_empleado: Joi.string(),
        apellidos_empleado: Joi.string(),
        documento_empleado: Joi.number(),
        direccion_empleado: Joi.string(),
        fnacimiento_empleado: Joi.date(),
        telefono_empleado: Joi.string(),
        correo_empleado: Joi.string().email(),
        contrasenia_empleado: Joi.string(),
        usuario_empleado: Joi.string(),
        cod_tipo_empleado: Joi.number(),
        cod_tipo_documento: Joi.number()
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
         nombre_paquete: Joi.string(),
         precio_paquete: Joi.number()
     })
     return schema.validate(data)
 }

 module.exports.CreateProcesoValidation = CreateProcesoValidation = (data) =>{
     const schema = Joi.object({
         estado_proceso: Joi.string().required(),
         cod_usuario: Joi.number().required()
     })
     return schema.validate(data)
 }

 module.exports.UpdateProcesoValidation = UpdateProcesoValidation = (data) =>{
     const schema = Joi.object({
         cod_proceso: Joi.number().required(),
         estado_proceso: Joi.string(),
         cod_usuario: Joi.number()
     })
     return schema.validate(data)
 }

 module.exports.CreateEntidadvalidation = CreateEntidadvalidation = (data) => {
     const schema = Joi.object({
         razon_social_entidad: Joi.string().required(),
         nombre_comercial_entidad: Joi.string().required(),
         nit_entidad: Joi.string().required(),
         direccion_entidad: Joi.string().required(),
         telefono_entidad: Joi.string().required(),
         nombre_representante: Joi.string().required(),
         cedula_representante: Joi.number().required(),
         telefono_representante: Joi.string().required(),
         correo_representante: Joi.string().required(),
         nombre_contacto: Joi.string().allow(''),
         cedula_contacto: Joi.number().allow(null),
         telefono_contacto: Joi.string().allow(''),
         correo_contacto: Joi.string().allow(''),
         cod_forma_de_pago_entidad: Joi.number().required(),
         cod_tipo_facturacion: Joi.number().required()
     })
     return schema.validate(data)
 }

 module.exports.UpdateEntidadValidation = UpdateEntidadValidation = (data) => {
    const schema = Joi.object({
        cod_entidad: Joi.number().required(),
        razon_social_entidad: Joi.string(),
        nombre_comercial_entidad: Joi.string(),
        nit_entidad: Joi.string(),
        direccion_entidad: Joi.string(),
        telefono_entidad: Joi.string(),
        nombre_representante: Joi.string(),
        cedula_representante: Joi.number(),
        telefono_representante: Joi.string(),
        correo_representante: Joi.string(),
        nombre_contacto: Joi.string(),
        cedula_contacto: Joi.number(),
        telefono_contacto: Joi.string(),
        correo_contacto: Joi.string(),
        cod_forma_de_pago_entidad: Joi.number(),
        cod_tipo_facturacion: Joi.number()
    })
    return schema.validate(data)
 } 

 module.exports.CreateEntidadDoctorValidation = CreateEntidadDoctorValidation = (data) => {
     const schema = Joi.object({
         cod_doctor: Joi.number().required(),
         cod_entidad: Joi.number().required()
     })
     return schema.validate(data)
 }

 module.exports.UpdateEntidadDoctorValidation = UpdateEntidadDoctorValidation = (data) => {
    const schema = Joi.object({
        cod_entidad_doctor: Joi.number().required(),
        cod_doctor: Joi.number(),
        cod_entidad: Joi.number()
    })
    return schema.validate(data)
 }

 module.exports.CreateDoctorValidation = CreateDoctorValidation = (data) => {
     const schema = Joi.object({
         nombres_doctor: Joi.string().required(),
         apellidos_doctor: Joi.string().required(),
         direccion_doctor: Joi.string().required(),
         telefono_doctor: Joi.string().required(),
         documento_doctor: Joi.number().required(),
         correo_doctor: Joi.string().required(),
         cod_tipo_documento: Joi.number().required(),
         cod_tipo_pref_entrega: Joi.number().required()
     })
     return schema.validate(data)
 }
 module.exports.UpdateDoctorValidation = UpdateDoctorValidation = (data) => {
     const schema = Joi.object({
         cod_doctor: Joi.number().required(),
        nombres_doctor: Joi.string(),
        apellidos_doctor: Joi.string(),
        direccion_doctor: Joi.string(),
        telefono_doctor: Joi.string(),
        documento_doctor: Joi.number(),
        correo_doctor: Joi.string(),
        cod_tipo_documento: Joi.number(),
        cod_tipo_pref_entrega: Joi.number()
     })
     return schema.validate(data)
 }

 module.exports.CreateFormaDePagoEntidadValidation = CreateFormaDePagoEntidadValidation = (data) =>{
     const schema= Joi.object({
        nombre_forma_de_pago_entidad: Joi.string().required()
     })
     return schema.validate(data)
 }

 module.exports.UpdateFormaDePagoEntidadValidation = UpdateFormaDePagoEntidadValidation = (data) =>{
    const schema= Joi.object({
        cod_forma_de_pago_entidad: Joi.number().required(),
        nombre_forma_de_pago_entidad: Joi.string().required()
     })
     return schema.validate(data)
 }

 module.exports.CreateInformacionRXValidation = CreateInformacionRXValidation = (data)=>{
    const schema = Joi.object({
        nit_rx: Joi.string().required(),
        razon_social: Joi.string().required(),
        nombre_comercial: Joi.string().required()
    })
    return schema.validate(data)
 }

 module.exports.UpdateInformacionRXValidation = UpdateInformacionRXValidation = (data) =>{
    const schema = Joi.object({
        cod_informacion_rx: Joi.number().required(),
        nit_rx: Joi.string(),
        razon_social: Joi.string(),
        nombre_comercial: Joi.string()
    })
    return schema.validate(data)
 }

 module.exports.CreateConvenioValidation = CreateConvenioValidation = (data) =>{
     const schema = Joi.object({
         valor_servicio: Joi.number().required(),
         fecha_inicial_convenio: Joi.date().required(),
         fecha_final_convenio: Joi.date().required(),
         cod_entidad: Joi.number().required(),
         cod_servicio: Joi.number().required()
     })
     return schema.validate(data)
 }

 module.exports.UpdateConvenioValidation = UpdateConvenioValidation = (data) =>{
    const schema = Joi.object({
        cod_convenio: Joi.number().required(),
        valor_servicio: Joi.number(),
        fecha_inicial_convenio: Joi.date(),
        fecha_final_convenio: Joi.date(),
        cod_entidad: Joi.number(),
        cod_servicio: Joi.number()
    })
    return schema.validate(data)
 }
 module.exports.CreatePaqueteServicioValidation = CreatePaqueteServicioValidation = (data)=>{
     const schema = Joi.object({
         cod_paquete: Joi.number().required(),
         cod_servicio: Joi.number().required()
     })
     return schema.validate(data)
 }
 module.exports.UpdatePaqueteServicioValidation = UpdatePaqueteServicioValidation = (data) =>{
    const schema = Joi.object({
        cod_paquete_servicio: Joi.number().required(),
        cod_paquete: Joi.number(),
        cod_servicio: Joi.number()
    })
    return schema.validate(data)
 }

 module.exports.CreateTransaccionValidation = CreateTransaccionValidation = (data) =>{
     const schema = Joi.object({
         documento_usuario: Joi.number().required(),
         valor_transaccion: Joi.number().required(),
         fecha_transaccion: Joi.date().required(),
         nombres_acudiente: Joi.string(),
         apellidos_acudiente: Joi.string(),
         documento_acudiente: Joi.number(),
         parentesco_acudiente: Joi.string(),
         cod_entidad_doctor: Joi.number()
     })
     return schema.validate(data)
 }

 module.exports.UpdateTransaccionValidation = UpdateTransaccionValidation = (data) => {
     const schema = Joi.object({
        cod_transaccion: Joi.number().required(),
        documento_usuario: Joi.number(),
        valor_transaccion: Joi.number(),
        fecha_transaccion: Joi.date(),
        nombres_acudiente: Joi.string(),
        apellidos_acudiente: Joi.string(),
        documento_acudiente: Joi.number(),
        parentesco_acudiente: Joi.string(),
        cod_entidad_doctor: Joi.number()
     })
 }

 module.exports.CreateTransaccionServicioValidation = CreateTransaccionServicioValidation = (data) => {
     const schema = Joi.object({
         cod_transaccion: Joi.number().required(),
         cod_servicio: Joi.number().required()
     })
     return schema.validate(data)
 }

 module.exports.UpdateTransaccionServicioValidation = UpdateTransaccionServicioValidation = (data) => {
    const schema = Joi.object({
        cod_transaccion_servicio: Joi.number().required(),
        cod_transaccion: Joi.number(),
        cod_servicio: Joi.number()
    })
    return schema.validate(data)
}
