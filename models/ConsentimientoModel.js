const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    return sequelize.define("Consentimiento",{
        cod_consentimiento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

    })
}