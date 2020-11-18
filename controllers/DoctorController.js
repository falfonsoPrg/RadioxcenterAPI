const { Doctor } = require('../database/sequelize')

DoctorController = {}

DoctorController.getDoctor = async(cod_doctor)=>{
    try{
        return await Doctor.findByPk(cod_doctor)
    } catch (error) {
        return error
    }
}
DoctorController.getDoctores = async()=>{
    try {
        return await Doctor.findAll()
    } catch (error){
        return nerror
    }
}
DoctorController.createDoctor = async(pDoctor) =>{
    try {
        return await Doctor.create(pDoctor)
    } catch (error) {
        return error
    }
}

DoctorController.updateDoctor = async(pDoctor) =>{
    try {
        return await Doctor.update(pDoctor,{
            where: {
                cod_doctor: pDoctor.cod_doctor
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = DoctorController