const {Consentimiento} = require('../database/sequelize')
const { Op, where, col } = require("sequelize");

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
        return await Consentimiento.findAll({include: {all: true}})
    } catch (error){
        return error
    }
}
ConsentimientoController.getConsentimientosPorUsuario = async(pDocumentoUsuario) =>{
    try{
        return await Consentimiento.findAll({
            where:{
                [Op.and]: [
                    where(col(`Transaccion.documento_usuario`), Op.eq, pDocumentoUsuario)
                ]
            },
            include: {all: true},
            order: [
                ['createdAt', 'DESC']
            ]
        })
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