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
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        attachments:[
            {
                filename: "factura.pdf",
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
    console.log(rta)
    return rta
}

module.exports = Mailer