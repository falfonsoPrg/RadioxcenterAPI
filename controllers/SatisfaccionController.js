const { Satisfaccion } = require('../database/sequelize')

SatisfaccionController = {}
SatisfaccionController.getSatisfaccion = async(cod_satisfaccion) => {
    try{
        return await Satisfaccion.findByPk(cod_satisfaccion)
    } catch (error) {
        return error
    }
}
SatisfaccionController.getSatisfacciones = async() => {
    try {
        return await Satisfaccion.findAll()
    } catch (error) {
        return error
    }
}
SatisfaccionController.createSatisfaccion = async(pSatisfaccion) =>{
    try {
        return await Satisfaccion.create(pSatisfaccion)
    } catch (error) {
        return error
    }
}

SatisfaccionController.updateSatisfaccion = async(pSatisfaccion) =>{
    try {
        return await Satisfaccion.update(pSatisfaccion, {
            where: {
                cod_satisfaccion: pSatisfaccion.cod_satisfaccion
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = SatisfaccionController