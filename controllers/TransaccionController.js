const { Transaccion } = require('../database/sequelize')
const { Op, where, col } = require("sequelize");

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
TransaccionController.getTransaccionesDeEntidadesNoPagadas = async (pCodEntidad) => {
    try {
        return await Transaccion.findAll({
            where: {
                [Op.and]: [
                    where(col(`Entidad_doctor.cod_entidad_doctor`), Op.not, null),
                    where(col(`Transaccion_Facturas.cod_transaccion_factura`), Op.eq,null),
                    where(col(`Entidad_doctor.cod_entidad`), Op.eq,pCodEntidad),
                ]
            },
            include: {all: true}
        })
    } catch (error) {
        return error
    }
}//Transaccion_Facturas

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