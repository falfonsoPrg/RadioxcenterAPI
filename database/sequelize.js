// Imports

const Sequelize = require("sequelize")
const CargarDepartamentos = require("../services/CargarDepartamentosYCiudades")

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
const ConvenioModel = require("../models/ConvenioModel");
const EntidadDoctorModel = require("../models/EntidadDoctorModel");
const TransaccionModel = require("../models/TransaccionModel");
const TransaccionServicioModel = require("../models/TransaccionServicioModel");
const ConsentimientoModel = require("../models/ConsentimientoModel");
const PaqueteServicioModel = require('../models/PaqueteServicioModel')
const FacturaModel = require('../models/FacturaModel')
const TransaccionFacturaModel = require('../models/TransaccionFacturaModel')
const NotaCreditoModel = require('../models/NotaCreditoModel')
const NumeracionModel = require('../models/NumeracionModel')


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
const Paquete_Servicio = PaqueteServicioModel(sequelize);
const Convenio = ConvenioModel(sequelize);
const Entidad_doctor = EntidadDoctorModel(sequelize);
const Transaccion = TransaccionModel(sequelize);
const Transaccion_Servicio = TransaccionServicioModel(sequelize);
const Consentimiento = ConsentimientoModel(sequelize);
const Factura = FacturaModel(sequelize);
const TransaccionFactura = TransaccionFacturaModel(sequelize);
const NotaCredito = NotaCreditoModel(sequelize);
const Numeracion = NumeracionModel(sequelize);

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

// Relationships Convenio
Entidad.hasMany(Convenio,{foreignKey: 'cod_entidad', sourceKey: 'cod_entidad'});
Convenio.belongsTo(Entidad,{foreignKey: 'cod_entidad', sourceKey: 'cod_entidad'});

Servicio.hasMany(Convenio,{foreignKey: 'cod_servicio', sourceKey: 'cod_servicio'});
Convenio.belongsTo(Servicio,{foreignKey: 'cod_servicio', sourceKey: 'cod_servicio'});

// Relationships Entidad_doctor
Doctor.hasMany(Entidad_doctor,{foreignKey: 'cod_doctor' , sourceKey: 'cod_doctor'});
Entidad_doctor.belongsTo(Doctor,{foreignKey: 'cod_doctor' , sourceKey: 'cod_doctor'});

Entidad.hasMany(Entidad_doctor,{foreignKey:'cod_entidad', sourceKey: 'cod_entidad'});
Entidad_doctor.belongsTo(Entidad,{foreignKey:'cod_entidad', sourceKey: 'cod_entidad'});

// Relationships Transaccion
Entidad_doctor.hasMany(Transaccion,{foreignKey:'cod_entidad_doctor', sourceKey: 'cod_entidad_doctor'});
Transaccion.belongsTo(Entidad_doctor,{foreignKey:'cod_entidad_doctor', sourceKey: 'cod_entidad_doctor'});

// Relationships Transaccion_Servicio
Transaccion.hasMany(Transaccion_Servicio, {foreignKey: 'cod_transaccion', sourceKey: 'cod_transaccion'});
Transaccion_Servicio.belongsTo(Transaccion, {foreignKey: 'cod_transaccion', sourceKey: 'cod_transaccion'});

Servicio.hasMany(Transaccion_Servicio, {foreignKey: 'cod_servicio', sourceKey: 'cod_servicio'});
Transaccion_Servicio.belongsTo(Servicio, {foreignKey: 'cod_servicio', sourceKey: 'cod_servicio'});

// Relationships Paquete_Servicio
Paquete.hasMany(Paquete_Servicio,{foreignKey: 'cod_paquete', sourceKey: 'cod_paquete'})
Paquete_Servicio.belongsTo(Paquete,{foreignKey: 'cod_paquete', sourceKey: 'cod_paquete'})

Servicio.hasMany(Paquete_Servicio,{foreignKey: 'cod_servicio', sourceKey: 'cod_servicio'})
Paquete_Servicio.belongsTo(Servicio,{foreignKey: 'cod_servicio', sourceKey: 'cod_servicio'})

// Relationships Consentimiento
Transaccion.hasMany(Consentimiento, {foreignKey: 'cod_transaccion', sourceKey: 'cod_transaccion'});
Consentimiento.belongsTo(Transaccion, {foreignKey: 'cod_transaccion', sourceKey: 'cod_transaccion'});

Tipo_Consentimiento.hasMany(Consentimiento, {foreignKey: 'cod_tipo_consentimiento', sourceKey:'cod_tipo_consentimiento'});
Consentimiento.belongsTo(Tipo_Consentimiento, {foreignKey: 'cod_tipo_consentimiento', sourceKey:'cod_tipo_consentimiento'});

// Relationships Factura
Tipo_pago.hasMany(Factura, {foreignKey: 'cod_tipo_pago', sourceKey:'cod_tipo_pago'})
Factura.belongsTo(Tipo_pago, {foreignKey: 'cod_tipo_pago', sourceKey:'cod_tipo_pago'})

Transaccion.hasMany(TransaccionFactura, {foreignKey: 'cod_transaccion', sourceKey:'cod_transaccion'})
TransaccionFactura.belongsTo(Transaccion, {foreignKey: 'cod_transaccion', sourceKey:'cod_transaccion'})

Factura.hasMany(TransaccionFactura, {foreignKey: 'cod_factura', sourceKey:'cod_factura'})
TransaccionFactura.belongsTo(Factura, {foreignKey: 'cod_factura', sourceKey:'cod_factura'})

// Relationships NotaCredito
NotaCredito.belongsTo(Factura, {foreignKey: 'cod_factura', sourceKey:'cod_factura'})
Factura.hasMany(NotaCredito, {foreignKey: 'cod_factura', sourceKey:'cod_factura'})

NotaCredito.belongsTo(Tipo_nota_credito, {foreignKey: 'cod_tipo_nota_credito', sourceKey:'cod_tipo_nota_credito'})
Tipo_nota_credito.hasMany(NotaCredito, {foreignKey: 'cod_tipo_nota_credito', sourceKey:'cod_tipo_nota_credito'})

//Sync the database and chekc if the connection is Ok
var resetDb = { force:false };

sequelize.sync( resetDb ).then( async () => {
    console.log("Conexion con la base de datos establecida")
    await Tipo_empleado.findOrCreate({
        where: {cod_tipo_empleado:1},
        defaults: {cod_tipo_empleado:1,nombre_tipo_empleado:"Empleado"}
    })
    await Tipo_documento.findOrCreate({
        where: {cod_tipo_documento:1},
        defaults: {cod_tipo_documento:1,nombre_tipo_documento:"Cédula de ciudadania"}
    })
    await Tipo_Consentimiento.findOrCreate({
        where: {cod_tipo_consentimiento:1},
        defaults: {cod_tipo_consentimiento:1,nombre_tipo_consentimiento:"Consentimiento Covid"}
    })
    await Tipo_Consentimiento.findOrCreate({
        where: {cod_tipo_consentimiento:2},
        defaults: {cod_tipo_consentimiento:2,nombre_tipo_consentimiento:"Consentimiento Intraoral"}
    })
    await Tipo_Consentimiento.findOrCreate({
        where: {cod_tipo_consentimiento:3},
        defaults: {cod_tipo_consentimiento:3,nombre_tipo_consentimiento:"Consentimiento Extraoral"}
    })
    await Tipo_pago.findOrCreate({
        where: {cod_tipo_pago:1},
        defaults: {cod_tipo_pago:1,nombre_tipo_pago:"Efectivo"}
    })
    await Tipo_pago.findOrCreate({
        where: {cod_tipo_pago:2},
        defaults: {cod_tipo_pago:2,nombre_tipo_pago:"Electrónica"}
    })
    await Tipo_facturacion.findOrCreate({
        where: {cod_tipo_facturacion:1},
        defaults: {cod_tipo_facturacion:1,nombre_tipo_facturacion:"Efectivo"}
    })
    await Tipo_facturacion.findOrCreate({
        where: {cod_tipo_facturacion:2},
        defaults: {cod_tipo_facturacion:2,nombre_tipo_facturacion:"Electrónica"}
    })
    await Numeracion.findOrCreate({
        where: {cod_numeracion:1},
        defaults: {
            cod_numeracion:1,
            numeracion_siglas:"FAEL",
            numeracion_nombre: "Facturación Electrónica",
            numeracion_inicial: 1,
            numeracion_final: 10000,
            numeracion_aumento: 1,
            numeracion_actual: 1
        }
    })
    await Numeracion.findOrCreate({
        where: {cod_numeracion:2},
        defaults: {
            cod_numeracion:2,
            numeracion_siglas:"FPOS",
            numeracion_nombre: "Facturación Manual en Punto de Venta",
            numeracion_inicial: 1,
            numeracion_final: 10000,
            numeracion_aumento: 1,
            numeracion_actual: 1
        }
    })
    await Numeracion.findOrCreate({
        where: {cod_numeracion:3},
        defaults: {
            cod_numeracion:3,
            numeracion_siglas:"FTRAN",
            numeracion_nombre: "Transacción Electrónica",
            numeracion_inicial: 1,
            numeracion_final: 10000,
            numeracion_aumento: 1,
            numeracion_actual: 1
        }
    })
    var dep = await Departamento.findAll()
    var ciud = await Ciudad.findAll()
    if(dep.length == 0 || ciud.length == 0 ) CargarDepartamentos(Departamento,Ciudad)
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
    Paquete,
    Convenio,
    Entidad_doctor,
    Transaccion,
    Transaccion_Servicio,
    Consentimiento,
    Paquete_Servicio,
    Factura,
    TransaccionFactura,
    NotaCredito,
    Numeracion

}