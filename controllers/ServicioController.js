const {Servicio} = require('../database/sequelize')

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
ServicioController.createservicio = async(pServicio) =>{
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