const { DataTypes } = require('sequelize');

module.exports = (sequelize)  => {
    return sequelize.define("Departamento",{
        cod_departamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nom_departamento: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

