const { Entidad,Servicio,Convenio, sequelize } = require('../database/sequelize')
const { Op, where, col } = require("sequelize");

EntidadController = {}
EntidadController.getEntidad = async (cod_entidad) => {
    try {
        return await Entidad.findByPk(cod_entidad)
    } catch (error) {
        return error
    }
}
EntidadController.getEntidadPorNit = async (pNitEntidad) => {
    try {
        return await Entidad.findOne({
            where: {nit_entidad: pNitEntidad}
        })
    } catch (error) {
        return error
    }
}
EntidadController.getAllFromEntidad = async () => {
    try {
        return await Entidad.findAll({
            where: where(col(`Convenios.cod_convenio`), Op.not, null),
            include: {all: true},
            order:[['cod_entidad','ASC']],
        })
    } catch (error) {
        return error
    }
}
EntidadController.getAllDoctoresFromEntidad = async () => {
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
        return await Entidad.findAll({
            include: {all: true},
        })
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