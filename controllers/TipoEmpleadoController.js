const { Tipo_empleado } = require('../database/sequelize');

TipoEmpleadoController= {}

TipoEmpleadoController.getTipoEmpleado = async (cod_tipo_empleado) => {
    try {
        return await Tipo_empleado.findByPk(cod_tipo_empleado)
    } catch (error) {
        return error
    }
}
TipoEmpleadoController.getTipoEmpleados = async () => {
    try{
        return await Tipo_empleado.findAll()
    } catch (error) {
        return error
    }
}
TipoEmpleadoController.createTipoEmpleado = async (pTipoEmpleado) => {
    try {
        return await Tipo_empleado.create(pTipoEmpleado)
    } catch (error) {
        return error
    }
}
TipoEmpleadoController.updateTipoEmpleado = async (pTipoEmpleado) => {
    try {
        return await Tipo_empleado.update(pTipoEmpleado, {
            where: {
                cod_tipo_empleado: pTipoEmpleado.cod_tipo_empleado
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = TipoEmpleadoController
