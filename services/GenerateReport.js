const Excel = require('exceljs');

function getData(fechaInicia,fechaFinal,pTransaccion,pUsuario,pEntidad,pDoctor,pServicio) {
    var month = parseInt(new Date().getMonth())+1
    month = month.toString().length == 1 ? "0"+month.toString():month.toString()
    var transaccionesDelDia = pTransaccion.filter(t => t.fecha_transaccion>=fechaInicia && t.fecha_transaccion<=fechaFinal)
    transaccionesDelDia.sort((a,b) => (a.numero_transaccion > b.numero_transaccion) ? 1 : ((b.numero_transaccion > a.numero_transaccion) ? -1 : 0))
    var dataToReturn = []
    transaccionesDelDia.forEach(t =>{
        var usuario = pUsuario.find(u => u.documento_usuario == t.documento_usuario)
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

        //Armar objeto
        var exampleObj = {
            fecha: usuario.updatedAt,
            hora_llegada: usuario.updatedAt,
            hora_atencion: new Date(),
            tipo_documento: tipoDoc,
            numero_documento: t.documento_usuario,
            nombres: usuario.nombres_usuario,
            apellidos: usuario.apellidos_usuario,
            numero_transaccion: t.numero_transaccion,
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
            valor_total: t.valor_transaccion,
            valor_efectivo: t.cod_entidad_doctor ? 0:t.valor_transaccion,
            valor_credito: t.cod_entidad_doctor ? t.valor_transaccion:0,
        }
        dataToReturn.push(exampleObj)
    });
    return dataToReturn
}

Generador = {}
Generador.GenerarReporteDiarioDeTransacciones = async (fechaInicia,fechaFinal,pTransaccion, pUsuario, pEntidad, pDoctores, pServicio) => {
    const cols = [
        {header: 'Fecha', key: 'fecha', width: 10},
        {header: 'Hora llegada', key: 'hora_llegada', width: 10},
        {header: 'Hora atención', key: 'hora_atencion', width: 10},
        {header: 'Tipo Doc.', key: 'tipo_documento', width: 35},
        {header: 'Número de Documento.', key: 'numero_documento', width: 35},
        {header: 'Nombres.', key: 'nombres', width: 35},
        {header: 'Apellidos.', key: 'apellidos', width: 35},
        {header: 'Numero Transaccion', key: 'numero_transaccion', width: 35},
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
        {header: 'VALOR', key: 'valor_total', width: 35},
        {header: 'Efectivo', key: 'valor_efectivo', width: 35},
        {header: 'Credito', key: 'valor_credito', width: 35},
    ]
    const sheetName = new Date().getFullYear()+"-"+new Date().getMonth()+1
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
        newWorksheet.columns = cols
        newWorksheet.addRows(getData(fechaInicia,fechaFinal,pTransaccion, pUsuario, pEntidad, pDoctores, pServicio))
        await workbook.xlsx.writeFile(filename);

        return filename
    } catch (error) {
        if(error.name == "Error"){
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet(sheetName);
            worksheet.columns = cols
            worksheet.addRows(getData(fechaInicia,fechaFinal,pTransaccion, pUsuario,  pEntidad, pDoctores, pServicio))
            await workbook.xlsx.writeFile(filename);
            return filename
        }
        else{
            return error
        }
    }
    

}
module.exports = Generador