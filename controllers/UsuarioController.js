const { Usuario, Tipo_documento } = require ('../database/sequelize')

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
UsuarioController.getUsuarios = async () =>{
    try {
        return await Usuario.findAll()
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