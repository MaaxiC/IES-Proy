import nodemailer from "nodemailer";
import { config } from "../config/config.js";

export class MailingService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
            user: config.mailing.EMAIL,
            pass: config.mailing.EMAIL_PASS,
            },
        });
    }

    sendMail = async ({from, to, subject, html, attachments=[]}) => {
        await this.transporter.sendMail({
            from,
            to,
            subject,
            html,
            attachments
        })
    }
}