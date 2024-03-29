const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const pug = require("pug");

const sendMail = async (formData) => {
  const transporter = nodemailer.createTransport(sgTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  }));

  //Renderizar el HTML del email desde un template pug
  const html = pug.renderFile(__dirname + `/../views/email/mensaje.pug`, {
    nombre: formData.nombre,
    email: formData.email,
    mensaje: formData.mensaje
  });

  const mailOptions = {
    from: `Mi Portafolio | ${formData.email}`,
    to: process.env.EMAIL_TO,
    subject: "Mensaje de Mi Portafolio",
    html: html
  }

  await transporter.sendMail(mailOptions)
}

module.exports = sendMail;