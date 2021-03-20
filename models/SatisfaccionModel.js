const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("Satisfaccion",{
        cod_satisfaccion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        experiencia_satisfaccion:{
            type: DataTypes.STRING
        },
        amabilidad_atencion_satisfaccion:{
            type: DataTypes.STRING
        },
        amabilidad_radiologo_satisfaccion:{
            type: DataTypes.STRING
        },
        presentacion_satisfaccion:{
            type: DataTypes.STRING
        },
        tiempo_espera_satisfaccion:{
            type: DataTypes.STRING
        },
        tiempo_entrega_satisfaccion:{
            type: DataTypes.STRING
        },
        indicacion_satisfaccion:{
            type: DataTypes.STRING
        },
        privacidad_satisfaccion:{
            type: DataTypes.STRING
        },
        recomendacion_satifasfaccion:{
            type: DataTypes.STRING
        },
        ubicacion_satisfaccion:{
            type: DataTypes.STRING
        },
        entrega_recomendacion_satisfaccion:{
            type: DataTypes.BOOLEAN
        },
        sugerencias_satisfaccion:{
            type: DataTypes.STRING
        },
        cod_usuario: {
            type: DataTypes.INTEGER
        }
    },{
        tableName:'Satisfaccion',
        freezeTableName: true
    })
}

