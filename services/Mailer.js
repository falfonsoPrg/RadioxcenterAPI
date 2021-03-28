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

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false
        } else {
            console.log('Email sent: ' + info.response);
            return true
        }
    })
}

module.exports = Mailer