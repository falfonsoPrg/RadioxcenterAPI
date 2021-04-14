const nodemailer = require('nodemailer');

Mailer = {}

Mailer.sendEmail = (correo,factura) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PSWGMAIL
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: correo,
        subject: 'Copia de facturación Radioxenter LTDA',
        text: 'Muchas gracias por adquirir nuestros servicios, a continuación encontrará una copia de su factura!',
        attachments:[
            {
                filename: "Factura_RX.pdf",
                path: factura.ruta_factura
            }
        ]
    };
    var rta = true;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            rta = false
        } else {
            console.log('Email sent: ' + info.response);
            rta = true
        }
    })
    return rta
}

Mailer.sendEmailSatisfaccion = (correo) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PSWGMAIL
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: correo,
        subject: 'Encuesta de Satisfacción Radioxenter LTDA',
        text: 'Muchas gracias por adquirir nuestros servicios, a continuación le solicitamos cordialmente nos colabore rellendando nuestra encuesta de satisfacción accediendo al siguiente formulario: ',
    };
    var rta = true;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            rta = false
        } else {
            console.log('Email sent: ' + info.response);
            rta = true
        }
    })
    return rta
}

module.exports = Mailer