const Excel = require('exceljs');
const Constantes = require("../middlewares/Constantes")

Initializer = {}
Initializer.CargarDepartamentos = async (pDep, pCiud) => {
    console.log("Cargando departamentos y ciudades")
    var arr = []
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile('./services/departamentos.xlsx');
    workbook.eachSheet((sheet, sheetid) => {
        sheet.eachRow((row, rowNumber) => {
            arr.push([row.values[1], row.values[3],row.values[2]])
        })
    })
    for (let i = 0; i < arr.length; i++) {
        const row = arr[i];
        var dep = await pDep.findAll({where:{nom_departamento: row[0]}});
        var cod_dep;
        if(dep.length == 0){
            dep = await pDep.create({nom_departamento:row[0]})
            cod_dep=dep.cod_departamento
        }else{
            cod_dep = dep[0].cod_departamento
        }
        const ciud = await pCiud.findAll({where:{nom_ciudad: row[1],id_ciudad: row[2]}});
        if(ciud.length == 0){
            await pCiud.create({nom_ciudad:row[1],id_ciudad: row[2],cod_departamento:cod_dep})
        }
    }
    console.log("Departamentos y ciudades cargadas con éxito");
}

Initializer.CargarNumeraciones = async (pNumeracion) => {
    console.log("Cargando numeraciones");
    await pNumeracion.findOrCreate({
        where: {cod_numeracion:Constantes.FAEL_CODE},
        defaults: {
            cod_numeracion:Constantes.FAEL_CODE,
            numeracion_siglas:"FAEL",
            numeracion_nombre: "Facturación Electrónica",
            numeracion_inicial: 1,
            numeracion_final: 10000,
            numeracion_aumento: 1,
            numeracion_actual: 1
        }
    })
    await pNumeracion.findOrCreate({
        where: {cod_numeracion:Constantes.FPOS_CODE},
        defaults: {
            cod_numeracion:Constantes.FPOS_CODE,
            numeracion_siglas:"FPOS",
            numeracion_nombre: "Facturación Manual en Punto de Venta",
            numeracion_inicial: 1,
            numeracion_final: 10000,
            numeracion_aumento: 1,
            numeracion_actual: 1
        }
    })
    await pNumeracion.findOrCreate({
        where: {cod_numeracion:Constantes.TRAN_CODE},
        defaults: {
            cod_numeracion:Constantes.TRAN_CODE,
            numeracion_siglas:"TRAN",
            numeracion_nombre: "Transacción",
            numeracion_inicial: 1,
            numeracion_final: 10000,
            numeracion_aumento: 1,
            numeracion_actual: 1
        }
    })
    await pNumeracion.findOrCreate({
        where: {cod_numeracion:Constantes.NTCR_CODE},
        defaults: {
            cod_numeracion:Constantes.NTCR_CODE,
            numeracion_siglas:"NTCR",
            numeracion_nombre: "Nota Crédito",
            numeracion_inicial: 1,
            numeracion_final: 10000,
            numeracion_aumento: 1,
            numeracion_actual: 1
        }
    })
    console.log("Numeraciones finalizado");
}

Initializer.CargarTipoPago = async (pTipoPago) => {
    console.log("Cargando tipo pago");
    await pTipoPago.findOrCreate({
        where: {cod_tipo_pago:Constantes.TPAGO_EFECTIVO},
        defaults: {cod_tipo_pago:Constantes.TPAGO_EFECTIVO,nombre_tipo_pago:"Efectivo"}
    })
    await pTipoPago.findOrCreate({
        where: {cod_tipo_pago:Constantes.TPAGO_ELECTRONICO},
        defaults: {cod_tipo_pago:Constantes.TPAGO_ELECTRONICO,nombre_tipo_pago:"Electrónica"}
    })
    console.log("Tipo pago finalizado");
}

Initializer.CargarTipoFacturacion = async (pTipoFacturacion) => {
    console.log("Cargando tipo facturacion");
    await pTipoFacturacion.findOrCreate({
        where: {cod_tipo_facturacion:Constantes.TFACTURACION_EFECTIVO},
        defaults: {cod_tipo_facturacion:Constantes.TFACTURACION_EFECTIVO,nombre_tipo_facturacion:"Efectivo"}
    })
    await pTipoFacturacion.findOrCreate({
        where: {cod_tipo_facturacion:Constantes.TFACTURACION_ELECTRONICO},
        defaults: {cod_tipo_facturacion:Constantes.TFACTURACION_ELECTRONICO,nombre_tipo_facturacion:"Electrónica"}
    })
    console.log("Tipo facturacion finalizado");
}

Initializer.CargarTipoConsentimiento = async (pTipoConsentimiento) => {
    console.log("Cargando tipo consentimiento");
    await pTipoConsentimiento.findOrCreate({
        where: {cod_tipo_consentimiento:Constantes.CONSENTIMIENTO_COVID},
        defaults: {cod_tipo_consentimiento:Constantes.CONSENTIMIENTO_COVID,nombre_tipo_consentimiento:"Consentimiento Covid",activo:true}
    })
    await pTipoConsentimiento.findOrCreate({
        where: {cod_tipo_consentimiento:Constantes.CONSENTIMIENTO_INTRAORAL},
        defaults: {cod_tipo_consentimiento:Constantes.CONSENTIMIENTO_INTRAORAL,nombre_tipo_consentimiento:"Consentimiento Intraoral",activo:true}
    })
    await pTipoConsentimiento.findOrCreate({
        where: {cod_tipo_consentimiento:Constantes.CONSENTIMIENTO_EXTRAORAL},
        defaults: {cod_tipo_consentimiento:Constantes.CONSENTIMIENTO_EXTRAORAL,nombre_tipo_consentimiento:"Consentimiento Extraoral",activo:true}
    })
    console.log("Tipo consentimiento finalizado");
}

Initializer.CargarTipoDocumento = async (pTipoDocumento) => {
    console.log("Cargando tipo documento");
    await pTipoDocumento.findOrCreate({
        where: {cod_tipo_documento:Constantes.TDOC_CEDULA_CIUDADANIA},
        defaults: {cod_tipo_documento:Constantes.TDOC_CEDULA_CIUDADANIA,nombre_tipo_documento:"Cédula de ciudadanía"}
    })
    await pTipoDocumento.findOrCreate({
        where: {cod_tipo_documento:Constantes.TDOC_CEDULA_EXTRANJERIA},
        defaults: {cod_tipo_documento:Constantes.TDOC_CEDULA_EXTRANJERIA,nombre_tipo_documento:"Cédula de extranjería"}
    })
    await pTipoDocumento.findOrCreate({
        where: {cod_tipo_documento:Constantes.TDOC_PASAPORTE},
        defaults: {cod_tipo_documento:Constantes.TDOC_PASAPORTE,nombre_tipo_documento:"Pasaporte"}
    })
    await pTipoDocumento.findOrCreate({
        where: {cod_tipo_documento:Constantes.TDOC_REGISTRO_CIVIL},
        defaults: {cod_tipo_documento:Constantes.TDOC_REGISTRO_CIVIL,nombre_tipo_documento:"Registro Civil"}
    })
    await pTipoDocumento.findOrCreate({
        where: {cod_tipo_documento:Constantes.TDOC_TARJETA_IDENTIDAD},
        defaults: {cod_tipo_documento:Constantes.TDOC_TARJETA_IDENTIDAD,nombre_tipo_documento:"Tarjeta de identidad"}
    })
    console.log("Tipo documento finalizado");
}

Initializer.CargarTipoEmpleado = async (pTipoEmpleado) => {
    console.log("Cargando tipo empleado");
    await pTipoEmpleado.findOrCreate({
        where: {cod_tipo_empleado:Constantes.TEMPLEADO_EMPLEADO},
        defaults: {cod_tipo_empleado:Constantes.TEMPLEADO_EMPLEADO,nombre_tipo_empleado:"Empleado"}
    })
    await pTipoEmpleado.findOrCreate({
        where: {cod_tipo_empleado:Constantes.TEMPLEADO_ADMINISTRADOR},
        defaults: {cod_tipo_empleado:Constantes.TEMPLEADO_ADMINISTRADOR,nombre_tipo_empleado:"Administrador"}
    })
    console.log("Tipo empleado finalizado");
}

Initializer.CargarTipoPrefEntrega = async (pTipoPrefentrega) => {
    console.log("Cargando tipo preferencia entrega");
    await pTipoPrefentrega.findOrCreate({
        where: {cod_tipo_pref_entrega:Constantes.TPE_FISICO},
        defaults: {cod_tipo_pref_entrega:Constantes.TPE_FISICO,nombre_tipo_pref_entrega:"Fisico"}
    })
    await pTipoPrefentrega.findOrCreate({
        where: {cod_tipo_pref_entrega:Constantes.TPE_CORREO},
        defaults: {cod_tipo_pref_entrega:Constantes.TPE_CORREO,nombre_tipo_pref_entrega:"Correo"}
    })
    console.log("Tipo empleado finalizado");
}

Initializer.CargarFormaDePagoEntidad = async (pFormaDePagoEntidad) => {
    console.log("Cargando forma de pago entidad");
    await pFormaDePagoEntidad.findOrCreate({
        where: {cod_forma_de_pago_entidad:Constantes.FPE_FISICO},
        defaults: {cod_forma_de_pago_entidad:Constantes.FPE_FISICO,nombre_forma_de_pago_entidad:"Fisico"}
    })
    await pFormaDePagoEntidad.findOrCreate({
        where: {cod_forma_de_pago_entidad:Constantes.FPE_CORREO},
        defaults: {cod_forma_de_pago_entidad:Constantes.FPE_CORREO,nombre_forma_de_pago_entidad:"Correo"}
    })
    console.log("Forma de pago entidad finalizado");
}

module.exports = Initializer