const { Transaccion } = require('../database/sequelize')

TransaccionController = {}

TransaccionController.getTransaccion = async(cod_transaccion) => {
    try {
        return await Transaccion.findByPk(cod_transaccion)
    } catch (error) {
        return error
    }
}

TransaccionController.getTransacciones = async () => {
    try {
        return await Transaccion.findAll({
            include: {all: true}
        })
    } catch (error) {
        return error
    }
}

TransaccionController.createTransaccion = async (pTransaccion) => {
    try {
        return await Transaccion.create(pTransaccion)
    } catch (error) {
        return error
    }
}

TransaccionController.updateTransaccion = async(pTransaccion) => {
    try {
        return await Transaccion.update(pTransaccion, {
            where : {
                cod_transaccion : pTransaccion.cod_transaccion
            }
        })
    } catch (erorr) {
        return error
    }
}

module.exports = TransaccionController