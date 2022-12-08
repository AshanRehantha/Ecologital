"use strict";

const api_key = '5cb150abfa4a94f38c3a44c000d5f052-8845d1b1-4defee0c';
const domain = 'sandbox4928fa99dcdb4acfb6753ca48497cc71.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


async function sendMailMailGun(){
    const data = {
        from: 'Mailgun Sandbox <postmaster@sandbox4928fa99dcdb4acfb6753ca48497cc71.mailgun.org>',
        to: 'iashanrehantha@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomeness!'
        };
    await mailgun.messages().send(data).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = {
    sendMailMailGun
}