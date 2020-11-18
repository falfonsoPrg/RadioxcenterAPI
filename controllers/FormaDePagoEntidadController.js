const {Forma_de_pago_entidad} = require('../database/sequelize')

FormaDePagoEntidadController= {}

FormaDePagoEntidadController.getFormaDePagoEntidad = async(cod_forma_de_pago_entidad) =>{
    try {
        return await Forma_de_pago_entidad.findByPk(cod_forma_de_pago_entidad)
    } catch (error) {
        return error
    }
}

FormaDePagoEntidadController.getFormaDePagoEntidades = async() =>{
    try {
        return await Forma_de_pago_entidad.findAll()
    } catch (error) {
        return error
    }
}
FormaDePagoEntidadController.createFormaDePagoEntidad = async(pFormaDePagoEntidad) =>{
    try {
        return await Forma_de_pago_entidad.create(pFormaDePagoEntidad)
    } catch (error){
        return error
    }
}

FormaDePagoEntidadController.updateFormaDePagoEntidad = async(pFormaDePagoEntidad) => {
    try {
        return await Forma_de_pago_entidad.update(pFormaDePagoEntidad,{
            where: {
                cod_forma_de_pago_entidad : pFormaDePagoEntidad.cod_forma_de_pago_entidad
            }
        })
    } catch (error){
        return error
    }
}

module.exports = FormaDePagoEntidadController