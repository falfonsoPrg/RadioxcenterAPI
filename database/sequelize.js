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
const SexoModel = require("../models/SexoModel");
const UsuarioModel = require("../models/UsuarioModel");
const ProcesoModel = require("../models/ProcesoModel");
const EntidadModel = require("../models/EntidadModel");
const DoctorModel = require("../models/DoctorModel");
const ServicioModel = require("../models/ServicioModel");
const PaqueteModel = require("../models/PaqueteModel");



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
const Sexo  = SexoModel(sequelize);
const Usuario = UsuarioModel(sequelize);
const Proceso = ProcesoModel(sequelize);
const Entidad = EntidadModel(sequelize);
const Empleado = EmpleadoModel(sequelize);
const Doctor =  DoctorModel(sequelize);
const Servicio = ServicioModel(sequelize);
const Paquete = PaqueteModel(sequelize);

//Create the Relationships
Departamento.hasMany(Ciudad,{foreignKey: 'cod_departamento', sourceKey:'cod_departamento'});
Ciudad.belongsTo(Departamento,{foreignKey: 'cod_departamento', sourceKey:'cod_departamento'});

// Relationships Empleado
Tipo_documento.hasMany(Empleado,{foreignKey: 'cod_tipo_documento', sourceKey:'cod_tipo_documento'});
Empleado.belongsTo(Tipo_documento,{foreignKey: 'cod_tipo_documento', sourceKey:'cod_tipo_documento'});

Tipo_empleado.hasMany(Empleado,{foreignKey: 'cod_tipo_empleado', sourceKey:'cod_tipo_empleado'});
Empleado.belongsTo(Tipo_empleado,{foreignKey: 'cod_tipo_empleado', sourceKey:'cod_tipo_empleado'});

// Relationships Usuario
Tipo_documento.hasMany(Usuario,{foreignKey: 'cod_tipo_documento', sourceKey: 'cod_tipo_documento'});
Usuario.belongsTo(Tipo_documento,{foreignKey: 'cod_tipo_documento', sourceKey: 'cod_tipo_documento'});

Sexo.hasMany(Usuario,{foreignKey: 'cod_sexo', sourceKey: 'cod_sexo'});
Usuario.belongsTo(Sexo,{foreignKey: 'cod_sexo', sourceKey: 'cod_sexo'});

Ciudad.hasMany(Usuario,{foreignKey: 'cod_ciudad', sourceKey: 'cod_ciudad'});
Usuario.belongsTo(Ciudad,{foreignKey: 'cod_ciudad', sourceKey: 'cod_ciudad'});

Tipo_pref_entrega.hasMany(Usuario,{foreignKey: 'cod_tipo_pref_entrega', sourceKey: 'cod_tipo_pref_entrega'});
Usuario.belongsTo(Tipo_pref_entrega,{foreignKey: 'cod_tipo_pref_entrega', sourceKey: 'cod_tipo_pref_entrega'});

// Relationships Proceso
Usuario.hasMany(Proceso, {foreignKey:'cod_usuario', sourceKey: 'cod_usuario'});
Proceso.belongsTo(Usuario, {foreignKey:'cod_usuario', sourceKey: 'cod_usuario'});

// Relationships Entidad
Forma_de_pago_entidad.hasMany(Entidad, {foreignKey:'cod_forma_de_pago_entidad', sourceKey: 'cod_forma_de_pago_entidad'});
Entidad.belongsTo(Forma_de_pago_entidad, {foreignKey:'cod_forma_de_pago_entidad', sourceKey: 'cod_forma_de_pago_entidad'});

Tipo_facturacion.hasMany(Entidad, {foreignKey:'cod_tipo_facturacion', sourceKey: 'cod_tipo_facturacion'});
Entidad.belongsTo(Tipo_facturacion, {foreignKey:'cod_tipo_facturacion', sourceKey: 'cod_tipo_facturacion'});

// Relationships Doctor
Tipo_documento.hasMany(Doctor, {foreignKey:'cod_tipo_documento', sourceKey: 'cod_tipo_documento'});
Doctor.belongsTo(Tipo_documento, {foreignKey:'cod_tipo_documento', sourceKey: 'cod_tipo_documento'});

Tipo_pref_entrega.hasMany(Doctor, {foreignKey: 'cod_tipo_pref_entrega', sourceKey: 'cod_tipo_pref_entrega'});
Doctor.belongsTo(Tipo_pref_entrega, {foreignKey: 'cod_tipo_pref_entrega', sourceKey: 'cod_tipo_pref_entrega'});
//Sync the database and chekc if the connection is Ok
var resetDb = { force:false };

sequelize.sync( resetDb ).then( async () => {
    console.log("Conexion con la base de datos establecida")
    await Tipo_empleado.findOrCreate({
        where: {cod_tipo_empleado:1},
        defaults: {cod_tipo_empleado:1,nombre_tipo_empleado:"Empleado"}
    })
    const te = await Tipo_empleado.findAll()
    console.log(te)
    await Tipo_documento.findOrCreate({
        where: {cod_tipo_documento:1},
        defaults: {cod_tipo_documento:1,nombre_tipo_documento:"Cédula de ciudadania"}
    })
    const td = await Tipo_documento.findAll()
    console.log(td)
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
    Sexo,
    Usuario,
    Proceso,
    Entidad,
    Doctor,
    Servicio,
    Paquete





}