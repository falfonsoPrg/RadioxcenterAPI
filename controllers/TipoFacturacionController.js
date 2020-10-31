const { Tipo_facturacion } =require('../database/sequelize')

TipoFacturacionController = {}

TipoFacturacionController.getTipoFacturacion = async(cod_tipo_facturacion) => {
    try {
        return await Tipo_facturacion.findByPk(cod_tipo_facturacion)
    } catch (error){
        return error
    }
}
TipoFacturacionController.getTipoFacturaciones = async () => {
    try{
        return await Tipo_facturacion.findAll()
    } catch (error){
        return error
    }
}
TipoFacturacionController.createTipoFacturacion = async (pTipoFacturacion) => {
    try {
        return await Tipo_facturacion.create(pTipoFacturacion)
    } catch (error) {
        return error
    }
}
TipoFacturacionController.updateTipoFacturacion = async (pTipoFacturacion) => {
    try{
        return await Tipo_facturacion.update(pTipoFacturacion,{
            where: {
                cod_tipo_facturacion: pTipoFacturacion.cod_tipo_facturacion
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = TipoFacturacionController