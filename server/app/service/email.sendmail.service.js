"use strict";

const nodemailer = require("nodemailer");
const logger = require("../../logger");
const fs = require('fs');
const path = require('path');
const hogan = require('hogan.js');
const template = fs.readFileSync(path.join(__dirname, '../../templates/email/password_reset_email.template.html'), 'utf-8');
const compileTemplate = hogan.compile(template);

async function sendMalil(to, subject, text, data){
    try{
        const email_auth = {
            username:"1eba44e6109647",
            password:"4d78c7738c6fcc"
        }
        const transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                secure: false,
                auth: {
                    user: email_auth.username,
                    pass: email_auth.password,
                },
            });
        await transporter.sendMail({
                from: 'binarycodelabz@gmail.com',
                to: to,
                subject: subject,
                text: text,
                html: compileTemplate.render({name:data.name, link: data.forget_password_link}),
            }).then((data) => {
                logger.info(`password reset email send to -> ${to}`);
            }).error((err) => {
                logger.info(`password reset email send fail to -> ${to}`);
                logger.info(err)
            });
    }catch(error){

    }
}
module.exports = {
    sendMalil,
}
