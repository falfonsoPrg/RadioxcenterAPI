const { NotaCredito } = require('../database/sequelize')

NotaCreditoController = {}
NotaCreditoController.getNotaCredito = async (cod_nota_credito) => {
    try{
        return await NotaCredito.findByPk(cod_nota_credito)
    } catch (error) {
        return error
    }
}

NotaCreditoController.getNotasCredito = async() => {
    try{
        return await NotaCredito.findAll()
    } catch (error) {
        return error
    }
}
NotaCreditoController.createNotaCredito = async(pNotaCredito) => {
    try {
        return await NotaCredito.create(pNotaCredito)
    } catch (error) {
        return error
    }
}

NotaCreditoController.updateNotaCredito = async(pNotaCredito) => {
    try{
        return await NotaCredito.update(pNotaCredito,{
            where:{
                cod_nota_credito : pNotaCredito.cod_nota_credito
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = NotaCreditoController