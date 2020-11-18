const { Tipo_pago } = require('../database/sequelize')

TipoPagoController = {}
TipoPagoController.getTipoPago = async (cod_tipo_pago) => {
    try{
        return await Tipo_pago.findByPk(cod_tipo_pago)
    } catch(error){
        return error
    }
}
TipoPagoController.getTipoPagos = async () => {
    try {
        return await Tipo_pago.findAll()
    } catch(error) {
        return error
    }
}
TipoPagoController.createTipoPago = async (pTipoPago) => {
    try {
        return await Tipo_pago.create(pTipoPago)
    } catch (error) {
        return error
    }
}

TipoPagoController.updateTipoPago = async(pTipoPago) => {
    try{
        return await Tipo_pago.update(pTipoPago, {
            where : {
                cod_tipo_pago: pTipoPago.cod_tipo_pago
            }
        })
    } catch (error){
        return error
    }
}

module.exports = TipoPagoController