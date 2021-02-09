var fonts = {
  Roboto: {
    normal: './fonts/Roboto-Regular.ttf',
    bold: './fonts/Roboto-Medium.ttf',
    italics: './fonts/Roboto-Italic.ttf',
    bolditalics: './fonts/Roboto-MediumItalic.ttf'
  }
};
const PdfPrinter  = require("pdfmake");
const printer  = new PdfPrinter(fonts);
const fs = require('fs');

PDFMaker = {}

PDFMaker.createPDF1 = (imagePath,data) => {
  var docDefinition = {
    content: [
      {
        image: './fonts/Images/header_logo.png',
        width: 130,
        height: 60,
      },
      {
        text: 'Consentimiento informado para toma de Radiografías y/o estudios diagnósticos en el marco de la Pandemia de covid-19',
        alignment: 'center',
        margin: [0, 20],
        style: 'bold'
      },
      {
        text: ['Yo, ', {text: data.nombres_usuario +" "+ data.apellidos_usuario ,decoration: 'underline'}," por voluntad propia y debidamente informado (a) consiento tomar la radiografía dígital y/o estudios diagnósticos de emergencia/urgencia a ser realizado durante la pandemia de COVID-19."],
        alignment: 'justify'
      },
      {
        text: "Entiendo que el virus COVID-19 tiene un periodo de incubación durante el cual sus portadores pueden estar asintomáticos, siendo altamente contagioso. Entiendo que al momento, debido a las limitaciones para la realización de las pruebas virales, es imposible determinar quién es portador del virus y quién no.",
        alignment: "justify"
      },
      {
        ul: [
          {text: ["Entiendo que, a pesar del seguimiento de normas de bioseguridad en el Centro de Radiología Oral y Maxilofacial", {text: "RADIOXENTER,",decoration: 'underline',style: 'bold'}, " debido a la presencia de otros pacientes, a las características del virus y de la toma de la Radiografías y/o estudios diagnósticos, existe un riesgo elevado de contraer el virus por el solo hecho de permanecer en el Centro de Radiología. ____ (Iniciales)"]},
          {text: ["He sido informado que las directrices de todas las instituciones de salud internacionales, ante la situación de pandemia actual, recomiendan suspender la realización de tratamiento odontológico electivo. La toma de la Radiografías y/o estudios diagnósticos se limita al procedimiento de ayudas diagnósticas para el tratamiento de dolor, infección y condiciones que interfiera de forma significativa las funciones bucales o que puedan generar agudización de una de estas condiciones, lo anterior es decisión y responsabilidad posterior a la previa evaluación por el profesional odontólogo remitente. ___ (Iniciales)"]},
          {text: ["Confirmo que solicito la toma de la Radiografías y/o estudios diagnósticos por una condición clínica que está enmarcado en los criterios anteriormente expuestos. ____ (Iniciales)"]},
          {text: ["Confirmo que no presento, ni he presentado en los últimos 14 días, ninguno de los síntomas de COVID-19 de la siguiente lista: Fiebre (Temperatura mayor o igual a 38°C), dificultad respiratoria, tos seca, secreción nasal, dolor de garganta, sensación de cansancio o malestar general, diarrea u otras molestias digestivas, perdida del gusto o del olfato. ____ (Iniciales)"]},
        ],
        margin: [0,20,20,0],
      },
      {
        margin: [0,50,50,0],
        alignment: 'justify',
        columns: [
          {
            ul: [
              [{text:"Nombre: ",style:"bold"},{text:"Pepito perez"}],
              [{text:"Firma:"}, {image: './fonts/Images/signature.png',width: 130,height: 60,}],
              "CC: #########",
            ]
          },
          {
            ul: [
              "Prestador de salud responsable",
              "Nombre: Juanito Gonzales",
              [{text:"Firma:"},{image: imagePath,width: 130,height: 60,}],
              "CC: #########",
            ]
          }
        ]
      }
    ],
    styles:{
      bold:{
        bold: true
      }
    }
  };
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream('./files/pdf/consentimiento_juanito.pdf'))
  .on('error', (err) => {
    console.log(err)
  });
  pdfDoc.end();
  return "/files/pdf/consentimiento_juanito.pdf"
}

PDFMaker.createPDF2 = () => {

  function buildTableBody(data, columns) {
    var body = [];
    body.push(columns);
    data.forEach(function(row) {
        var dataRow = [];
        columns.forEach(function(column) {
            dataRow.push({text: row[column.label].toString(), margin:[0,15,3,0]});
        })
        body.push(dataRow);
    });
    body.push([{text:"SUB-TOTAL",colSpan: 3},{},{},{text:"1000"}])
    body.push([{text:"IVA %",colSpan: 3},{},{},{text:"0"}])
    body.push([{text:"TOTAL",colSpan: 3},{},{},{text:"1000"}])

    //console.log(body)
    return body;
  }
  function table(data, columns) {
      return {
        margin: [50,0,0,0],
        alignment: 'center',
        //layout: 'lightHorizontalLines',
          table: {
              headerRows: 1,
              body: buildTableBody(data, columns)
          }
      };
  }

  var docDefinition = {
    content: [
      {
        image: './fonts/Images/header_logo.png',
        width: 130,
        height: 60,
        margin: [0,20,0,20]
      },
      {text:"Nit 123456789 Reg. Común Act. Económica 8514",alignment: 'center'},
      {text:"Número de Formulario DIAN 7818718718187 Fecha 2020/20/20",alignment: 'center'},
      {text:"Habilitada desde 1330001 hasta 150000",alignment: 'center'},
      {columns: [
        {
          ul: [
            {text: "Señor:(es): Juanito Lopez", listType: 'none'},
            {text: "Dirección: Calle 123 # 456 - 78", listType: 'none'},
            {text: ["Tel.:12345678", "NIT.1988745"], listType: 'none'}
          ]
        },
        {
          margin:[85,0,0,0],
          table:{
            body: [
              ["Factura de venta"],
              ["NO. 1335050"],
              ["Fecha | 20 | 20 | 2020"]
            ]
          }
        }
      ],
      margin: [0,20,0,20],
      alignment: "center"
    },
    table([
      { cant: '1', concepto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', vlrU: 34, vlrT: 34 },
      { cant: '2', concepto: 'Integer blandit pretium tristique.', vlrU: 27, vlrT: 34 },
      { cant: '3', concepto: 'Donec tincidunt augue id justo consectetur eleifend. Phasellus ut vehicula erat, id feugiat libero.', vlrU: 30, vlrT: 34 }], 
      [
        {text: "Cantidad",label:"cant", style: 'tableHeader'},
        {text:"Concepto",label:'concepto', style: 'tableHeader'},
        {text:"Valor Unitario",label:'vlrU', style: 'tableHeader'},
        {text:"Valor Total",label:'vlrT', style: 'tableHeader'}
      ]),
      {text:"Facatativá (Cund.)",alignment: 'center',margin:[0,25,0,0]},
      {text:"Calle 8 No 6 - 59. Tel: 8429548 / Fax #######",alignment: 'center'},
      {text:"radioxenter@gmail.com",alignment: 'center'},
      {text:"www.radioxenter.com",alignment: 'center'},
    ],
    styles:{
      bold:{
        bold: true
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    }
  };
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream('./files/pdf/factura_pepito.pdf'))
  .on('error', (err) => {
    console.log(err)
  });
  pdfDoc.end();
}

module.exports = PDFMaker;