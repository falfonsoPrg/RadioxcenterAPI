const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Entidad", {
        cod_entidad: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        razon_social_entidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre_comercial_entidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nit_entidad: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        direccion_entidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono_entidad: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombre_representante: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cedula_representante: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        telefono_representante: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correo_representante: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        nombre_contacto: {
            type: DataTypes.STRING,
            allowNull: true
            
        },
        cedula_contacto: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        telefono_contacto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        correo_contacto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cod_forma_de_pago_entidad: {
            type: DataTypes.INTEGER
        },
        cod_tipo_facturacion: {
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'Entidad',
        freezeTableName: true
    })
}