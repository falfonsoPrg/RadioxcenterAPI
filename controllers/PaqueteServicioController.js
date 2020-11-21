const { Paquete_Servicio, Servicio } = require('../database/sequelize')

PaqueteServicioController = {}

PaqueteServicioController.getPaquete = async (cod_paquete) => {
    try{
        return await Paquete_Servicio.findByPk(cod_paquete)
    } catch (error) {
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

module.exports = PaqueteServicioController