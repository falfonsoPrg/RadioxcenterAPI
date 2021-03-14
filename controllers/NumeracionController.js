const { Numeracion } = require('../database/sequelize')

NumeracionController = {}
NumeracionController.getNumeracion = async (cod_numeracion) => {
    try{
        return await Numeracion.findByPk(cod_numeracion)
    } catch (error) {
        return error
    }
}

NumeracionController.getNumeraciones = async() => {
    try{
        return await Numeracion.findAll()
    } catch (error) {
        return error
    }
}
NumeracionController.createNumeracion = async(pNumeracion) => {
    try {
        return await Numeracion.create(pNumeracion)
    } catch (error) {
        return error
    }
}

NumeracionController.updateNumeracion = async(pNumeracion) => {
    try{
        return await Numeracion.update(pNumeracion,{
            where:{
                cod_numeracion : pNumeracion.cod_numeracion
            }
        })
    } catch (error) {
        return error
    }
}

NumeracionController.aumentarNumeracion = async(cod_numeracion) => {
    try{
        var numeracion = await Numeracion.findByPk(cod_numeracion)
        if(numeracion.numeracion_actual > numeracion.numeracion_final) return [0]
        return await Numeracion.update({numeracion_actual: numeracion.numeracion_actual + numeracion.numeracion_aumento},{
            where:{
                cod_numeracion : numeracion.cod_numeracion
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = NumeracionController