"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config()
export const mailSend= async (email,token)=> {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    service:'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SENDER_EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
    await transporter.sendMail({
    from: process.env.SENDER_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Link for reset password", // Subject line
    html:  `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:5000/${token}">click here</a></h1>`
  });
}

export const mail= async (email)=> {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    service:'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SENDER_EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
    await transporter.sendMail({
    from: process.env.SENDER_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Rabbitmq 2", // Subject line
    html:  `<h1>Hello,<br><br>User Registration successful!</h1>`
  });
}