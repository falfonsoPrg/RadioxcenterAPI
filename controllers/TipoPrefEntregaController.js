const {Tipo_pref_entrega} = require('../database/sequelize')

TipoPrefEntregaController = {}

TipoPrefEntregaController.getTipoPrefEntrega = async(cod_tipo_pref_entrega)=>{
    try{
        return await Tipo_pref_entrega.findByPk(cod_tipo_pref_entrega)
    } catch (error){
        return error
    }
}
TipoPrefEntregaController.getTipoPrefEntregas = async() =>{
    try {
        return await Tipo_pref_entrega.findAll()
    } catch (error) {
        return error
    }
}
TipoPrefEntregaController.createTipoPrefEntrega = async(pTipoPrefEntrega) =>{
    try {
        return await Tipo_pref_entrega.create(pTipoPrefEntrega)
    } catch (error){
        return error
    }
}
TipoPrefEntregaController.updateTipoPrefEntrega = async(pTipoPrefEntrega) => {
    try {
        return await Tipo_pref_entrega.update(pTipoPrefEntrega, {
            where: {
                cod_tipo_pref_entrega: pTipoPrefEntrega.cod_tipo_pref_entrega
            }
        })
    } catch (error){
        return error
    }
}

module.exports = TipoPrefEntregaController