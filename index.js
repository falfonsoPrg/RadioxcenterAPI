const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000
dotenv.config();

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

//Fisrt route
app.get('/',(req,res)=>{
    res.send('Esta es la API Para Radioxenter')
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
//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));

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
app.use('/api/empleado', Empleado)
app.use('/api/informacionRX', InformacionRX)
app.use('/api/convenios', Convenio)
app.use('/api/paqueteServicios', PaqueteServicio)
app.use('/api/transaccion', Transaccion)
app.use('/api/transaccionServicios',TransaccionServicio)
//Inicializa el servidor 

app.listen(port,() => {
    console.log('Server en el puerto ' + port)
}) 
