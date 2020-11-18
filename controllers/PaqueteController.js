const { Paquete } = require('../database/sequelize')

PaqueteController = {}
PaqueteController.getPaquete = async (cod_paquete) => {
    try{
        return await Paquete.findByPk(cod_paquete)
    } catch (error) {
        return error
    }
}

PaqueteController.getPaquetes = async() => {
    try{
        return await Paquete.findAll()
    } catch (error) {
        return error
    }
}
PaqueteController.createPaquete = async(pPaquete) => {
    try {
        return await Paquete.create(pPaquete)
    } catch (error) {
        return error
    }
}

PaqueteController.updatePaquete = async(pPaquete) => {
    try{
        return await Paquete.update(pPaquete,{
            where:{
                cod_paquete : pPaquete.cod_paquete
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = PaqueteController