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
      var createUserResponse = responseBuilder.createUserResponse(item);
      response.status(200);
      response.send(createUserResponse);
    }).catch(err => {
      console.log(err)
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


/* GET users listing. */
userRouter.get('/send/email', function (request, response, next) {
  console.log("Email verification link requested for user: "+request.query.userId);
  var userId = request.query.userId;
  userModel.findById(userId,function(error, user){
    if (error) throw error;
    console.log(user);
    email.sendEmailActivationLink(user.userEmail,user._id);  
    response.status(200);
    response.send("Verification email sent successfully, please check your email");
  });
});

//http://localhost:3000/user/verify/email?id=5b391265c8a7ed21c3847de4

/* GET users listing. */
userRouter.get('/verify/email', function (request, response, next) {
  console.log("verifing user with emailId: "+request.query.userId);
  var userId = request.query.userId;
  userModel.findByIdAndUpdate(userId,{userStatus:"Active"},function(error, user){
    if (error) throw error;
    console.log(user);  
    response.status(200);
    response.send("User Activated.");
  });
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