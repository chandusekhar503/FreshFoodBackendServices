var express = require('express');
var userRouter = express.Router();
var database = require('../database/database.js');
var responseBuilder = require('../dto/responseBuilder');
var helper = require('../utility/helper.js');
var validationhelper = require('../utility/validationhelper.js');
var email = require('../utility/email.js');
var userModel = require("../models/userModel.js");
var roleModel = require("../models/roleModel.js")


/* GET users listing. */
userRouter.get('/', function (request, response, next) {
  response.send('respond with a resource');
});

/**
 * User registration
 */
userRouter.post('/create', function (request, response, next) {
  userModel.findOne({ "userMobileNumber": request.body.userMobileNumber }, function (error, user) {
    if (user == null) {
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
    } else {
      console.log("User already exists with mobile number: "+request.body.userMobileNumber);
      var createUserResponse = responseBuilder.createUserResponse(null);
      response.status(500);
      response.send(createUserResponse);
    }
  });
});


/**
 * Send Email to User for re-verification, if email is not delivered at the time of registration.
 */
userRouter.get('/send/email', function (request, response, next) {
  console.log("Email verification link requested for user: " + request.query.mobileNumber);
  var mobileNumber = request.query.mobileNumber;
  userModel.findOne({ "userMobileNumber": mobileNumber }, function (error, user) {
    if (error) throw error;
    if (user !== null) {
      console.log("user status: " + user.userStatus);
      if (user.userStatus == "InActive") {
        email.sendEmailActivationLink(user.userEmail, user._id);
        response.status(200);
        response.send("Verification email sent successfully, please check your email");
      } else {
        response.status(500);
        response.send("User already activated, Please login");
      }
    } else {
      response.status(500);
      response.send("User does not exists, Please register");
    }
  });
});

//http://localhost:3000/user/verify/email?id=5b391265c8a7ed21c3847de4

/**
 * Will verify email using userId
 */
userRouter.get('/verify/email', function (request, response, next) {
  console.log("verifing user with emailId: " + request.query.userId);
  var userId = request.query.userId;
  userModel.findByIdAndUpdate(userId, { userStatus: "Active" }, function (error, user) {
    if (error) throw error;
    if (user != null) {
      response.status(200);
      response.send("User Activated.");
    } else {
      response.status(500);
      response.send("User activation failed");
    }
  });
});

/**
 * sigin user
 */
userRouter.get('/login', function (request, response, next) {
  var username = request.query.username;
  var password = request.query.password;
  var query = {$and:[{ "userMobileNumber":username},{'userPassword':password}]};
  userModel.findOne(query, function (error, userResult) {
      if (userResult != null) {
        roleModel.findById({ "_id":userResult.userRoleId}, function (error,roleResult) {
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

module.exports = userRouter;