class Logger {

    constructor() {
        this.fs = require("fs")
    }

    log = (message) => {
        const timestamp = new Date().toISOString();
        this.fs.appendFile('./logs/log_' +new Date().toISOString().split("T")[0]+".txt",timestamp + " - " +message + "\n",(err) => {
            if(err) console.log(err)
        })
    }
}
class SingletonLogger {

    constructor() {
        if (!SingletonLogger.instance) {
            SingletonLogger.instance = new Logger();
        }
    }

    getInstance() {
        return SingletonLogger.instance;
    }

}
  
module.exports = SingletonLogger;
