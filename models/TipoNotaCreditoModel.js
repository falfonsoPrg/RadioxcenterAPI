const {DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Tipo_Nota_Credito",{
        cod_tipo_nota_credito: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_tipo_nota_credito:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        tableName: 'Tipo_Nota_Credito',
        freezeTableName: true
    })
}