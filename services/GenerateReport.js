const Excel = require('exceljs');

function getData(pTransaccion) {
    var month = parseInt(new Date().getMonth())+1
    month = month.toString().length == 1 ? "0"+month.toString():month.toString()
    var actual = new Date().getFullYear()+"-"+ month +"-"+new Date().getDate()
    console.log(actual)
    var transaccionesDelDia = pTransaccion.filter(t => t.fecha_transaccion==actual)
    console.log(transaccionesDelDia)
    var dataToReturn = []
    transaccionesDelDia.forEach(t =>{
        var exampleObj = {
            fecha: new Date(),
            hora_llegada: new Date(),
            hora_atencion: new Date(),
            tipo_documento: "",
            numero_documento: t.documento_usuario,
            nombres: "",
            apellidos: "",
            numero_transaccion: t.numero_transaccion,
            nombre_acudiente:t.nombres_acudiente + " " + t.apellidos_acudiente,
            parentesco_acudiente: t.parentesco_acudiente,
            usuario_telefono:"",
            usuario_celular:"",
            usuario_direccion: "",
            usuario_ciudad: "",
            departamento_ciudad: "",
            nombre_doctor: "",
            nombre_entidad: "",
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
Generador.GenerarReporteDiarioDeTransacciones = async (pTransaccion) => {
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
    const sheetName = new Date().getFullYear()+"-"+new Date().getMonth()
    try {
        
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile('./services/reporteGeneral.xlsx');
        var newWorksheet = workbook.getWorksheet(sheetName);
        if(!newWorksheet){
            var newWorksheet = workbook.addWorksheet(sheetName);
        }
        newWorksheet.columns = cols
        newWorksheet.addRows(getData(pTransaccion))
        await workbook.xlsx.writeFile('./services/reporteGeneral.xlsx');

        console.log("Registro generado")
    } catch (error) {
        if(error.name == "Error"){
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet(sheetName);
            worksheet.columns = cols
            worksheet.addRows(getData(pTransaccion))
            await workbook.xlsx.writeFile('./services/reporteGeneral.xlsx');
        }
        else{
            return error
        }
    }
    

}
module.exports = Generador