var express = require('express');
var userRouter1 = express.Router();

var userService = require("../service/userService.js");

/**
* User registration
*/
userRouter1.post('/create', function (request, response, next) {
    userService.registerUser(request, response, next);
});

module.exports = userRouter1;