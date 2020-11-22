const { Paquete_Servicio, Servicio } = require('../database/sequelize')

PaqueteServicioController = {}

PaqueteServicioController.getPaquete = async (cod_paquete) => {
    try{
        return await Paquete_Servicio.findByPk(cod_paquete)
    } catch (error) {
        return error
    }
}
PaqueteServicioController.getPaqueteServicio= async(cod_paquete_servicio) => {
    try {
        return await Paquete_Servicio.findByPk(cod_paquete_servicio)
    } catch (error) {
        return error
    }
}
PaqueteServicioController.getPaqueteServicios = async()=>{
    try{
        return await Paquete_Servicio.findAll()
    } catch (error){
        return error
    }
}

PaqueteServicioController.getServiciosFromPaquetes = async(cod_paquete) => {
    try{
        return await Paquete_Servicio.findAll({
            include: Servicio
        })
    } catch (error) {
        return error
    }
}
PaqueteServicioController.createPaqueteServicio = async(pPaquete) => {
    try {
        return await Paquete_Servicio.create(pPaquete)
    } catch (error) {
        return error
    }
}

PaqueteServicioController.updatePaquete = async(pPaquete) => {
    try{
        return await Paquete_Servicio.update(pPaquete,{
            where:{
                cod_paquete : pPaquete.cod_paquete
            }
        })
    } catch (error) {
        return error
    }
}

PaqueteServicioController.updatePaqueteServicio = async(pPaqueteServicio) => {
    try {
        return await Paquete_Servicio.update(pPaqueteServicio,{
            where: {
                cod_paquete_servicio: pPaqueteServicio.cod_paquete_servicio
            }
        })
    } catch (error){
        return error
    }
}

module.exports = PaqueteServicioController