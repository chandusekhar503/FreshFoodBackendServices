var express = require('express');
var nodemailer = require('nodemailer');
var config = require('../config.js');

var transporter = nodemailer.createTransport({
  service: config.email.type,
  auth: {
    user: config.email.id,
    pass: config.email.password
  }
});

exports.sendEmailActivationLink = function (toEmail, userId) {
  console.log(config.email.id);
  console.log(config.email.password);
  console.log(config.email.link);

  var htmlContent = '<html><body><h2>Email verification</h2><a href=' + config.email.link + userId + '>Click here to verify email</a></body</html>';
  var emailSubject = config.email.subject;
  var mailOptions = {
    from: config.email.emailId,
    to: toEmail,
    subject: emailSubject,
    html: htmlContent
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
