const {Servicio} = require('../database/sequelize')
const { Op } = require("sequelize");
ServicioController = {}

ServicioController.getServicio = async (cod_servicio) =>{
    try {
        return await Servicio.findByPk(cod_servicio)
    } catch (error){
        return error
    }
}
ServicioController.getServicios = async() =>{
    try{
        return await Servicio.findAll()
    } catch (error){
        return error
    }
}
ServicioController.getServicioPorNombre = async(pNombre) =>{
    try{
        return await Servicio.findAll({
            where:{
                nombre_servicio: pNombre
            }
        })
    } catch (error){
        return error
    }
}
ServicioController.getServicios = async(excludeServicios, excludeConvenios, excludePaquetes) =>{
    var whereParams = {
        nombre_servicio:{
            [Op.and]: [
                {[Op.notLike]: excludeServicios=='true' ? 'SE-%':''},
                {[Op.notLike]: excludeConvenios=='true' ? 'CO-%':''},
                {[Op.notLike]: excludePaquetes=='true' ? 'PA-%':''},
            ]
        }
    }
    try{
        return await Servicio.findAll({
            where: whereParams
        })
    } catch (error){
        return error
    }
}
ServicioController.createservicio = async(pServicio) =>{
    try {
        return await Servicio.create(pServicio)
    } catch (error) {
        return error
    }
}
ServicioController.createservicioConPrefijo = async(pServicio, pPrefijo) =>{
    pPrefijo += "-"
    if(!pServicio.nombre_servicio.startsWith(pPrefijo)){
        pServicio.nombre_servicio = pPrefijo+pServicio.nombre_servicio
    }
    try {
        return await Servicio.create(pServicio)
    } catch (error) {
        return error
    }
}
ServicioController.updateServicio = async(pServicio) => {
    try {
        return await Servicio.update(pServicio,{
            where: {
                cod_servicio: pServicio.cod_servicio
            }
        })
    } catch (error){
        return error
    }
}

module.exports = ServicioController