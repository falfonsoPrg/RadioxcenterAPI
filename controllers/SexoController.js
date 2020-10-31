const {Sexo} = require('../database/sequelize')

SexoController = {}

SexoController.getSexo = async (cod_sexo) =>{
    try {
        return await Sexo.findByPk(cod_sexo)
    } catch(error){
        return error
    }
}
SexoController.getSexos = async () =>{
    try {
        return await Sexo.findAll()
    } catch(error) {
        return error
    }
}
SexoController.createSexo = async(pSexo) => {
    try {
        return await Sexo.create(pSexo)
    } catch (error) {
        return error
    }
}
SexoController.updateSexo = async (pSexo) => {
    try {
        return await Sexo.update(pSexo,{
            where: {
                cod_sexo: pSexo.cod_sexo
            }
        })
    } catch (error) {
        return error
    }
}
module.exports = SexoController