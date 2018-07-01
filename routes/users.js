var express = require('express');
var userRouter = express.Router();
var database = require('../database/database.js');
var responseBuilder = require('../dto/responseBuilder');
var helper = require('../utility/helper.js');
var email = require('../utility/email.js');
var userModel = require("../models/userModel.js")

/* GET users listing. */
userRouter.get('/', function (request, response, next) {
  response.send('respond with a resource');
});

userRouter.post('/create', function (request, response, next) {
  helper.getUserData(request, 'createdby', 'roleId', function (user) {
    user.save().then(item => {
      
      var mailOptions = {
        from: 'mentipoorna@gmail.com',
        to: 'chandusekhar503@gmail.com',
        subject: 'Verify your Email',
        text: 'This is smaple email Activation link!'
      };
      email.sendEmailActivationLink(mailOptions);
      var createUserResponse = responseBuilder.createUserResponse(item);
      response.status(200);
      response.send(createUserResponse);
    }).catch(err => {
      console.log(err);
      var createUserResponse = responseBuilder.createUserResponse(null);
      response.status(500);
      response.send(createUserResponse);
    });
  });
  /*userModel.create(request.body, function (error, createdUser) {
    if (error) return next(error);
    response.json(createdUser);
  });*/
});

userRouter.get('/login', function (request, response, next) {
  var username = request.query.username;
  var password = request.query.password;
  database.connect(function () {
    database.signIn(username, password, function signInCallBack(userResult) {
      if (userResult != null) {
        database.getRoleData(userResult.userRoleId, function getRoleByIdCallback(roleResult) {
          var loginResponse = responseBuilder.getLoginResponse(userResult, roleResult);
          response.status(200);
          response.send(loginResponse);
        });
      } else {
        response.status(500);
        var loginResponse = responseBuilder.getLoginResponse(null, null)
        response.send(loginResponse);
      }
    });
  });
});

module.exports = userRouter;