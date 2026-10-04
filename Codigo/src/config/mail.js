const nodemailer = require('nodemailer');
// En desarrollo los mensajes se generan localmente, sin enviar correos.
module.exports = process.env.MAIL_ENABLED === 'true'
 ? nodemailer.createTransport({service:'gmail',auth:{user:process.env.MAIL_USER,pass:process.env.MAIL_PASSWORD}})
 : nodemailer.createTransport({jsonTransport:true});
module.exports.use('compile', (mail, done) => { if(process.env.MAIL_USER) mail.data.from = process.env.MAIL_USER; done(); });
