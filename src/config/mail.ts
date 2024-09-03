import nodemailer from 'nodemailer'
const SERVICE_EMAIL = process.env.SERVICE_EMAIL || 'petar.ponjevic@gmail.com'
const SERVICE_EMAIL_PASSWORD = process.env.SERVICE_EMAIL_PASSWORD || ''

const mailClient = nodemailer.createTransport({
    port: 465,              
    host: "smtp.gmail.com",
       auth: {
            user: SERVICE_EMAIL,
            pass: SERVICE_EMAIL_PASSWORD,
         },
    secure: true,
})


export default mailClient