var express = require('express');
var userModel = require("../models/userModel.js")

exports.validateCreateUserRequest = function (request) {
    var isValidUser = false;

    var mobileNumber = request.body.userMobileNumber;

         var user =userModel.findOne({ "userMobileNumber": mobileNumber });
        if (user != null) {
            console.log("User already exists with mobile number:" + mobileNumber);
            return false;
        } else {
            console.log("User does not exists with mobile number:" + mobileNumber);
            return true;
        }
 

    //isValidUser = this.validateUserAlreadyExistsWithMobileNumber(request.body.userMobileNumber);
    //return isValidUser;
}

exports.validateUserAlreadyExistsWithMobileNumber = function (mobileNumber) {
    console.log("Inside validateUserAlreadyExistsWithMobileNumber " + mobileNumber);
    
}