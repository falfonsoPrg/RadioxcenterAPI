const { Entidad,Servicio,Convenio } = require('../database/sequelize')

EntidadController = {}
EntidadController.getEntidad = async (cod_entidad) => {
    try {
        return await Entidad.findByPk(cod_entidad)
    } catch (error) {
        return error
    }
}
EntidadController.getAllFromEntidad = async (cod_entidad) => {
    try {
        return await Entidad.findAll({
            include: {all: true},
            order:[['cod_entidad','ASC']],
        })
    } catch (error) {
        return error
    }
}
EntidadController.getEntidades = async() => {
    try {
        return await Entidad.findAll()
    } catch (error) {
        return error
    }
}
EntidadController.createEntidad = async (pEntidad) =>{
    try{
        return await Entidad.create(pEntidad)
    } catch (error) {
        return error
    }
}
EntidadController.updateEntidad = async (pEntidad) => {
    try {
        return await Entidad.update(pEntidad, {
            where: {
                cod_entidad: pEntidad.cod_entidad
            }
        })
    } catch (error) {
        return error
    }
}
module.exports = EntidadController