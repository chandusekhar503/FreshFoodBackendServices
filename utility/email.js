var express = require('express');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mentipoorna@gmail.com',
      pass: 'Poorna@4321'
    }
  });
  
  var mailOptions = {
    from: 'mentipoorna@gmail.com',
    to: 'chandusekhar503@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  exports.sendEmailActivationLink =function(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }
  