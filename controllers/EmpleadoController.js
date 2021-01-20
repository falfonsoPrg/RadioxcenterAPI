const { Empleado } = require('../database/sequelize')
const { Op } = require("sequelize");

EmpleadoController = {}
EmpleadoController.getEmpleado = async (cod_empleado) => {
    try {
        return await Empleado.findByPk(cod_empleado,{
            attributes: { exclude: ['contrasenia_empleado'] }
        })
    } catch (error) {
        return error
    }
}
EmpleadoController.getEmpleados = async () => {
    try {
        return await Empleado.findAll({
            attributes: { exclude: ['contrasenia_empleado'] }
        })
    } catch (error) {
        return error
    }
}
EmpleadoController.getEmpleadosP = async (nombres,apellidos,documento,correo,usuario) => {
    const options = []
    if(nombres) options.push({nombres_empleado: nombres})
    if(apellidos) options.push({apellidos_empleado: apellidos})
    if(documento) options.push({documento_empleado: documento})
    if(correo) options.push({correo_empleado: correo})
    if(usuario) options.push({usuario_empleado: usuario})
    try {
        return await Empleado.findAll({where: {[Op.or]: options}})
    } catch (error) {
        return error
    }
}
EmpleadoController.createEmpleado = async (pEmpleado) => {
    try {
        return await Empleado.create(pEmpleado)
    } catch (error) {
        return error
    }
}

EmpleadoController.updateEmpleado = async (pEmpleado) => {
    try {
        return await Empleado.update(pEmpleado,{
            where: {
                cod_empleado: pEmpleado.cod_empleado
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = EmpleadoController