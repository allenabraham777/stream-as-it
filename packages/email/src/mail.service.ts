import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { EmailType } from './mail.types';
config();

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    async sendMail(data: EmailType) {
        await this.transporter.sendMail({
            from: process.env.FROM,
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html
        });
    }
}
