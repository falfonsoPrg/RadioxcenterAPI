const { Entidad_doctor } = require('../database/sequelize')
const EntidadController = require('./EntidadController')

EntidadDoctorController= {}

EntidadDoctorController.getEntidadDoctor = async(cod_entidad_doctor) =>{
    try {
        return await Entidad_doctor.findByPk(cod_entidad_doctor)
    } catch (error){
        return error
    }
}
EntidadDoctorController.getEntidadDoctores = async() =>{
    try {
        return await Entidad_doctor.findAll({include:{all:true}})
    } catch (error) {
        return error
    }
}
EntidadDoctorController.createEntidadDoctor = async(pEntidadDoctor) => {
    try {
        return await Entidad_doctor.create(pEntidadDoctor)
    } catch (error) {
        return error
    }
}
EntidadDoctorController.updateEntidadDoctor = async (pEntidadDoctor) => {
    try {
        return await Entidad_doctor.update(pEntidadDoctor, {
            where: {
                cod_entidad_doctor : pEntidadDoctor.cod_entidad_doctor
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = EntidadDoctorController