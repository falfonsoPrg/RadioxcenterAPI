//const Singleton = require('../services/ProcesosSingleton')
//const singleton = new Singleton().getInstance()
//singleton.log()

class Procesos {

    constructor() {
        this.procesos = [];
        const httpServer = require("http").createServer();
        this.io = require("socket.io")(httpServer, {
            cors:{
                origin: "*"
            }
        });
        this.io.on('connection', (socket) => {
            console.log("Client connected")
            this.io.emit("data",this.procesos)
        })
        const port = process.env.SOCKET_PORT || 4001
        httpServer.listen(port, ()=> console.log("Sockets on port " + port))
    }

    get count() {
        return this.procesos.length;
    }

    setNewUsuario(data){
        var newUsuario = {
            documento_usuario: data.documento_usuario,
            data:  data,
            tutor: {
                nombres_tutor: "",
                apellidos_tutor: "",
                documento_tutor: -1,
                parentesco_tutor: "",
                cod_tipo_documento: -1
            },
            transaccion:{},
            procesosGenerales:{
                pendientes: ["Registro","Tutor","Transacción","Consentimiento","En procesos","Resultados entregados"],
                completados: [],
                actual: ""
            },
            procesos: []
        }
        if(!this.procesos.find( x => x.documento_usuario == data.documento_usuario)){
            this.procesos.push(newUsuario)
            this.validar(data.documento_usuario)
            return true
        }
        return false
    }

    setTutor(tutor,documento_usuario){
        var indexUsuario = this.getIndexUsuario(documento_usuario)
        if(indexUsuario != -1){
            this.procesos[indexUsuario].tutor = tutor
            this.validar(documento_usuario)
            return true
        }
        return false
    }

    setTransaccion(transaccion, documento_usuario){
        var indexUsuario = this.getIndexUsuario(documento_usuario)
        if(indexUsuario != -1){
            this.procesos[indexUsuario].transaccion = transaccion
            this.procesos[indexUsuario].transaccion.tutor = this.procesos[indexUsuario].tutor

            this.procesos[indexUsuario].transaccion.servicios.forEach(servicio => {
                this.procesos[indexUsuario].procesos.push(
                    {
                        cod_servicio: servicio.cod_servicio,
                        nombre_servicio: servicio.nombre_servicio,
                        descripcion_servicio: servicio.descripcion_servicio,
                        completado: false,
                        entregado: false
                    }
                )
            });
            this.validar(documento_usuario)
            return true
        }
        return false
    }

    getIndexUsuario(pCodUsuario){
        return this.procesos.findIndex(usuario => usuario.documento_usuario == pCodUsuario);
    }
    validar(pCodUsuario){
        this.io.emit("data",this.procesos)
        // var indexUsuario = getIndexUsuario(pCodUsuario)
        // if (indexUsuario != -1) {
        //     const a = -1
        // }
    }
    log(message) {
        const timestamp = new Date().toISOString();
        this.procesos.push({ message, timestamp });
        console.log(`${timestamp} - ${message}`);
    }
    log(){
        console.log(this.procesos)
    }

}

class Singleton {

  constructor() {
      if (!Singleton.instance) {
          Singleton.instance = new Procesos();
      }
  }

  getInstance() {
      return Singleton.instance;
  }

}

module.exports = Singleton;