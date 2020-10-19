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
//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));

//Route Middleware
app.use('/api/',AutorizacionRoutes)
app.use('/api/departamentos/',DepartamentoRoutes)

//Initialize server 
app.listen(port,() => {
    console.log('Server en el puerto ' + port)
}) 
