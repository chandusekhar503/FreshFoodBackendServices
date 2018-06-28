var express = require('express');
var roleRouter = express.Router();
var roleModel = require('../models/roleModel.js');
var database = require('../database/database.js');


//save role
roleRouter.post('/create',function(request,response,next){
roleModel.create(request.body,function(error,createdRole){
    if(error)return next(error);
    response.json(createdRole);
  });
});
module.exports = roleRouter;