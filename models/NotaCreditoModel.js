const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("Nota_Credito",{
        cod_nota_credito: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        numero_nota_credito: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_nota_credito: {
            type: DataTypes.DATE
        },
        descripcion_nota_credito: {
            type: DataTypes.STRING
        },
        valor_total:{
            type: DataTypes.DOUBLE
        },
        ruta_nota_credito:{
            type: DataTypes.STRING
        },
        motivo:{
            type: DataTypes.STRING
        },
        cod_empleado:{
            type: DataTypes.INTEGER
        },
        cod_factura:{
            type: DataTypes.INTEGER
        },
        cod_tipo_nota_credito:{
            type: DataTypes.INTEGER
        }
    },{
        tableName: 'Nota_Credito',
        FreezeTableName: true
    })
}