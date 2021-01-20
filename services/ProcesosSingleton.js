//const Singleton = require('../services/ProcesosSingleton')
//const singleton = new Singleton().getInstance()

class Procesos {

    constructor() {
        this.procesos = [];
    }

    get count() {
        return this.procesos.length;
    }

    log(message) {
        const timestamp = new Date().toISOString();
        this.procesos.push({ message, timestamp });
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