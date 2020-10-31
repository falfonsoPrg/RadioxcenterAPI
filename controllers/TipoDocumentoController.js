const { Tipo_documento }  = require('../database/sequelize')

TipoDocumentoController = {}

TipoDocumentoController.getTipoDocumento = async (cod_tipo_documento) =>{
    try{
        return await Tipo_documento.findByPk(cod_tipo_documento)
    } catch (error){
        return error
    }
}

TipoDocumentoController.getTipoDocumentos = async () =>{
    try {
        return await Tipo_documento.findAll()
    } catch (error){
        return error
    }
}

TipoDocumentoController.createTipoDocumento = async (pTipoDocumento) => {
    try {
        return await Tipo_documento.create(pTipoDocumento)
    } catch (error) {
        return error
    }
}
TipoDocumentoController.updateTipoDocumento = async (pTipoDocumento) => {
    try {
        return await Tipo_documento.update(pTipoDocumento,{
            where: {
                cod_tipo_documento: pTipoDocumento.cod_tipo_documento
            }
        })
    } catch (error){
        return error
    }
}

module.exports = TipoDocumentoController