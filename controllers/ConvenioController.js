const {Convenio} = require('../database/sequelize')

ConvenioController= {}
ConvenioController.getConvenio = async(cod_convenio) => {
    try {
        return await Convenio.findByPk(cod_convenio)
    } catch(error) {
        return error
    }
}

ConvenioController.getConvenios = async()=> {
    try {
        return await Convenio.findAll()
    } catch (error) {
        return error
    }
}

ConvenioController.getConvenioxEntidad = async(pcod_entidad)=>{
    try {
        return await Convenio.findAll({
            where: {
                cod_entidad: pcod_entidad
            }
        })
    } catch (error){
        return error
    }
}

ConvenioController.createConvenio = async(pConvenio) =>{
    try {
        return await Convenio.create(pConvenio)
    } catch (error) {
        return error
    }
}

ConvenioController.updateConvenio = async(pConvenio)=>{
    try {
        return await Convenio.update(pConvenio, {
            where: {
                cod_convenio: pConvenio.cod_convenio
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = ConvenioController