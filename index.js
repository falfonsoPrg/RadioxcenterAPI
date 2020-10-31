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
app.use('/api/sexo/', SexoRoutes)

//Initialize server 
app.listen(port,() => {
    console.log('Server en el puerto ' + port)
}) 
