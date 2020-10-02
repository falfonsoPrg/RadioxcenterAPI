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
    res.send('Esta es la API Para Radioxcenter')
})
//Import routes


//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));

//Route Middleware


//Initialize server 
app.listen(port,() => {
    console.log('Server on port ' + port)
}) 
