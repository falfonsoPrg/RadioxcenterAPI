//const Singleton = require('../services/ProcesosSingleton')
//const singleton = new Singleton().getInstance()
//singleton.log()
var js2xmlparser = require("js2xmlparser");
const Constantes = require("../middlewares/Constantes")
const Mailer = require("./Mailer")
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
        const port = process.env.SOCKET_PORT || 4001
        httpServer.listen(port, ()=> console.log("Sockets on port " + port))
        this.io.on('connection', (socket) => {
            this.io.emit("data",this.procesos)

            socket.on('finalizar_proceso', (data) => {
                this.completarProceso(data.documento_usuario, data.cod_servicio)
            })
            socket.on('entrega_resultado', (data) => {
                this.entregarProceso(data.documento_usuario, data.cod_servicio)
            })
            socket.on('eliminar_usuarios', (data) => {
                this.deleteUsuario(data.documento_usuario)
            })
            socket.on('completar_procesos', (data) => {
                this.completarTodosLosProcesos(data.documento_usuario)
            })
        })
        
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
        var pendi =  [Constantes.TRANSACCION,Constantes.CONSENTIMIENTO,Constantes.ENPROCESOS,Constantes.RESULTADOSENTREGADOS]
        if(data.tutor == true){
            pendi.unshift(Constantes.TUTOR)
        }
        if(data.correo_usuario == "") data.correo_usuario = null
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
            satisfaccion:{},
            procesosGenerales:{
                pendientes: pendi,
                completados: [],
                actual: Constantes.REGISTRO
            },
            procesos: []
        }
        if(!this.procesos.find( x => x.documento_usuario == data.documento_usuario)){
            this.procesos.push(newUsuario)
            this.avanzarProcesoGeneral(data.documento_usuario)
            this.validar()
            this.generateXml(data);
            this.generateLog("INICIA PROCESO",newUsuario);
            return true
        }
        return false
    }

    setTutor(tutor,documento_usuario){
        var indexUsuario = this.getIndexUsuario(documento_usuario)
        if(indexUsuario != -1){

            if(this.procesos[indexUsuario].procesosGenerales.actual != Constantes.TUTOR) return false

            this.procesos[indexUsuario].tutor = tutor
            this.avanzarProcesoGeneral(documento_usuario)
            this.validar()
            this.generateLog("AGREGA TUTOR",this.procesos[indexUsuario]);
            return true
        }
        return false
    }

    setTransaccion(pTransaccion, documento_usuario){
        var indexUsuario = this.getIndexUsuario(documento_usuario)
        if(indexUsuario != -1){

            if(this.procesos[indexUsuario].procesosGenerales.actual != Constantes.TRANSACCION) return false

            this.procesos[indexUsuario].transaccion = pTransaccion

            this.procesos[indexUsuario].transaccion.tutor = this.procesos[indexUsuario].tutor
            this.procesos[indexUsuario].transaccion.nombres_acudiente = this.procesos[indexUsuario].tutor.nombres_tutor
            this.procesos[indexUsuario].transaccion.apellidos_acudiente = this.procesos[indexUsuario].tutor.apellidos_tutor
            this.procesos[indexUsuario].transaccion.documento_acudiente = this.procesos[indexUsuario].tutor.documento_tutor
            this.procesos[indexUsuario].transaccion.parentesco_acudiente = this.procesos[indexUsuario].tutor.parentesco_tutor

            this.procesos[indexUsuario].transaccion.servicios.forEach(servicio => {
                this.procesos[indexUsuario].procesos.push(
                    {
                        cod_servicio: servicio.cod_servicio,
                        nombre_servicio: servicio.nombre_servicio,
                        descripcion_servicio: servicio.descripcion_servicio,
                        precio_servicio: servicio.precio_servicio,
                        iva_servicio: servicio.iva_servicio,
                        cantidad: servicio.cantidad,
                        completado: false,
                        entregado: false
                    }
                )
            });
            this.avanzarProcesoGeneral(documento_usuario)
            this.validar()
            this.generateLog("AGREGAR TRANSACCION",this.procesos[indexUsuario]);
            return true
        }
        return false
    }

    setConsentimiento(pConsentimiento,documento_usuario){
        var indexUsuario = this.getIndexUsuario(documento_usuario)
        if(indexUsuario != -1){

            if(this.procesos[indexUsuario].procesosGenerales.actual != Constantes.CONSENTIMIENTO) return false

            this.procesos[indexUsuario].consentimiento = pConsentimiento;
            this.avanzarProcesoGeneral(documento_usuario)
            this.validar()
            this.generateLog("AGREGAR CONSENTIMIENTO",this.procesos[indexUsuario]);
            return true
        }
        return false
    }
    setSatisfaccion(pSatisfaccion,documento_usuario){
        var indexUsuario = this.getIndexUsuario(documento_usuario)
        if(indexUsuario != -1){

            if(this.procesos[indexUsuario].procesosGenerales.actual != Constantes.SATISFACCION) return false

            this.procesos[indexUsuario].satisfaccion = pSatisfaccion;
            this.avanzarProcesoGeneral(documento_usuario)
            this.validar()
            return true
        }
        return false
    }
    completarProceso(documento_usuario, cod_servicio){
        const index = this.getIndexUsuario(documento_usuario)
        if(index != -1){
            if(this.procesos[index].procesosGenerales.actual != Constantes.ENPROCESOS && this.procesos[index].procesosGenerales.actual != Constantes.RESULTADOSENTREGADOS) return false
            this.procesos[index].procesos.forEach(p => {
                if(p.cod_servicio == cod_servicio){
                    p.completado = true
                }
            })
            const completados = this.procesos[index].procesos.every(p => p.completado == true)
            if(completados) this.avanzarProcesoGeneral(documento_usuario)
            this.validar()
            return true
        }
        return false
    }
    completarTodosLosProcesos(documento_usuario){
        const index = this.getIndexUsuario(documento_usuario)
        if(index != -1){
            if(this.procesos[index].procesosGenerales.actual != Constantes.ENPROCESOS && this.procesos[index].procesosGenerales.actual != Constantes.RESULTADOSENTREGADOS) return false
            this.procesos[index].procesos.forEach(p => {
                    p.completado = true
                    p.entregado = true
            })
            if(this.procesos[index].procesosGenerales.actual == Constantes.ENPROCESOS){
                const completados = this.procesos[index].procesos.every(p => p.completado == true)
                if(completados) this.avanzarProcesoGeneral(documento_usuario)
            }
            if(this.procesos[index].procesosGenerales.actual == Constantes.RESULTADOSENTREGADOS){
                const entregados = this.procesos[index].procesos.every(p => p.entregado == true)
                if(entregados) this.avanzarProcesoGeneral(documento_usuario)
            }
            this.validar()
            return true
        }
        return false
    }
    entregarProceso(documento_usuario, cod_servicio){
        const index = this.getIndexUsuario(documento_usuario)
        if(index != -1){

            if(this.procesos[index].procesosGenerales.actual != Constantes.ENPROCESOS && this.procesos[index].procesosGenerales.actual != Constantes.RESULTADOSENTREGADOS) return false

            this.procesos[index].procesos.forEach(p => {
                if(p.cod_servicio == cod_servicio){
                    p.entregado = true
                }
            })
            const entregados = this.procesos[index].procesos.every(p => p.entregado == true)
            if(entregados) this.avanzarProcesoGeneral(documento_usuario)
            this.validar()
            return true
        }
        return false
    }
    deleteUsuario(pCodUsuario){
        const index = this.getIndexUsuario(pCodUsuario)
        if(index != -1){
            this.procesos.splice(index,1)
            this.validar()
            return true
        }
        return false
    }
    getIndexUsuario(pCodUsuario){
        return this.procesos.findIndex(usuario => usuario.documento_usuario == pCodUsuario);
    }
    getUsuario(pCodUsuario){
        const index = this.getIndexUsuario(pCodUsuario)
        if(index != -1) return this.procesos[index]
        return -1
    }
    avanzarProcesoGeneral(pCodUsuario){
        var indexUsuario = this.getIndexUsuario(pCodUsuario)
        if(indexUsuario != -1){
            //Cambiar el proceso general
            this.procesos[indexUsuario].procesosGenerales.completados.push(this.procesos[indexUsuario].procesosGenerales.actual)
            this.procesos[indexUsuario].procesosGenerales.actual = this.procesos[indexUsuario].procesosGenerales.pendientes.shift();

            if(!this.procesos[indexUsuario].procesosGenerales.actual){
                Mailer.sendEmailSatisfaccion(this.procesos[indexUsuario].data.correo_usuario)
                this.generateLog("FINALIZO PROCESO",this.procesos[indexUsuario]);
                this.deleteUsuario(pCodUsuario)
            }
        }
    }
    validar(){
        this.io.emit("data",this.procesos)
        this.fs.writeFile(this.fileName, JSON.stringify(this.procesos), (err) => {
            if(err) console.log(err)
        })
    }
    generateXml(data){
        this.fs.writeFile('./public/xml/' + data.documento_usuario + "_" +new Date().toISOString().split("T")[0]+".xml", js2xmlparser.parse("Usuario", data), (err) => {
            if(err) console.log(err)
        })
    }
    generateLog(proceso,data){
        const timestamp = new Date().toISOString();
        this.fs.appendFile('./public/log/' + data.documento_usuario + "_" +new Date().toISOString().split("T")[0]+".txt",timestamp + " - " +proceso + "\n",(err) => {
            if(err) console.log(err)
        })
    }
    log(message) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} - ${message}`);
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