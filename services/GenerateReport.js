const Excel = require('exceljs');

function getData(fechaInicia,fechaFinal,pTransaccion,pUsuario,pEntidad,pDoctor,pServicio,pEmpleado,pFactura,pNotaCredito) {
    var month = parseInt(new Date().getMonth())+1
    month = month.toString().length == 1 ? "0"+month.toString():month.toString()
    var transaccionesDelDia = pTransaccion.filter(t => t.fecha_transaccion>=fechaInicia && t.fecha_transaccion<=fechaFinal)
    transaccionesDelDia.sort((a,b) => (a.numero_transaccion > b.numero_transaccion) ? 1 : ((b.numero_transaccion > a.numero_transaccion) ? -1 : 0))
    var dataToReturn = []
    transaccionesDelDia.forEach(t =>{
        var usuario = pUsuario.find(u => u.documento_usuario == t.documento_usuario)
        if(usuario != undefined){
            var tipoDoc = usuario.Tipo_Documento.nombre_tipo_documento
            var nombreDoctor = "N/A"
            var nombreEntidad = "N/A"
            if(t.cod_entidad_doctor != null){
                var doc = pDoctor.find(d => d.cod_doctor == t.Entidad_doctor.cod_doctor)
                nombreDoctor = doc.nombres_doctor + " " + doc.apellidos_doctor
                nombreEntidad = pEntidad.find(d => d.cod_entidad == t.Entidad_doctor.cod_entidad).razon_social_entidad
            }

            var resumenTransaccion = ""
            t.Transaccion_servicios.forEach(ts => {
                var servi = pServicio.find(s => s.cod_servicio == ts.cod_servicio)
                if(servi != undefined){
                    resumenTransaccion += servi.nombre_servicio + " X" + ts.cantidad + " / "
                }
            })

            var empleado = pEmpleado.find(e => e.cod_empleado == t.cod_empleado)
            var nFactura = "N/A"
            if(t.Transaccion_Facturas.length > 0){
                var fac = pFactura.find(f => f.cod_factura == t.Transaccion_Facturas[0].cod_factura)
                nFactura = fac.numero_factura
            }

            //Armar objeto
            var exampleObj = {
                responsable: empleado.nombres_empleado + " " + empleado.apellidos_empleado,
                fecha: usuario.updatedAt,
                hora_llegada: usuario.updatedAt,
                hora_atencion: t.updatedAt,
                tipo_documento: tipoDoc,
                numero_documento: t.documento_usuario,
                nombres: usuario.nombres_usuario,
                apellidos: usuario.apellidos_usuario,
                fecha_nacimiento: usuario.fecha_nacimiento_usuario,
                motivo: t.motivo_transaccion,
                numero_transaccion: t.numero_transaccion,
                numero_factura: nFactura,
                nombre_acudiente:t.nombres_acudiente + " " + t.apellidos_acudiente == "" ? "N/A": t.nombres_acudiente + " " + t.apellidos_acudiente,
                parentesco_acudiente: t.parentesco_acudiente == "" ? "N/A":t.parentesco_acudiente ,
                usuario_telefono:usuario.telefono_usuario,
                usuario_celular:usuario.celular_usuario,
                usuario_direccion: usuario.direccion_usuario,
                usuario_ciudad: usuario.Ciudad.nom_ciudad,
                departamento_ciudad: usuario.Ciudad.Departamento.nom_departamento,
                nombre_doctor: nombreDoctor,
                nombre_entidad: nombreEntidad,
                resumen:resumenTransaccion,
                fpago: t.forma_de_pago,
                valor_total: t.forma_de_pago == "Efectivo"? t.valor_transaccion : 0,
                valor_tarjeta: t.forma_de_pago == "Tarjeta" ? t.valor_transaccion : 0,
                valor_otro: t.forma_de_pago == "Otro" ? t.valor_transaccion : 0,
                valor_entidad: t.forma_de_pago == "Entidad" ? t.valor_transaccion : 0,
            }
            dataToReturn.push(exampleObj)
        }
    });
    return dataToReturn
}
function getNTData(fechaInicia,fechaFinal,pEmpleado,pNotaCredito){
    var dataToReturn = []
    var transaccionesDelDia = pNotaCredito.filter(t => {
        var month = t.fecha_nota_credito.getMonth() + 1
        month = month.toString().length == 1 ? "0"+month.toString():month.toString()
        var fechaAux = t.fecha_nota_credito.getFullYear() + "-"+ month +"-"+ t.fecha_nota_credito.getDate()
        if(fechaAux>=fechaInicia && fechaAux<=fechaFinal){
            return t
        }
    })
    transaccionesDelDia.forEach(nt => {
        var empleado = pEmpleado.find(e => e.cod_empleado == nt.cod_empleado)
        var exampleObj = {
            responsable:empleado.nombres_empleado + " " + empleado.apellidos_empleado,
            fecha:nt.updatedAt,
            numero:nt.numero_nota_credito,
            descripcion:nt.descripcion_nota_credito,
            motivo:nt.motivo,
            valor:nt.valor_total
        }
        dataToReturn.push(exampleObj)
    });
    return dataToReturn
}
Generador = {}
Generador.GenerarReporteDiarioDeTransacciones = async (fechaInicia,fechaFinal,pTransaccion, pUsuario, pEntidad, pDoctores, pServicio, pEmpleado,pFactura,pNotaCredito) => {
    const cols = [
        {header: 'Responsable', key: 'responsable', width: 40},
        {header: 'Fecha', key: 'fecha', width: 10},
        {header: 'Hora llegada', key: 'hora_llegada', width: 10},
        {header: 'Hora atención', key: 'hora_atencion', width: 10},
        {header: 'Tipo Doc.', key: 'tipo_documento', width: 35},
        {header: 'Número de Documento.', key: 'numero_documento', width: 35},
        {header: 'Nombres.', key: 'nombres', width: 35},
        {header: 'Apellidos.', key: 'apellidos', width: 35},
        {header: 'Fecha de nacimiento.', key: 'fecha_nacimiento', width: 35},
        {header: 'Causa de la RX.', key: 'motivo', width: 35},
        {header: 'Numero Transaccion', key: 'numero_transaccion', width: 35},
        {header: 'Numero Factura', key: 'numero_factura', width: 35},
        {header: 'Nombre de Adulto Responsable', key: 'nombre_acudiente', width: 35},
        {header: 'Parentesco', key: 'parentesco_acudiente', width: 35},
        {header: 'Teléfono', key: 'usuario_telefono', width: 35},
        {header: 'Celular', key: 'usuario_celular', width: 35},
        {header: 'Dirección', key: 'usuario_direccion', width: 35},
        {header: 'Ciudad', key: 'usuario_ciudad', width: 35},
        {header: 'Departamento', key: 'departamento_ciudad', width: 35},
        {header: 'Dr(a)', key: 'nombre_doctor', width: 35},
        {header: 'Entidad o Aseguradora', key: 'nombre_entidad', width: 35},
        {header: 'Servicios', key: 'resumen', width: 35},
        {header: 'Forma de pago', key: 'fpago', width: 35},
        {header: 'Valor pagado en RX', key: 'valor_total', width: 35},
        {header: 'Datafono', key: 'valor_tarjeta', width: 35},
        {header: 'Otro', key: 'valor_otro', width: 35},
        {header: 'Valor pagado en entidad', key: 'valor_entidad', width: 35},
    ]
    const colsNT = [
        {header: 'Responsable', key: 'responsable', width: 40},
        {header: 'Fecha', key: 'fecha', width: 40},
        {header: 'Numero nota credito', key: 'numero', width: 40},
        {header: 'Descripcion', key: 'descripcion', width: 40},
        {header: 'Motivo', key: 'motivo', width: 40},
        {header: 'Valor', key: 'valor', width: 40},
    ]
    const sheetName = "TRAN "+fechaInicia+" "+fechaFinal
    const sheetNameNotaCred = "NTCRED "+fechaInicia+" "+fechaFinal
    var today = new Date()
    var timestamp = today.getDate()+""+today.getMonth()+""+today.getFullYear()+""+today.getHours()+""+today.getMinutes()+""+today.getSeconds()
    var filename = './public/xlsx/reporteGeneral_'+timestamp+'.xlsx'
    try {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filename);
        var newWorksheet = workbook.getWorksheet(sheetName);
        if(!newWorksheet){
            var newWorksheet = workbook.addWorksheet(sheetName);
        }
        var newWorksheetNtcr = workbook.getWorksheet(sheetNameNotaCred);
        if(!newWorksheetNtcr){
            var newWorksheetNtcr = workbook.addWorksheet(sheetNameNotaCred);
        }
        newWorksheet.columns = cols
        newWorksheetNtcr.columns = colsNT
        newWorksheet.addRows(getData(fechaInicia,fechaFinal,pTransaccion, pUsuario, pEntidad, pDoctores, pServicio,pEmpleado,pFactura,pNotaCredito))
        newWorksheetNtcr.addRows(getNTData(fechaInicia,fechaFinal,pEmpleado,pNotaCredito))
        await workbook.xlsx.writeFile(filename);

        return filename
    } catch (error) {
        if(error.name == "Error"){
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet(sheetName);
            const worksheetNtcr = workbook.addWorksheet(sheetNameNotaCred);
            worksheet.columns = cols
            worksheetNtcr.columns = colsNT
            worksheet.addRows(getData(fechaInicia,fechaFinal,pTransaccion, pUsuario,  pEntidad, pDoctores, pServicio,pEmpleado,pFactura,pNotaCredito))
            worksheetNtcr.addRows(getNTData(fechaInicia,fechaFinal,pEmpleado,pNotaCredito))
            await workbook.xlsx.writeFile(filename);
            return filename
        }
        else{
            return error
        }
    }
    

}
module.exports = Generador