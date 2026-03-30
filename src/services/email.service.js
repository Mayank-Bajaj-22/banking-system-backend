import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const registrationMail = async(to, name) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject:"Account creation mail",
        html: `<b>${name}, your account has been created successfully. </b>`
    })
}

export { registrationMail }