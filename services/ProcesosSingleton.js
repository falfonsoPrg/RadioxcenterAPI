//const Singleton = require('../services/ProcesosSingleton')
//const singleton = new Singleton().getInstance()
//singleton.log()

class Procesos {

    constructor() {
        this.fileName = "./services/procesos.json";
        this.fs = require("fs")
        this.procesos = this.cargarProcesos();
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

    cargarProcesos(){
        try {
            const data = this.fs.readFileSync(this.fileName)
            return JSON.parse(data)
        } catch (error) {
            return [];
        }

    }

    get count() {
        return this.procesos.length;
    }

    setNewUsuario(data){
        var pendi = []
        if(data.tutor == true){
            pendi = ["Tutor","Transacción","Consentimiento","En procesos","Resultados entregados"]
        }else{
            pendi = ["Transacción","Consentimiento","En procesos","Resultados entregados"]
        }
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
            consentimiento: {},
            procesosGenerales:{
                pendientes: pendi,
                completados: [],
                actual: "Registro"
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
            this.procesos[indexUsuario].transaccion.nombres_acudiente = this.procesos[indexUsuario].tutor.nombres_tutor
            this.procesos[indexUsuario].transaccion.apellidos_acudiente = this.procesos[indexUsuario].tutor.apellidos_tutor
            this.procesos[indexUsuario].transaccion.documento_acudiente = this.procesos[indexUsuario].tutor.document_tutor

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

    setConsentimiento(pConsentimiento,documento_usuario){
        var indexUsuario = this.getIndexUsuario(documento_usuario)
        if(indexUsuario != -1){
            this.procesos[indexUsuario].consentimiento = pConsentimiento;
            this.validar(documento_usuario)
            return true
        }
        return false
    }

    getIndexUsuario(pCodUsuario){
        return this.procesos.findIndex(usuario => usuario.documento_usuario == pCodUsuario);
    }
    getUsuario(pCodUsuario){
        const index = this.procesos.findIndex(usuario => usuario.documento_usuario == pCodUsuario);
        if(index != 1) return this.procesos[index]
        return -1
    }
    validar(pCodUsuario){
        var indexUsuario = this.getIndexUsuario(pCodUsuario)
        if(indexUsuario != -1){
            //Cambiar el proceso general
            this.procesos[indexUsuario].procesosGenerales.completados.push(this.procesos[indexUsuario].procesosGenerales.actual)
            this.procesos[indexUsuario].procesosGenerales.actual = this.procesos[indexUsuario].procesosGenerales.pendientes.shift();
        }
        this.io.emit("data",this.procesos)
        this.fs.writeFile(this.fileName, JSON.stringify(this.procesos), (err) => {
            if(err) console.log(err)
        })
        
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