const { Transaccion_Servicio } = require('../database/sequelize')
const TransaccionController = require('./TransaccionController')

TransaccionServicioController = {}

TransaccionServicioController.getTransaccionServicio = async(cod_transaccion_servicio) => {
    try{
        return await Transaccion_Servicio.findByPk(cod_transaccion_servicio)
    } catch (error) {
        return error
    }
}

TransaccionServicioController.getTransaccionServicios = async() => {
    try{
        return await Transaccion_Servicio.findAll()
    } catch (error) {
        return error
    }
}

TransaccionServicioController.createTransaccionServicio = async(pTransaccionServicio) => {
    try {
        return await Transaccion_Servicio.create(pTransaccionServicio)
    } catch (error) {
        return error
    }
}

TransaccionServicioController.updateTransaccionServicio = async(pTransaccionServicio) => {
    try {
        return await Transaccion_Servicio.update(pTransaccionServicio)
    } catch (error) {
        return error
    }
}

module.exports = TransaccionServicioController