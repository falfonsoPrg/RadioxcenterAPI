const Excel = require('exceljs');

function getData(pTransaccion,pUsuario,pEntidad,pDoctor) {
    var month = parseInt(new Date().getMonth())+1
    month = month.toString().length == 1 ? "0"+month.toString():month.toString()
    var actual = new Date().getFullYear()+"-"+ month +"-"+new Date().getDate()
    var transaccionesDelDia = pTransaccion.filter(t => t.fecha_transaccion==actual)
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
            resumen:"",
            valor_total: t.valor_transaccion,
            valor_efectivo: t.cod_entidad_doctor ? 0:t.valor_transaccion,
            valor_credito: t.cod_entidad_doctor ? t.valor_transaccion:0,
        }
        dataToReturn.push(exampleObj)
    });
    return dataToReturn
}

Generador = {}
Generador.GenerarReporteDiarioDeTransacciones = async (pTransaccion, pUsuario, pEntidad, pDoctores) => {
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
        {header: 'TOMOGRAFÍA', key: 'resumen', width: 35},
        {header: 'VALOR', key: 'valor_total', width: 35},
        {header: 'Efectivo', key: 'valor_efectivo', width: 35},
        {header: 'Credito', key: 'valor_credito', width: 35},
    ]
    const sheetName = new Date().getFullYear()+"-"+new Date().getMonth()+1
    try {
        
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile('./services/reporteGeneral.xlsx');
        var newWorksheet = workbook.getWorksheet(sheetName);
        if(!newWorksheet){
            var newWorksheet = workbook.addWorksheet(sheetName);
        }
        newWorksheet.columns = cols
        newWorksheet.addRows(getData(pTransaccion, pUsuario, pEntidad, pDoctores))
        await workbook.xlsx.writeFile('./services/reporteGeneral.xlsx');

        console.log("Registro generado")
    } catch (error) {
        if(error.name == "Error"){
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet(sheetName);
            worksheet.columns = cols
            worksheet.addRows(getData(pTransaccion, pUsuario,  pEntidad, pDoctores))
            await workbook.xlsx.writeFile('./services/reporteGeneral.xlsx');
        }
        else{
            return error
        }
    }
    

}
module.exports = Generador