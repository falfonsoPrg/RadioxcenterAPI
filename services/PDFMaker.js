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

PDFMaker.createPDF1 = (imagePath) => {
  var docDefinition = {
    content: [
      {
        image: './fonts/Images/header_logo.png',
        width: 130,
        height: 60,
      },
      {
        text: 'Consentimiento informado para la toma de Radiografia y/o estudios diagnósticos en el marco de la Pandemia de covid-19',
        alignment: 'center',
        margin: [0, 20],
        style: 'bold'
      },
      {
        text: ['Yo, ', {text: "Fabian Ricardo Alfonso Tirado",decoration: 'underline'}," por voluntad propia y debidamente informado (a) consiento tomar la radiografía dígital y/o estudios diagnósticos de emergencia/urgencia a ser realizado durante la pandemia de COVID-19"],
        alignment: 'justify'
      },
      {
        ul: [
          "Yo acepto Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet elementum turpis, vitae mattis nunc sollicitudin ut. Nullam feugiat odio et nulla ultrices, eu mattis augue aliquam. Integer interdum at leo in dapibus. Quisque posuere gravida justo eu aliquet. Sed sodales ligula sit amet est porta, eu luctus ligula aliquet. Nunc nisl odio, pellentesque nec accumsan dictum, malesuada sed ligula. Aliquam erat volutpat. Mauris volutpat nisi sed libero sollicitudin fermentum sed in arcu. Duis non tincidunt ipsum. In tincidunt, sem et pulvinar dignissim, justo tellus bibendum dui, quis placerat nibh mauris facilisis massa. Sed vulputate augue sem, eget placerat felis venenatis vitae. Morbi ornare semper feugiat. Suspendisse non accumsan leo. Etiam velit dui, vulputate at augue ut, molestie aliquam justo.",
          "Yo acepto Donec tincidunt augue id justo consectetur eleifend. Phasellus ut vehicula erat, id feugiat libero. Suspendisse felis sem, auctor sit amet metus ut, tristique eleifend mi. Donec interdum nibh orci, in pretium turpis viverra sed. Suspendisse potenti. Sed odio lacus, pharetra quis velit id, sollicitudin condimentum nisi. Aenean vel nulla imperdiet, consequat nisl eget, molestie nunc. Aenean congue metus sapien, posuere vestibulum massa pretium nec.",
          "Yo acepto Integer blandit pretium tristique. Sed sit amet tempor sem. Proin nulla nibh, sollicitudin eu eros accumsan, imperdiet hendrerit quam. Vivamus vehicula placerat dolor, vitae facilisis massa imperdiet vel. Vivamus sit amet consectetur felis, at porta eros. In in velit vehicula, aliquet elit rhoncus, viverra lectus. Nulla leo tortor, ullamcorper nec tincidunt at, molestie sed leo. Integer felis lacus, elementum tincidunt quam vitae, viverra fermentum nulla.",
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