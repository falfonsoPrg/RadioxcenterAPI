const {Consentimiento} = require('../database/sequelize')

ConsentimientoController = {}

ConsentimientoController.getConsentimiento = async (cod_consentimiento) =>{
    try {
        return await Consentimiento.findByPk(cod_consentimiento)
    } catch (error){
        return error
    }
}
ConsentimientoController.getConsentimientos = async() =>{
    try{
        return await Consentimiento.findAll()
    } catch (error){
        return error
    }
}
ConsentimientoController.createConsentimiento = async(pConsentimiento) =>{
    try {
        return await Consentimiento.create(pConsentimiento)
    } catch (error) {
        return error
    }
}
ConsentimientoController.updateConsentimiento = async(pConsentimiento) => {
    try {
        return await Consentimiento.update(pConsentimiento,{
            where: {
                cod_consentimiento: pConsentimiento.cod_consentimiento
            }
        })
    } catch (error){
        return error
    }
}

module.exports = ConsentimientoController