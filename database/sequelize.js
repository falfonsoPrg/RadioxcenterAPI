// Imports

const Sequelize = require("sequelize")
const DepartamentoModel = require("../models/DepartamentoModel")
const CiudadModel = require("../models/CiudadModel");
const InformacionRXModel = require("../models/InformacionRXModel");
const TipoConsentimientoModel = require("../models/TipoConsentimientoModel");
const TipoFacturacionModel = require("../models/TipoFacturacionModel");
const TipoPrefEntregaModel = require("../models/TipoPrefEntregaModel");
const FormaDePagoEntidadModel = require("../models/FormaDePagoEntidadModel");
const TipoDocumentoModel = require("../models/TipoDocumentoModel");
const TipoNotaCreditoModel = require("../models/TipoNotaCreditoModel");
const TipoPagoModel = require("../models/TipoPagoModel");
const TipoEmpleadoModel = require("../models/TipoEmpleadoModel");
const EmpleadoModel = require("../models/EmpleadoModel");



//Conection with database
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: "postgres",
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    }
});

sequelize.options.logging = false //Set loggin output to false

//Create the models
const Departamento = DepartamentoModel(sequelize);
const Ciudad = CiudadModel(sequelize);
const Informacion_RX  = InformacionRXModel(sequelize);
//Tipo_models
const Tipo_Consentimiento = TipoConsentimientoModel(sequelize);
const Tipo_facturacion = TipoFacturacionModel(sequelize);
const Tipo_pref_entrega = TipoPrefEntregaModel(sequelize);
const Tipo_documento = TipoDocumentoModel(sequelize);
const Tipo_nota_credito = TipoNotaCreditoModel(sequelize);
const Tipo_pago = TipoPagoModel(sequelize);
const Tipo_empleado = TipoEmpleadoModel(sequelize);
const Forma_de_pago_entidad = FormaDePagoEntidadModel(sequelize);
// Empleado Models
const Empleado = EmpleadoModel(sequelize);

//Create the realtionships
Departamento.hasMany(Ciudad,{foreignKey: 'cod_departamento', sourceKey:'cod_departamento'});
Ciudad.belongsTo(Departamento,{foreignKey: 'cod_departamento', sourceKey:'cod_departamento'});

// Realtionships Empleado
Tipo_documento.hasMany(Empleado,{foreignKey: 'cod_tipo_documento', sourceKey:'cod_tipo_documento'});
Empleado.belongsTo(Tipo_documento,{foreignKey: 'cod_tipo_documento', sourceKey:'cod_tipo_documento'});

Tipo_empleado.hasMany(Empleado,{foreignKey: 'cod_tipo_empleado', sourceKey:'cod_tipo_empleado'})
Empleado.belongsTo(Tipo_empleado,{foreignKey: 'cod_tipo_empleado', sourceKey:'cod_tipo_empleado'})


//Sync the database and chekc if the connection is Ok
var resetDb = { force:false };

sequelize.sync( resetDb ).then( async () => {
    console.log("Conection DB OK")
}).catch(err => {
    console.log(err)
})


//Exports the models
module.exports = {
    sequelize,
    Departamento,
    Ciudad,
    Informacion_RX,
    Tipo_Consentimiento,
    Tipo_facturacion,
    Tipo_pref_entrega,
    Forma_de_pago_entidad,
    Tipo_documento,
    Tipo_nota_credito,
    Tipo_pago,
    Tipo_empleado,
    Empleado,





}