// Imports

const Sequelize = require("sequelize")
const Initializer = require("../services/InicializarData")

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
const SatisfaccionModel = require('../models/SatisfaccionModel');
const Constantes = require("../middlewares/Constantes");


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
const Satisfaccion = SatisfaccionModel(sequelize);

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

// Relationships Satisfaccion
Usuario.hasMany(Satisfaccion, {foreignKey:'cod_usuario', sourceKey: 'cod_usuario'});
Satisfaccion.belongsTo(Usuario, {foreignKey:'cod_usuario', sourceKey: 'cod_usuario'});

//Sync the database and chekc if the connection is Ok
var resetDb = { force:false };

sequelize.sync( resetDb ).then( async () => {
    var te = await Tipo_empleado.findAll()
    if(te.length == 0) await Initializer.CargarTipoEmpleado(Tipo_empleado)
    
    var td = await Tipo_documento.findAll()
    if(td.length == 0) await Initializer.CargarTipoDocumento(Tipo_documento)
    
    var tc = await Tipo_Consentimiento.findAll()
    if(tc.length == 0) await Initializer.CargarTipoConsentimiento(Tipo_Consentimiento)

    var tp = await Tipo_pago.findAll()
    if(tp.length == 0) await Initializer.CargarTipoPago(Tipo_pago)

    var tpe = await Tipo_pref_entrega.findAll()
    if(tpe.length == 0) await Initializer.CargarTipoPrefEntrega(Tipo_pref_entrega)

    var tf = await Tipo_facturacion.findAll()
    if(tf.length == 0) await Initializer.CargarTipoFacturacion(Tipo_facturacion)

    var fpe = await Forma_de_pago_entidad.findAll()
    if(fpe.length == 0) await Initializer.CargarFormaDePagoEntidad(Forma_de_pago_entidad)

    var nums = await Numeracion.findAll()
    if(nums.length == 0) await Initializer.CargarNumeraciones(Numeracion)

    var tntcr = await Tipo_nota_credito.findAll()
    if(tntcr.length == 0) await Initializer.CargarTipoNotaCredito(Tipo_nota_credito)

    var dep = await Departamento.findAll()
    var ciud = await Ciudad.findAll()
    if(dep.length == 0 || ciud.length == 0 ) await Initializer.CargarDepartamentos(Departamento,Ciudad)

    await Empleado.findOrCreate({
        where: {nombres_empleado:"Administrador"},
        defaults:{
            cod_empleado: 1,
            nombres_empleado: "Administrador",
            apellidos_empleado: "Administrador",
            documento_empleado: 123456789,
            direccion_empleado: "Cl. 8 #6-59",
            fnacimiento_empleado: "2021-03-14",
            telefono_empleado: "8429548",
            correo_empleado: "admin@radioxenter.com",
            contrasenia_empleado: process.env.ADMINPSW,
            usuario_empleado: "admin",
            cod_tipo_empleado: Constantes.TEMPLEADO_ADMINISTRADOR,
            cod_tipo_documento: Constantes.TDOC_CEDULA_CIUDADANIA,
        }
    })

    console.log("Conexion con la base de datos establecida")
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