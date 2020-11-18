const { Proceso } = require('../database/sequelize')

ProcesoController = {}
ProcesoController.getProceso = async(cod_proceso) => {
    try{
        return await Proceso.findByPk(cod_proceso)
    } catch (error) {
        return error
    }
}
ProcesoController.getProcesos = async() => {
    try {
        return await Proceso.findAll()
    } catch (error) {
        return error
    }
}
ProcesoController.createProceso = async(pProceso) =>{
    try {
        return await Proceso.create(pProceso)
    } catch (error) {
        return error
    }
}

ProcesoController.updateProceso = async(pProceso) =>{
    try {
        return await Proceso.update(pProceso, {
            where: {
                cod_proceso: pProceso.cod_proceso
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = ProcesoController