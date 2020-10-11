const Joi = require('@hapi/joi')

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