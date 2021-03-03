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

PDFMaker.crearConsentimientoCovid = (imagePath,data) => {
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
          {text: ["Entiendo que, a pesar del seguimiento de normas de bioseguridad en el Centro de Radiología Oral y Maxilofacial ", {text: "RADIOXENTER,",decoration: 'underline',style: 'bold'}, " debido a la presencia de otros pacientes, a las características del virus y de la toma de la Radiografías y/o estudios diagnósticos, existe un riesgo elevado de contraer el virus por el solo hecho de permanecer en el Centro de Radiología. ____ (Iniciales)"],alignment: "justify"},
          {text: ["He sido informado que las directrices de todas las instituciones de salud internacionales, ante la situación de pandemia actual, recomiendan suspender la realización de tratamiento odontológico electivo. La toma de la Radiografías y/o estudios diagnósticos se limita al procedimiento de ayudas diagnósticas para el tratamiento de dolor, infección y condiciones que interfiera de forma significativa las funciones bucales o que puedan generar agudización de una de estas condiciones, lo anterior es decisión y responsabilidad posterior a la previa evaluación por el profesional odontólogo remitente. ___ (Iniciales)"],alignment: "justify"},
          {text: ["Confirmo que solicito la toma de la Radiografías y/o estudios diagnósticos por una condición clínica que está enmarcado en los criterios anteriormente expuestos. ____ (Iniciales)"],alignment: "justify"},
          {text: ["Confirmo que no presento, ni he presentado en los últimos 14 días, ninguno de los síntomas de COVID-19 de la siguiente lista: Fiebre (Temperatura mayor o igual a 38°C), dificultad respiratoria, tos seca, secreción nasal, dolor de garganta, sensación de cansancio o malestar general, diarrea u otras molestias digestivas, perdida del gusto o del olfato. ____ (Iniciales)"],alignment: "justify"},
          {text: ["Declaro que no he estado en contacto con alguna persona con confirmación de COVID-19 o con cuadro respiratorio agudo en los últimos 14 días. ____(Iniciales)"],alignment: "justify"},
          {text: ["Ha presentado la enfermedad del COVID-19? __SI__ __NO__. En caso de haber presentado la enfermedad ¿sigue usted en cuarentena? __SI__ __NO___(Iniciales)"],alignment: "justify"},
          {text: ["Entiendo que organismos internacionales de salud recomiendan el distanciamiento social de mínimo 1.8 metros, lo cual es imposible durante la toma de las Radiografías y/o estudios diagnósticos. ____ (Iniciales)"],alignment: "justify"},
          {text: ["Toma de temperatura __________________"],alignment: "justify"},
        ],
        margin: [0,20,20,0],
      },
      {
        margin: [0,50,50,0],
        alignment: 'justify',
        columns: [
          {
            ul: [
              [{text:"Nombre: ",style:"bold"},{text: data.nombres_usuario +" "+ data.apellidos_usuario}],
              [{text:data.tipoDocumento,style:"bold"},{text: data.documento_usuario}],
              [{text:"Firma:",style:"bold"}, {image: imagePath,width: 130,height: 60,}],
            ]
          },
          {
            ul: [
              "Prestador de salud responsable",
              [{text:"Firma:"},{image: './fonts/Images/signature.png',width: 130,height: 60,}],
            ]
          }
        ]
      }
    ],
    defaultStyle: {
      fontSize: 10,
    },
    styles:{
      bold:{
        bold: true
      }
    }
  };
  var savePath = "./files/pdf/consentimientos/"
  var today = new Date()
  var timestamp = today.getDate()+""+today.getMonth()+""+today.getFullYear()+""+today.getHours()+""+today.getMinutes()
  var filename = data.documento_usuario + "_" + timestamp + ".pdf"
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(savePath+filename))
  .on('error', (err) => {
    console.log(err)
  });
  pdfDoc.end();
  return savePath+filename
}

PDFMaker.crearConsentimientoCovidTutor = (imagePath,data,tutor) => {
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
        text: ['Yo, ', {text: tutor.nombres_tutor +" "+ tutor.apellidos_tutor ,decoration: 'underline'}," identificado tal como aparece abajo, tutor legal de ", {text: data.nombres_usuario + " " + data.apellidos_usuario, decoration: 'underline'}, ", por voluntad propia y debidamente informado(a) consiento que a mi representado se le tomen las radiografía Radiografías y/o estudios diagnósticos de emergencia/urgencia a ser realizado durante la Pandemia de COVID-19."],
        alignment: 'justify',
        margin: [0, 10]
      },
      {
        text: "Entiendo que el virus COVID-19 tiene un periodo de incubación durante el cual sus portadores pueden estar asintomáticos, siendo altamente contagioso. Entiendo que al momento, debido a las limitaciones para la realización de las pruebas virales, es imposible determinar quién es portador del virus y quién no.",
        alignment: "justify"
      },
      {
        ul: [
          {text: ["Entiendo que, a pesar del seguimiento de normas de bioseguridad en el Centro de Radiología Oral y Maxilofacial ", {text: "RADIOXENTER,",decoration: 'underline',style: 'bold'}, " debido a la presencia de otros pacientes, a las características del virus y de la toma de la Radiografías y/o estudios diagnósticos, existe un riesgo elevado de contraer el virus por el solo hecho de permanecer en el Centro de Radiología. ____ (Iniciales)"],alignment: "justify"},
          {text: ["He sido informado que las directrices de todas las instituciones de salud internacionales, ante la situación de pandemia actual, recomiendan suspender la realización de tratamiento odontológico electivo. La toma de la Radiografías y/o estudios diagnósticos se limita al procedimiento de ayudas diagnósticas para el tratamiento de dolor, infección y condiciones que interfiera de forma significativa las funciones bucales o que puedan generar agudización de una de estas condiciones, lo anterior es decisión y responsabilidad posterior a la previa evaluación por el profesional odontólogo remitente. ___ (Iniciales)"],alignment: "justify"},
          {text: ["Confirmo que solicito la toma de la Radiografías y/o estudios diagnósticos por una condición clínica que está enmarcado en los criterios anteriormente expuestos. ____ (Iniciales)"],alignment: "justify"},
          {text: ["Confirmo que no presento, ni he presentado en los últimos 14 días, ninguno de los síntomas de COVID-19 de la siguiente lista: Fiebre (Temperatura mayor o igual a 38°C), dificultad respiratoria, tos seca, secreción nasal, dolor de garganta, sensación de cansancio o malestar general, diarrea u otras molestias digestivas, perdida del gusto o del olfato. ____ (Iniciales)"],alignment: "justify"},
          {text: ["Declaro que no he estado en contacto con alguna persona con confirmación de COVID-19 o con cuadro respiratorio agudo en los últimos 14 días. ____(Iniciales)"],alignment: "justify"},
          {text: ["Ha presentado la enfermedad del COVID-19? __SI__ __NO__. En caso de haber presentado la enfermedad ¿sigue usted en cuarentena? __SI__ __NO___(Iniciales)"],alignment: "justify"},
          {text: ["Entiendo que organismos internacionales de salud recomiendan el distanciamiento social de mínimo 1.8 metros, lo cual es imposible durante la toma de las Radiografías y/o estudios diagnósticos. ____ (Iniciales)"],alignment: "justify"},
          {text: ["Toma de temperatura __________________"],alignment: "justify"},
        ],
        margin: [0,20,20,0],
      },
      {
        margin: [0,50,50,0],
        alignment: 'justify',
        columns: [
          {
            ul: [
              [{text:"Nombre: ",style:"bold"},{text: tutor.nombres_tutor +" "+ tutor.apellidos_tutor}],
              [{text:tutor.tipoDocumento,style:"bold"},{text: tutor.documento_tutor}],
              [{text:"Firma:",style:"bold"}, {image: imagePath,width: 130,height: 60,}],
            ]
          },
          {
            ul: [
              "Prestador de salud responsable",
              [{text:"Firma:"},{image: './fonts/Images/signature.png',width: 130,height: 60,}],
            ]
          }
        ]
      }
    ],
    defaultStyle: {
      fontSize: 10,
    },
    styles:{
      bold:{
        bold: true
      }
    }
  };
  var savePath = "./files/pdf/consentimientos/"
  var today = new Date()
  var timestamp = today.getDate()+""+today.getMonth()+""+today.getFullYear()+""+today.getHours()+""+today.getMinutes()
  var filename = data.documento_usuario + "_" + timestamp + ".pdf"
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(savePath+filename))
  .on('error', (err) => {
    console.log(err)
  });
  pdfDoc.end();
  return savePath+filename
}

PDFMaker.createFactura = (data,esTutor,servicios,nFactura) => {
  var dataToShow = {}
  if(esTutor){
    dataToShow = {
      nombre: data.nombres_tutor +" "+ data.apellidos_tutor,
      documento: data.documento_tutor,
      telefono: "",
      direccion:"",
    }
  }else{
    dataToShow = {
      nombre: data.nombres_usuario +" "+ data.apellidos_usuario,
      documento: data.documento_usuario,
      telefono: data.telefono_usuario,
      direccion: data.direccion_usuario,
    }
  }
  var formatedServicios = []
  servicios.forEach(s => {
    formatedServicios.push({
      cant: 1,
      //concepto: s.nombre_servicio +" " + s.descripcion_servicio,
      concepto: s.nombre_servicio,
      vlrU: s.precio_servicio,
      vlrT: s.precio_servicio
    })
  })
  function buildTableBody(data, columns) {
    var body = [];
    body.push(columns);
    var subtotal = 0
    data.forEach(function(row) {
        var dataRow = [];
        columns.forEach(function(column) {
            dataRow.push({text: row[column.label].toString(), margin:[0,15,3,0], width:"200"});
            if(column.label == "vlrT") subtotal+=row[column.label]
        })
        body.push(dataRow);
    });
    body.push([{text:"SUB-TOTAL",colSpan: 3},{},{},{text:subtotal}])
    body.push([{text:"IVA %",colSpan: 3},{},{},{text:"0"}])
    body.push([{text:"TOTAL",colSpan: 3},{},{},{text:subtotal}])

    //console.log(body)
    return body;
  }
  function table(data, columns) {
      return {
        width:'auto',
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
        margin: [0,0,0,20]
      },
      {text:"Nit 123456789 Reg. Común Act. Económica 8514",alignment: 'center'},
      {text:"Número de Formulario DIAN 7818718718187 Fecha 2020/20/20",alignment: 'center'},
      {text:"Habilitada desde 1330001 hasta 150000",alignment: 'center'},
      {columns: [
        {
          ul: [
            {text: "Señor:(es): "+dataToShow.nombre, listType: 'none'},
            {text: "Dirección: "+dataToShow.direccion, listType: 'none'},
            {text: ["Tel.: "+dataToShow.telefono, "    NIT. " +dataToShow.documento] , listType: 'none'}
          ]
        },
        {
          margin:[85,0,0,0],
          table:{
            body: [
              ["Factura de venta"],
              ["NO. " + nFactura],
              ["Fecha "+new Date().toISOString().split("T")[0]]
            ]
          }
        }
      ],
      margin: [0,20,0,20],
      alignment: "center"
    },
    {
      columns:[
        { width: '*', text: '' },
        table(formatedServicios, [{text: "Cantidad",label:"cant", style: 'tableHeader'},
              {text:"Concepto",label:'concepto', style: 'tableHeader'},
              {text:"Valor Unitario",label:'vlrU', style: 'tableHeader'},
              {text:"Valor Total",label:'vlrT', style: 'tableHeader'}
            ]),
        { width: '*', text: '' },
      ]
    },
    {text:"Facatativá (Cund.)",alignment: 'center',margin:[0,10,0,0]},
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
  var savePath = "./files/pdf/facturas/"
  var today = new Date()
  var timestamp = today.getDate()+""+today.getMonth()+""+today.getFullYear()+""+today.getHours()+""+today.getMinutes()
  var filename = dataToShow.documento + "_" + timestamp + ".pdf"
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(savePath+filename))
  .on('error', (err) => {
    console.log(err)
  });
  pdfDoc.end();
  return savePath+filename
}

module.exports = PDFMaker;