const { TransaccionFactura } = require('../database/sequelize')

TransaccionFacturaController = {}
TransaccionFacturaController.getTransaccionFactura = async (cod_transaccion_factura) => {
    try{
        return await TransaccionFactura.findByPk(cod_transaccion_factura)
    } catch (error) {
        return error
    }
}

TransaccionFacturaController.getTransaccionFacturas = async() => {
    try{
        return await TransaccionFactura.findAll()
    } catch (error) {
        return error
    }
}
TransaccionFacturaController.createTransaccionFactura = async(pTransaccionFactura) => {
    try {
        return await TransaccionFactura.create(pTransaccionFactura)
    } catch (error) {
        return error
    }
}

TransaccionFacturaController.updateTransaccionFactura = async(pTransaccionFactura) => {
    try{
        return await TransaccionFactura.update(pTransaccionFactura,{
            where:{
                cod_transaccion_factura : pFactura.cod_transaccion_factura
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = TransaccionFacturaController