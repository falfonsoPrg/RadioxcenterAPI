const { Ciudad, Departamento } = require('../database/sequelize')

CiudadController = {}
CiudadController.getCiudad = async (cod_ciudad) => {
    try {
        return await Ciudad.findByPk(cod_ciudad)
    } catch (error) {
        return error
    }
}
CiudadController.getCiudades = async () => {
    try {
        return await Ciudad.findAll({
            include:Departamento
        })
    } catch (error) {
        return error
    }
}
CiudadController.createCiudad = async (pCiudad) => {
    try {
        return await Ciudad.create(pCiudad)
    } catch (error) {
        return error
    }
}

CiudadController.updateCiudad = async (pCiudad) => {
    try {
        return await Ciudad.update(pCiudad,{
            where: {
                cod_ciudad: pCiudad.cod_ciudad
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = CiudadController