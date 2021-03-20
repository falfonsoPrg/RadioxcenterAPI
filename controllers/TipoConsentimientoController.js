const { Tipo_Consentimiento } = require('../database/sequelize')

TipoConsentimientoController = {}

TipoConsentimientoController.getTipoConsentimiento = async (cod_tipo_consentimiento) => {
    try {
        return await Tipo_Consentimiento.findByPk(cod_tipo_consentimiento)
    } catch (error) {
        return error
    }
}

TipoConsentimientoController.getTipoConsentimientos = async () => {
    try {
        return await Tipo_Consentimiento.findAll()
    } catch (error) {
        return error
    }
}

TipoConsentimientoController.getTipoConsentimientosActivos = async () => {
    try {
        return await Tipo_Consentimiento.findAll({
            where:{activo: true}
        })
    } catch (error) {
        return error
    }
}

TipoConsentimientoController.createTipoConsentimiento = async (pTipoConsentimiento) => {
    try {
        return await Tipo_Consentimiento.create(pTipoConsentimiento)
    } catch (error) {
        return error
    }
}

TipoConsentimientoController.updateTipoConsentimiento = async (pTipoConsentimiento) => {
    try {
        return await Tipo_Consentimiento.update(pTipoConsentimiento, {
            where: {
                cod_tipo_consentimiento: pTipoConsentimiento.cod_tipo_consentimiento
            }
        })
    }catch (error) {
        return error
    }
}
module.exports = TipoConsentimientoController