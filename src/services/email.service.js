import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

// simple email after user register
// const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// const registrationMail = async(to, name) => {
//     await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to,
//         subject:"Account creation mail",
//         html: `<b>${name}, your account has been created successfully. </b>`
//     })
// }

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
})

transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
})

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Banking System" <${process.env.EMAIL_USER}>`, // sender address
            to, 
            subject,
            text,
            html
        })

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

const registrationMail = async(to,name) => {
    const subject = 'BANKING SYSTEM ACCOUNT CREATION MAIL'
    const text = `Hello ${name},\n\nThank you for registering at Banking System.`
    const html = `<p>Hello ${name},\n\nThank you for registering at Banking System.</p>`
    await sendEmail(to, subject, text, html);
}

export { registrationMail }