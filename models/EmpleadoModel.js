const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Empleado",{
        cod_empleado: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombres_empleado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos_empleado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        documento_empleado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        direccion_empleado:{
            type: DataTypes.STRING,
            allowNull: false

        },
        fnacimiento_empleado:{
            type: DataTypes.DATEONLY,
            validate: {
                isDate: true
            }
        },
        telefono_empleado: {
            type: DataTypes.INTEGER,
            allowNull: false

        },
        correo_empleado: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        contrasenia_empleado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_creado: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        fecha_actualizado: {
            type: DataTypes.DATEONLY,
            validate: {
                isDate: true
            }
        },
        usuario_empleado: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        cod_tipo_empleado: {
            type: DataTypes.INTEGER
        },
        cod_tipo_documento: {
            type: DataTypes.INTEGER
        }

    },{
        tableName:'Empleado',
        freezeTableName: true
    })
}