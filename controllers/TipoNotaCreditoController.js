const { Tipo_nota_credito } = require('../database/sequelize')

TipoNotaCreditoController = {}

TipoNotaCreditoController.getTipoNotaCredito = async (cod_tipo_nota_credito) =>{
    try {
        return await Tipo_nota_credito.findByPk(cod_tipo_nota_credito)
    } catch (error){
        return error
    }
}
TipoNotaCreditoController.getTipoNotaCreditos = async ()=>{
    try {
        return await Tipo_nota_credito.findAll()
    } catch (erorr){
        return error
    }
}
TipoNotaCreditoController.createTipoNotaCredito = async(pTipoNotaCredito)=>{
    try{
        return await Tipo_nota_credito.create(pTipoNotaCredito)
    } catch (error) {
        return error
    }
}
TipoNotaCreditoController.updateTipoNotaCredito = async(pTipoNotaCredito) =>{
    try {
        return await Tipo_nota_credito.update(pTipoNotaCredito,{
            where: {
                cod_tipo_nota_credito: pTipoNotaCredito.cod_tipo_nota_credito
            }
        })
    } catch (error){
        return error
    }
}

module.exports = TipoNotaCreditoController