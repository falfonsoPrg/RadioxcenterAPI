const { Departamento } = require('../database/sequelize')

DepartamentoController = {}
DepartamentoController.getDepartamento = async (cod_departamento) => {
    try {
        return await Departamento.findByPk(cod_departamento)
    } catch (error) {
        return error
    }
}
DepartamentoController.getDepartamentos = async () => {
    try {
        return await Departamento.findAll()
    } catch (error) {
        return error
    }
}
DepartamentoController.createDepartamento = async (pDepartamento) => {
    try {
        return await Departamento.create(pDepartamento)
    } catch (error) {
        return error
    }
}

DepartamentoController.updateDepartamento = async (pDepartamento) => {
    try {
        return await Departamento.update(pDepartamento,{
            where: {
                cod_departamento: pDepartamento.cod_departamento
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = DepartamentoController