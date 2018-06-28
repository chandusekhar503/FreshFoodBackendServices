var express = require('express');
const CircularJSON = require('circular-json');
var userRouter = express.Router();
var userModel = require('../models/userModel.js');
var database = require('../database/database.js');
var login = require('../dto/user/loginResponse.js');

/* GET users listing. */
userRouter.get('/', function (request, response, next) {
  response.send('respond with a resource');
});

userRouter.post('/create', function (request, response, next) {
  userModel.create(request.body, function (error, createdUser) {
    if (error) return next(error);
    response.json(createdUser);
  });
});

userRouter.get('/login', function (request, response, next) {
  var username = request.query.username;
  var password = request.query.password;
  database.connect(function () {
    database.signIn(username, password, function signInCallBack(userResult) {
      if (userResult != null) {
        database.getRoleData(userResult.userRoleId, function getRoleByIdCallback(roleResult) {
          var loginResponse = login.getLoginResponse(userResult, roleResult);
          response.status(200);
          response.send(loginResponse);
        });
      } else {
        response.status(500);
        var loginResponse = login.getLoginResponse(null, null);
        response.send(loginResponse);
      }
    });
  });
});

module.exports = userRouter;