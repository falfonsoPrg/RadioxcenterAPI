var fonts = {
  Roboto: {
    normal: './fonts/Roboto-Regular.ttf',
    bold: './fonts/Roboto-Medium.ttf',
    italics: './fonts/Roboto-Italic.ttf',
    bolditalics: './fonts/Roboto-MediumItalic.ttf'
  }
};
const PdfPrinter = require("pdfmake");
const printer = new PdfPrinter(fonts);
const fs = require('fs');

PDFMaker = {}

PDFMaker.crearConsentimientoCovid = (imagePath,data,covid) => {
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
          {text: ["Entiendo que, a pesar del seguimiento de normas de bioseguridad en el Centro de Radiología Oral y Maxilofacial ", {text: "RADIOXENTER,",decoration: 'underline',style: 'bold'}, " debido a la presencia de otros pacientes, a las características del virus y de la toma de la Radiografías y/o estudios diagnósticos, existe un riesgo elevado de contraer el virus por el solo hecho de permanecer en el Centro de Radiología.", covid.riesgo_elevado , "(Iniciales)"],alignment: "justify"},
          {text: ["He sido informado que las directrices de todas las instituciones de salud internacionales, ante la situación de pandemia actual, recomiendan suspender la realización de tratamiento odontológico electivo. La toma de la Radiografías y/o estudios diagnósticos se limita al procedimiento de ayudas diagnósticas para el tratamiento de dolor, infección y condiciones que interfiera de forma significativa las funciones bucales o que puedan generar agudización de una de estas condiciones, lo anterior es decisión y responsabilidad posterior a la previa evaluación por el profesional odontólogo remitente." , covid.informado_directrices , "(Iniciales)"],alignment: "justify"},
          {text: ["Confirmo que solicito la toma de la Radiografías y/o estudios diagnósticos por una condición clínica que está enmarcado en los criterios anteriormente expuestos." ,covid.confirmacion_solicitud, "(Iniciales)"],alignment: "justify"},
          {text: ["Confirmo que no presento, ni he presentado en los últimos 14 días, ninguno de los síntomas de COVID-19 de la siguiente lista: Fiebre (Temperatura mayor o igual a 38°C), dificultad respiratoria, tos seca, secreción nasal, dolor de garganta, sensación de cansancio o malestar general, diarrea u otras molestias digestivas, perdida del gusto o del olfato.",covid.confirmacion_sintomas,"(Iniciales)"],alignment: "justify"},
          {text: ["Declaro que no he estado en contacto con alguna persona con confirmación de COVID-19 o con cuadro respiratorio agudo en los últimos 14 días.",covid.declaracion_contacto,"(Iniciales)"],alignment: "justify"},
          {text: ["Ha presentado la enfermedad del COVID-19?",covid.presentado_covid ? "SI":"NO",". En caso de haber presentado la enfermedad ¿sigue usted en cuarentena?",covid.cuarentena ? "SI":"NO","(Iniciales)"],alignment: "justify"},
          {text: ["Entiendo que organismos internacionales de salud recomiendan el distanciamiento social de mínimo 1.8 metros, lo cual es imposible durante la toma de las Radiografías y/o estudios diagnósticos." ,covid.entender_distancia, "(Iniciales)"],alignment: "justify"},
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
  var savePath = "./public/pdf/consentimientos/"
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

PDFMaker.crearConsentimientoCovidTutor = (imagePath,data,tutor,covid) => {
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
          {text: ["Entiendo que, a pesar del seguimiento de normas de bioseguridad en el Centro de Radiología Oral y Maxilofacial ", {text: "RADIOXENTER,",decoration: 'underline',style: 'bold'}, " debido a la presencia de otros pacientes, a las características del virus y de la toma de la Radiografías y/o estudios diagnósticos, existe un riesgo elevado de contraer el virus por el solo hecho de permanecer en el Centro de Radiología.", covid.riesgo_elevado , "(Iniciales)"],alignment: "justify"},
          {text: ["He sido informado que las directrices de todas las instituciones de salud internacionales, ante la situación de pandemia actual, recomiendan suspender la realización de tratamiento odontológico electivo. La toma de la Radiografías y/o estudios diagnósticos se limita al procedimiento de ayudas diagnósticas para el tratamiento de dolor, infección y condiciones que interfiera de forma significativa las funciones bucales o que puedan generar agudización de una de estas condiciones, lo anterior es decisión y responsabilidad posterior a la previa evaluación por el profesional odontólogo remitente." , covid.informado_directrices , "(Iniciales)"],alignment: "justify"},
          {text: ["Confirmo que solicito la toma de la Radiografías y/o estudios diagnósticos por una condición clínica que está enmarcado en los criterios anteriormente expuestos." ,covid.confirmacion_solicitud, "(Iniciales)"],alignment: "justify"},
          {text: ["Confirmo que no presento, ni he presentado en los últimos 14 días, ninguno de los síntomas de COVID-19 de la siguiente lista: Fiebre (Temperatura mayor o igual a 38°C), dificultad respiratoria, tos seca, secreción nasal, dolor de garganta, sensación de cansancio o malestar general, diarrea u otras molestias digestivas, perdida del gusto o del olfato.",covid.confirmacion_sintomas,"(Iniciales)"],alignment: "justify"},
          {text: ["Declaro que no he estado en contacto con alguna persona con confirmación de COVID-19 o con cuadro respiratorio agudo en los últimos 14 días.",covid.declaracion_contacto,"(Iniciales)"],alignment: "justify"},
          {text: ["Ha presentado la enfermedad del COVID-19?",covid.presentado_covid ? "SI":"NO",". En caso de haber presentado la enfermedad ¿sigue usted en cuarentena?",covid.cuarentena ? "SI":"NO","(Iniciales)"],alignment: "justify"},
          {text: ["Entiendo que organismos internacionales de salud recomiendan el distanciamiento social de mínimo 1.8 metros, lo cual es imposible durante la toma de las Radiografías y/o estudios diagnósticos." ,covid.entender_distancia, "(Iniciales)"],alignment: "justify"},
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
  var savePath = "./public/pdf/consentimientos/"
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

PDFMaker.createFactura = (data,esTutor,servicios,nFactura,sigla) => {
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
        width: 100,
        height: 40,
        margin: [0,0,0,20]
      },
      {text:"Nit 900.311.422-4 Reg. Común Act. Económica 8514",alignment: 'center'},
      {text:"Número de Formulario DIAN 18763000515449 Fecha 2019/09/17",alignment: 'center'},
      {text:"Habilitada desde "+nFactura.numeracion_inicial+" hasta "+nFactura.numeracion_final,alignment: 'center'},
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
              [sigla+". " + nFactura.numeracion_actual],
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
    {text:"Facatativá (Cund.) Calle 8 No 6 - 59. Tel: 8429548 / Fax #######",alignment: 'center',margin:[0,5,0,0]},
    {text:"radioxenter@gmail.com - www.radioxenter.com",alignment: 'center'},
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
  var savePath = "./public/pdf/facturas/"
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

PDFMaker.createFacturaEntidad = (entidad,transacciones,nFactura,sigla) => {

  var formatedTransacciones = []
  transacciones.forEach(t => {
    formatedTransacciones.push({
      cant: 1,
      concepto: "Transacción #" + t.numero_transaccion,
      vlrU: t.valor_transaccion,
      vlrT: t.valor_transaccion
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
      {text:"Número de Formulario DIAN 18763000515449 Fecha 2019/09/17",alignment: 'center'},
      {text:"Habilitada desde "+nFactura.numeracion_inicial+" hasta "+nFactura.numeracion_final,alignment: 'center'},
      {columns: [
        {
          ul: [
            {text: "Señor:(es): "+entidad.razon_social_entidad, listType: 'none'},
            {text: "Dirección: "+entidad.direccion_entidad, listType: 'none'},
            {text: ["Tel.: "+entidad.telefono_entidad, "    NIT. " +entidad.nit_entidad] , listType: 'none'}
          ]
        },
        {
          margin:[85,0,0,0],
          table:{
            body: [
              ["Factura de venta"],
              [sigla+". " + nFactura.numeracion_actual],
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
        table(formatedTransacciones, [{text: "Cantidad",label:"cant", style: 'tableHeader'},
              {text:"Concepto",label:'concepto', style: 'tableHeader'},
              {text:"Valor Unitario",label:'vlrU', style: 'tableHeader'},
              {text:"Valor Total",label:'vlrT', style: 'tableHeader'}
            ]),
        { width: '*', text: '' },
      ]
    },
    {text:"Facatativá (Cund.) Calle 8 No 6 - 59. Tel: 8429548 / Fax #######",alignment: 'center',margin:[0,5,0,0]},
    {text:"radioxenter@gmail.com - www.radioxenter.com",alignment: 'center'},
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
  var savePath = "./public/pdf/facturas/"
  var today = new Date()
  var timestamp = today.getDate()+""+today.getMonth()+""+today.getFullYear()+""+today.getHours()+""+today.getMinutes()
  var filename = entidad.nit_entidad + "_" + timestamp + ".pdf"
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(savePath+filename))
  .on('error', (err) => {
    console.log(err)
  });
  pdfDoc.end();
  return savePath+filename
}

PDFMaker.crearConsentimientoIntraoral = (data,tutor,firma,condiciones) => {
  var esTutor;
  if(tutor.documento_tutor == -1){
    tutor.documento_tutor = "__________"
    tutor.nombres_tutor = "__________"
    tutor.apellidos_tutor = "__________"
    tutor.parentesco_tutor = "__________"
    tutor.aceptar = "______"
    tutor.nombres_menor = "__________"
    esTutor = false
  }
  else{
    tutor.aceptar = "___X___"
    tutor.nombres_menor = data.nombres_usuario + " " + data.apellidos_usuario
    esTutor = true
  }
  var docDefinition = {
    content: [
      {
          table:{
            body: [
              [
                {
                  image: './fonts/Images/header_logo.png',
                  width: 130,
                  height: 60,
                },
                {
                  text: 'CONSENTIMIENTO INFORMADO TOMA DE RADIOGRAFIA INTRAORAL',
                  alignment: 'center',
                  margin: [0, 20],
                  style: 'bold'
                },
                {
                  text: 'VERSION:2 FECHA: Febrero 2019',
                  alignment: 'center',
                  margin: [0, 20],
                  style: 'bold'
                },
              ]
            ]
          }
      },
      {
        text: ['Por medio de la presente constancia, en pleno y normal uso de mis facultades mentales, otorgo en forme libre mi consentimiento al prestador de salud oral para que en ejercicio legal de su labor y con el concurso de otros profesionales de la salud que llegaren a requerirse, así como el personal auxiliar de servicio asistenciales que se hagan necesarios, se me practique(n)lo(s) siguientes(s) procedimiento(s):',{text: 'RADIOGRAFIA INTRAORAL', style: 'bold'}],
        alignment: 'justify',
        margin: [0, 10]
      },
      {
        text: "El prestador de salud oral queda igualmente facultado para llevar a cabo la práctica de conductas o procedimientos adicionales a los ya autorizados en el punto anterior, si en el curso del procedimiento llegare a presentarse una situación advertida o imprevista que a juicio del profesional tratante, los haga aconsejable.",
        alignment: "justify"
      },
      {
        text: ['Que el procedimiento que necesito y se me va a realizar consiste en: ',{text: 'TOMA DE RADIOGRAFIAS INTRAORALES: ES UNA DE LAS TECNICAS UTILIZADAS EN LA RADIOGRAFIA INTRABUCAL. LA RADIGRAFIA INTRABUCAL ES UNA TECNICA EXPLORATORIA CONSISTE EN LA COLOCACION (DENTRO DE LA BOCA) DE PLACAS RADIOGRAFICAS DE DIFERENTES TAMANOS QUE SON IMPRESIONADAS, DESDE EL INTERIOR, POR UN APARATO DE RAYOS X.', style: 'bold'}],
        alignment: 'justify',
        margin: [0, 10]
      },
      {
        text: ["Que los ",{text: "BENEFICIOS",style:'bold'}," son"],
        alignment: "justify"
      },
      {
        ul: [
          {text: ['Toma de radiografías intraoral es obtener imágenes lo mas exactas posibles de la estructura dentaria y como complemento al examen clínico.'],alignment: "justify"},
        ],
      },
      {
        text: ["Que los ",{text: "RIESGOS",style:'bold'}," previstos y posibles complicaciones más frecuentes son:"],
        alignment: "justify"
      },
      {
        ul: [
          {text: ['Exposición a la radiación y repetición de la toma de radiografías'],alignment: "justify"},
        ],
      },
      {
        text: ['El prestador de salud oral tratante me ha dado las recomendaciones necesarias para la toma de la ayuda diagnostica, me ha explicado que la exposición a la radiación utilizando este tipo de técnicas radiográficas es muy baja.'],
        alignment: 'justify',
        margin: [0, 10]
      },
      {
        text: [{text: 'QUE DE ACUERDO A MIS CONDICIONES DE SALUD LOS RIESGOS ESPECÍFICOS SON: ', style:'bold'}, {text:condiciones.condicion_intraoral != ""?condiciones.condicion_intraoral:'_______________________________________________________________________________________________________', style:'bold'}],
        alignment: 'justify',
      },
      {
        text: ['Por ello manifestó que estoy satisfecho con la información recibida y que comprendo el alcance y los riesgos del procedimiento'],
        alignment: 'justify',
      },
      {
        text: ['Nota: cuando el paciente no tenga capacidad legal para otorga el consentimiento, las manifestaciones de este contenías en el presente documento se entienden hechas por la persona responsable que lo representa y en relación con el paciente correspondiente para cutos efectos lo suscriben'],
        alignment: 'justify',
      },
      {
        table:{
          body:[
            [{text: ["YO ", data.nombres_usuario +" "+ data.apellidos_usuario," CON DOCUMENTO DE IDENTIDAD NUMERO ", data.documento_usuario ," DECIDO LIBRE Y VOLUNTARIAMENTE (ACEPTAR__X___ O RECHAZAR______) EL PROCEDIMIENTO SUGERIDO Y ASUMO LA RESPONSABILIDAD Y LAS CONSECUENCIAS QUE ELLO ACARREE."]}]
          ]
        },
        margin:[0,10]
      },
      {
        ul: [
          {text: ['PARA LOS MENORES DE EDAD/PACIENTES SIN CAPACIDAD LEGAL PARA OTORGAR EL CONSENTIMIENTO: '],style:'bold',alignment: "justify"},
        ],
      },
      {
        text: ["YO " , tutor.nombres_tutor + " " +tutor.apellidos_tutor ," CON DOCUMENTO DE IDENTIDAD NUMERO ", tutor.documento_tutor," EN CALIDAD DE ",tutor.parentesco_tutor," (PARENTESCO/REPRESENTANTE LEGAL). DEL MENOR ", tutor.nombres_menor ," DECIDO LIBRE Y VOLUNTARIAMENTE (ACEPTAR", tutor.aceptar ,"O RECHAZAR______) EL PROCEDIMIENTO SUGERIDO Y ASUMO LA RESPONSABILIDAD Y LAS CONSECUENCIAS QUE ELLO ACARREE."],
        alignment: "justify"
      },
      {
        table:{
          body:[
            [
              {text:[{text:"NOMBRE DEL PACIENTE",style:'bold',decoration: 'underline'}," O PERSONA RESPONSABLE: ", esTutor ? tutor.nombres_tutor + " " + tutor.apellidos_tutor : data.nombres_usuario + " " + data.apellidos_usuario ]},
              [{text:[{text:"FIRMA DEL PACIENTE",style:'bold',decoration: 'underline'}," O PERSONA RESPONSABLE"]},{image: firma,width: 130,height: 60,}],
            ],
            [{text:"Nombre del prestador de salud responsable"},[{text:"Firma del prestador de salud oral responsable"},{image: './fonts/Images/signature.png',width: 130,height: 60,}]]
          ]
        },
        margin:[0,15]
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
  var savePath = "./public/pdf/consentimientos/"
  var today = new Date()
  var timestamp = today.getDate()+""+today.getMonth()+""+today.getFullYear()+""+today.getHours()+""+today.getMinutes()
  var filename = data.documento_usuario + "_" + timestamp + "_INTRA.pdf"
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(savePath+filename))
  .on('error', (err) => {
    console.log(err)
  });
  pdfDoc.end();
  return savePath+filename
}

PDFMaker.crearConsentimientoExtraoral = (data,tutor,firma,condiciones) => {
  var esTutor;
  if(tutor.documento_tutor == -1){
    tutor.documento_tutor = "__________"
    tutor.nombres_tutor = "__________"
    tutor.apellidos_tutor = "__________"
    tutor.parentesco_tutor = "__________"
    tutor.aceptar = "______"
    tutor.nombres_menor = "__________"
    esTutor = false
    
  }
  else{
    tutor.aceptar = "___X___"
    tutor.nombres_menor = data.nombres_usuario + " " + data.apellidos_usuario
    esTutor = true
  }
  var docDefinition = {
    content: [
      {
          table:{
            body: [
              [
                {
                  image: './fonts/Images/header_logo.png',
                  width: 130,
                  height: 60,
                },
                {
                  text: 'CONSENTIMIENTO INFORMADO TOMA DE RADIOGRAFIA EXTRAORAL',
                  alignment: 'center',
                  margin: [0, 20],
                  style: 'bold'
                },
                {
                  text: 'VERSION:2 FECHA: Febrero 2019',
                  alignment: 'center',
                  margin: [0, 20],
                  style: 'bold'
                },
              ]
            ]
          }
      },
      {
        text: ['Por medio de la presente constancia, en pleno y normal uso de mis facultades mentales, otorgo en forme libre mi consentimiento al prestador de salud oral para que en ejercicio legal de su labor y con el concurso de otros profesionales de la salud que llegaren a requerirse, así como el personal auxiliar de servicio asistenciales que se hagan necesarios, se me practique(n)lo(s) siguientes(s) procedimiento(s):',{text: 'RADIOGRAFIA EXTRAORAL', style: 'bold'}],
        alignment: 'justify',
        margin: [0, 10]
      },
      {
        text: "El prestador de salud oral queda igualmente facultado para llevar a cabo la práctica de conductas o procedimientos adicionales a los ya autorizados en el punto anterior, si en el curso del procedimiento llegare a presentarse una situación advertida o imprevista que a juicio del profesional tratante, los haga aconsejable.",
        alignment: "justify"
      },
      {
        text: ['Que el procedimiento que necesito y se me va a realizar consiste en: ',{text: 'LAS RADIOGRAFÍA EXTRAORAL ES UN EXAMEN DENTAL CON RAYOS X BIDIMENSIONALES (2-D) QUE CAPTURA IMÁGENES DE LA BOCA ENTERA EN UNA SOLA TOMA, INCLUYENDO LOS DIENTES, LAS MANDÍBULAS INFERIOR Y SUPERIOR, Y LAS ESTRUCTURAS Y TEJIDOS CIRCUNDANTES.', style: 'bold'}],
        alignment: 'justify',
        margin: [0, 10]
      },
      {
        text: ["Que los ",{text: "BENEFICIOS",style:'bold'}," son"],
        alignment: "justify"
      },
      {
        ul: [
          {text: ['No queda radiación en el cuerpo de un paciente luego de realizar el examen de rayos X.'],alignment: "justify"},
          {text: ['Los rayos X por lo general no tienen efectos secundarios en el rango de diagnóstico típico para este examen.'],alignment: "justify"},
          {text: ['Los rayos X panorámicos pueden usarse en niños muy jóvenes, ya que la placa no tiene que ser ubicada dentro de la boca.'],alignment: "justify"},
        ],
      },
      {
        text: ["Que los ",{text: "RIESGOS",style:'bold'}," previstos y posibles complicaciones más frecuentes son:"],
        alignment: "justify"
      },
      {
        ul: [
          {text: ['Exposición a la radiación y repetición de la toma de radiografías'],alignment: "justify"},
        ],
      },
      {
        text: ['El prestador de salud oral tratante me ha dado las recomendaciones necesarias para la toma de la ayuda diagnostica, me ha explicado que la exposición a la radiación utilizando este tipo de técnicas radiográficas es muy baja.'],
        alignment: 'justify',
        margin: [0, 10]
      },
      {
        text: [{text: 'QUE DE ACUERDO A MIS CONDICIONES DE SALUD LOS RIESGOS ESPECÍFICOS SON: ', style:'bold'}, {text:condiciones.condicion_extraoral != "" ? condiciones.condicion_extraoral:'_______________________________________________________________________________________________________', style:'bold'}],
        alignment: 'justify',
      },
      {
        text: ['Por ello manifestó que estoy satisfecho con la información recibida y que comprendo el alcance y los riesgos del procedimiento'],
        alignment: 'justify',
      },
      {
        text: ['Nota: cuando el paciente no tenga capacidad legal para otorga el consentimiento, las manifestaciones de este contenías en el presente documento se entienden hechas por la persona responsable que lo representa y en relación con el paciente correspondiente para cutos efectos lo suscriben'],
        alignment: 'justify',
      },
      {
        table:{
          body:[
            [{text: ["YO ", data.nombres_usuario +" "+ data.apellidos_usuario," CON DOCUMENTO DE IDENTIDAD NUMERO ", data.documento_usuario ," DECIDO LIBRE Y VOLUNTARIAMENTE (ACEPTAR__X___ O RECHAZAR______) EL PROCEDIMIENTO SUGERIDO Y ASUMO LA RESPONSABILIDAD Y LAS CONSECUENCIAS QUE ELLO ACARREE."]}]
          ]
        },
        margin:[0,10]
      },
      {
        ul: [
          {text: ['PARA LOS MENORES DE EDAD/PACIENTES SIN CAPACIDAD LEGAL PARA OTORGAR EL CONSENTIMIENTO: '],style:'bold',alignment: "justify"},
        ],
      },
      {
        text: ["YO " , tutor.nombres_tutor + " " +tutor.apellidos_tutor ," CON DOCUMENTO DE IDENTIDAD NUMERO ", tutor.documento_tutor," EN CALIDAD DE ",tutor.parentesco_tutor," (PARENTESCO/REPRESENTANTE LEGAL). DEL MENOR ", tutor.nombres_menor ," DECIDO LIBRE Y VOLUNTARIAMENTE (ACEPTAR", tutor.aceptar ,"O RECHAZAR______) EL PROCEDIMIENTO SUGERIDO Y ASUMO LA RESPONSABILIDAD Y LAS CONSECUENCIAS QUE ELLO ACARREE."],
        alignment: "justify"
      },
      {
        table:{
          body:[
            [
              {text:[{text:"NOMBRE DEL PACIENTE",style:'bold',decoration: 'underline'}," O PERSONA RESPONSABLE: ", esTutor ? tutor.nombres_tutor + " " + tutor.apellidos_tutor : data.nombres_usuario + " " + data.apellidos_usuario ]},
              [{text:[{text:"FIRMA DEL PACIENTE",style:'bold',decoration: 'underline'}," O PERSONA RESPONSABLE"]},{image: firma,width: 130,height: 60,}],
            ],
            [{text:"Nombre del prestador de salud responsable"},[{text:"Firma del prestador de salud oral responsable"},{image: './fonts/Images/signature.png',width: 130,height: 60,}]]
          ]
        },
        margin:[0,15]
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
  var savePath = "./public/pdf/consentimientos/"
  var today = new Date()
  var timestamp = today.getDate()+""+today.getMonth()+""+today.getFullYear()+""+today.getHours()+""+today.getMinutes()
  var filename = data.documento_usuario + "_" + timestamp + "_EXTRA.pdf"
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(savePath+filename))
  .on('error', (err) => {
    console.log(err)
  });
  pdfDoc.end();
  return savePath+filename
}

PDFMaker.crearNotaCredito = (factura, pNumeracion) => {
  var formatedServicios = [{
    cant: 1,
    concepto: "Factura número: " + factura.numero_factura,
    vlrU: factura.valor_total_factura,
    vlrT: factura.valor_total_factura,
  }]
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
      {text:"Nit 900.311.422-4 Reg. Común Act. Económica 8514",alignment: 'center'},
      //{text:"Número de Formulario DIAN 7818718718187 Fecha 2020/20/20",alignment: 'center'},
      {text:"Habilitada desde "+pNumeracion.numeracion_inicial+" hasta " +pNumeracion.numeracion_inicial,alignment: 'center'},
      {columns: [
        {
          ul: [
            {text: "Señor:(es): ", listType: 'none'},
            {text: "Dirección: ", listType: 'none'},
            {text: ["Tel.: ", "    NIT. "] , listType: 'none'}
          ]
        },
        {
          margin:[85,0,0,0],
          table:{
            body: [
              ["Nota de crédito"],
              ["NTCR. " + pNumeracion.numeracion_actual],
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
  var savePath = "./public/pdf/notaCredito/"
  var today = new Date()
  var timestamp = today.getDate()+""+today.getMonth()+""+today.getFullYear()+""+today.getHours()+""+today.getMinutes()
  var filename = factura.documento_usuario + "_" + timestamp + ".pdf"
  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream(savePath+filename))
  .on('error', (err) => {
    console.log(err)
  });
  pdfDoc.end();
  return savePath+filename
}

module.exports = PDFMaker;