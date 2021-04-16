const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
var compression = require('compression')
const app = express()
const port = process.env.PORT || 4000
dotenv.config();

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

require("./database/sequelize")

//Cors configuration
const config = {
    application: {
        cors: {
            server: [{
                origin: "*",
                credentials: true
            }]
        }
    }
}
app.use(cors(
    config.application.cors.server
));
app.use(compression())
//Fisrt route
app.get('/',(req,res)=>{
    res.send("Esta es la API Para Radioxenter, para ver la especificación en Swagger haga click <a href='/swagger'>aqui</a>")
})
//Import routes
const DepartamentoRoutes = require('./routes/DepartamentoRoutes')
const AutorizacionRoutes = require('./routes/AutorizacionRoutes')
const CiudadRoutes = require('./routes/CiudadRoutes')
const TipoEmpleadoRoutes = require('./routes/TipoEmpleadoRoutes')
const TIpoConsentimientoRoutes = require('./routes/TipoConsentimientoRoutes')
const TipoFacturacionRoutes = require('./routes/TipoFacturacionRoutes')
const UsuarioRoutes = require('./routes/UsuarioRoutes')
const TipoDocumentoRoutes = require('./routes/TipoDocumentoRoutes')
const TipoNotaCreditoRoutes = require('./routes/TipoNotaCreditoRoutes')
const TipoPrefEntregaRoutes = require('./routes/TipoPrefEntregaRoutes')
const SexoRoutes = require('./routes/SexoRoutes')
const ServicioRoutes = require('./routes/ServicioRoutes')
const TipoPago = require('./routes/TipoPagoRoutes')
const Paquete = require('./routes/PaqueteRoutes')
const Proceso = require('./routes/ProcesoRoutes')
const Entidad = require('./routes/EntidadRoutes')
const EntidadDoctor = require('./routes/EntidadDoctorRoutes')
const Doctor = require('./routes/DoctorRoutes')
const FormaDePagoEntidad = require('./routes/FormaDePagoEntidadRoutes')
const Empleado = require('./routes/EmpleadoRoutes')
const InformacionRX = require('./routes/InformacionRXRoutes')
const Convenio = require('./routes/ConvenioRoutes')
const PaqueteServicio = require('./routes/PaqueteServicioRoutes')
const Transaccion = require('./routes/TransaccionRoutes')
const TransaccionServicio = require('./routes/TransaccionServicioRoutes')
const ConsentimientoRoutes = require('./routes/ConsentimientoRoutes')
const FacturaRoutes = require('./routes/FacturaRoutes');
const NotaCreditoRoutes = require('./routes/NotaCreditoRoutes');
const NumeracionRoutes = require('./routes/NumeracionRoutes');
const SatisfaccionRoutes = require('./routes/SatisfaccionRoutes');

//Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/files', express.static(__dirname + '/public'));

//Route Middleware
app.use('/api/',AutorizacionRoutes)
app.use('/api/departamentos/',DepartamentoRoutes)
app.use('/api/ciudades/',CiudadRoutes)
app.use('/api/tipoEmpleados/', TipoEmpleadoRoutes)
app.use('/api/tipoConsentimientos/', TIpoConsentimientoRoutes)
app.use('/api/tipoFacturaciones/', TipoFacturacionRoutes)
app.use('/api/usuarios/', UsuarioRoutes)
app.use('/api/tipoDocumentos/', TipoDocumentoRoutes)
app.use('/api/tipoNotaCredito/', TipoNotaCreditoRoutes)
app.use('/api/tipoPrefEntrega/', TipoPrefEntregaRoutes)
app.use('/api/sexos/', SexoRoutes)
app.use('/api/servicios/', ServicioRoutes)
app.use('/api/tipoPagos/', TipoPago)
app.use('/api/paquetes/', Paquete)
app.use('/api/procesos/', Proceso)
app.use('/api/entidades/', Entidad)
app.use('/api/entidadDoctor', EntidadDoctor)
app.use('/api/doctores/',Doctor)
app.use('/api/formaDePagoEntidad',FormaDePagoEntidad)
app.use('/api/empleados', Empleado)
app.use('/api/informacionRX', InformacionRX)
app.use('/api/convenios', Convenio)
app.use('/api/paqueteServicios', PaqueteServicio)
app.use('/api/transacciones', Transaccion)
app.use('/api/transaccionServicios',TransaccionServicio)
app.use('/api/consentimientos',ConsentimientoRoutes)
app.use('/api/facturas',FacturaRoutes)
app.use('/api/notacredito',NotaCreditoRoutes)
app.use('/api/numeracion',NumeracionRoutes)
app.use('/api/satisfacciones',SatisfaccionRoutes)

//Inicializa el servidor 

app.listen(port,() => {
    console.log('Server en el puerto ' + port)
}) 
