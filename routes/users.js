var express = require('express');
const CircularJSON = require('circular-json');
var userRouter = express.Router();
var userModel = require('../models/userModel.js');
var database = require('../database/database.js');
var login = require('../dto/user/loginResponse.js');

/* GET users listing. */
userRouter.get('/', function(request, response, next) {
  response.send('respond with a resource');
});

userRouter.post('/create',function(request, response,next){
  userModel.create(request.body,function(error,createdUser){
   if(error)return next(error);
   response.json(createdUser);
  });
});


userRouter.get('/login',function(request, response,next){
   var username = request.query.username;
   var password = request.query.password;
   database.connect(function(){
    database.signIn(username,password,function signInCallBack(result){
      //console.log(JSON.stringify(result.Roles.roleData));
      if(result != null){
       response.status(200);
      }else{
        response.status(500);
      }
      var loginResponse = login.getLoginResponse(result);
      response.send(loginResponse);
    });
});
});

module.exports = userRouter;