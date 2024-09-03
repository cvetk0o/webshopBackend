import { SentMessageInfo } from "nodemailer"
import mailClient from "../../config/mail"
import ISendEmail from "./types"

const SERVICE_EMAIL = process.env.SERVICE_EMAIL || 'petar.ponjevic@gmail.com'

function sendEmail({to, subject, text = '', html }: ISendEmail) {
   
    const mailData = {
        from: SERVICE_EMAIL,  // sender address
        to,
        subject,
        text,
        html
      };


    mailClient.sendMail(mailData, (err: Error | null, info: SentMessageInfo)=>{
        if(err) {
            console.error('Error sending email: ', err.message)
            throw err
        }
    })
}


export default {
    sendEmail
}