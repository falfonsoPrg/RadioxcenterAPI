const { Usuario, Tipo_documento, Departamento, Ciudad, Sexo, Tipo_pref_entrega } = require ('../database/sequelize')
const { Op } = require("sequelize");
UsuarioController = {}

UsuarioController.getUsuario = async(cod_usuario) => {
    try { 
        return await Usuario.findByPk(cod_usuario)
    } catch (error){
        return error
    }
}
UsuarioController.getUsuarioPorDocumento = async(pDocumento_usuario) => {
    try { 
        return await Usuario.findAll({
            where: {
                documento_usuario: pDocumento_usuario
            },
            include: Tipo_documento
        })
    } catch (error){
        return error
    }
}
UsuarioController.getUsuarioPorDocumentoYCorreo = async(pDocumento_usuario,pCorreo_usuario) => {
    try { 
        return await Usuario.findAll({
            where:{
                [Op.or]:{
                    documento_usuario: pDocumento_usuario,
                    correo_usuario: pCorreo_usuario
                }
            },
            include: Tipo_documento
        })
    } catch (error){
        return error
    }
}
UsuarioController.getUsuarios = async () =>{
    try {
        return await Usuario.findAll({
            order:[
                ['documento_usuario','ASC']
            ]
        })
    } catch (error) {
        return error
    }
}
UsuarioController.getUsuariosParaReporte = async () =>{
    try {
        return await Usuario.findAll({
            order:[
                ['documento_usuario','ASC']
            ],
            include:[
                {
                    model: Ciudad,
                    include:[Departamento]
                },
                {model: Sexo},
                {model: Tipo_pref_entrega},
                {model: Tipo_documento}
            ]
        })
    } catch (error) {
        return error
    }
}
UsuarioController.createUsuario = async (pUsuario) => {
    try {
        return await Usuario.create(pUsuario)
    } catch (error){
        return error
    }
}
UsuarioController.updateUsuario = async (pUsuario) => {
    try{
        return await Usuario.update(pUsuario, {
            where: {
                cod_usuario: pUsuario.cod_usuario
            }
        })
    } catch (error){
        return error
    }
}

module.exports = UsuarioController