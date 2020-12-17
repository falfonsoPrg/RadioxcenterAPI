const {Convenio, Servicio, Entidad} = require('../database/sequelize')
const Sequelize = require("sequelize")


ConvenioController= {}
ConvenioController.getConvenio = async(cod_convenio) => {
    try {
        return await Convenio.findByPk(cod_convenio)
    } catch(error) {
        return error
    }
}

ConvenioController.getConvenios = async()=> {
    try {
        return await Convenio.findAll()
    } catch (error) {
        return error
    }
}

ConvenioController.getConveniosFromEntidades = async(cod_entidad) => {
    try {
        return await Convenio.findAll({
            where: {
                cod_entidad: cod_entidad
            },
            include: Servicio,
            order:[['cod_entidad','DESC']]
        })
    } catch (error) {
        return error
    }
}

ConvenioController.getConveniosFromAllEntidades = async() => {
    try {
        return await Convenio.findAll({
            include: [Servicio,Entidad],
            order:[['cod_entidad','ASC']],
        })
    } catch (error) {
        return error
    }
}
ConvenioController.getCountConvenios = async() => {
    try {
        return await Convenio.findAll({
            attributes: ['cod_entidad',[Sequelize.fn('COUNT', Sequelize.col('cod_entidad')), 'count_entidad']],
            order:[['cod_entidad','ASC']],
            group:["cod_entidad"]
        })
    } catch (error) {
        return error
    }
}

ConvenioController.createConvenio = async(pConvenio) =>{
    try {
        return await Convenio.create(pConvenio)
    } catch (error) {
        return error
    }
}

ConvenioController.updateConvenio = async(pConvenio)=>{
    try {
        return await Convenio.update(pConvenio, {
            where: {
                cod_convenio: pConvenio.cod_convenio
            }
        })
    } catch (error) {
        return error
    }
}

ConvenioController.deleteServicioFromEntidad = async(pEntidad, pServicio) => {
    try {
        return await Convenio.destroy({
            where: {
                cod_entidad: pEntidad,
                cod_servicio: pServicio
            }
        })
    } catch (error) {
        return error
    }
}
ConvenioController.deleteAllServiciosFromEntidad = async(pEntidad) => {
    try {
        return await Convenio.destroy({
            where: {
                cod_entidad: pEntidad,
            }
        })
    } catch (error) {
        return error
    }
}
module.exports = ConvenioController