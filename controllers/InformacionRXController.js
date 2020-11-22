const {Informacion_RX} = require('../database/sequelize')

InformacionRXController= {}
InformacionRXController.getInformacionRX = async(cod_informacion_rx) =>{
    try {
        return await Informacion_RX.findByPk(cod_informacion_rx)
    } catch (error) {
        return error
    }
}

InformacionRXController.getInformacionesRX = async() =>{
    try{
        return await Informacion_RX.findAll()
    } catch (error){
        return error
    }
}

InformacionRXController.createInformacionRX = async(pInformacionRX) =>{
    try {
        return await Informacion_RX.create(pInformacionRX)
    } catch (error){
        return error
    }
}
InformacionRXController.updateInformacionRX = async(pInformacionRX)=>{
    try {
        return await Informacion_RX.update(pInformacionRX, {
            where:{
                cod_informacion_rx: pInformacionRX.cod_informacion_rx
            }

        })
    } catch(error){
        return error
    }
}

module.exports = InformacionRXController