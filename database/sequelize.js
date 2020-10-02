const Sequelize = require("sequelize")

const DepartamentoModel = require("../models/DepartamentoModel")

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
    }
});

sequelize.options.logging = false //Set loggin output to false

//Create the models
const Departamento = DepartamentoModel(sequelize);

//Create the realtionships

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
    Departamento
}