const { Factura } = require('../database/sequelize')

FacturaController = {}
FacturaController.getFactura = async (cod_factura) => {
    try{
        return await Factura.findByPk(cod_factura)
    } catch (error) {
        return error
    }
}

FacturaController.getFacturas = async() => {
    try{
        return await Factura.findAll()
    } catch (error) {
        return error
    }
}
FacturaController.createFactura = async(pFactura) => {
    try {
        return await Factura.create(pFactura)
    } catch (error) {
        return error
    }
}

FacturaController.updateFactura = async(pFactura) => {
    try{
        return await Factura.update(pFactura,{
            where:{
                cod_factura : pFactura.cod_factura
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = FacturaController