const nodeMailer = require("nodemailer")

exports.userAlertMails = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 2525,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD  //be careful it is pass not password
        },
    })

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.html,
    }

    //3. Send email
    await transporter.sendMail(mailOptions)
}