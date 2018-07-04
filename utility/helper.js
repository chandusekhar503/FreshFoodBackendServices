var express = require('express');
var userModel = require("../models/userModel.js")

exports.getUserData = function (request,otherCreatedBy,otherRoleId,getUserDataCallback) {
    console.log('dscasdvkjabsdvkhjv');
    var user = new userModel();
    if (request.body.userType == 'Customer') {
        user = this.createUser(request, '5b32e78da814c74e74ed3865', '5b35387ca20d341b91d79996');
    } else if (request.body.userType == 'Merchant') {
        user = this.createUser(request, '5b32e78da814c74e74ed3865', '5b353887a20d341b91d79997');
    } else if (request.body.userType == 'Others') {
        user = this.createUser(request, otherCreatedBy, otherRoleId);
    }
     getUserDataCallback(user);
};

exports.createUser = function (request, createdBy, roleId) {
    var user = new userModel({
        userFirstName: request.body.userFirstName,
        userLastName: request.body.userLastName,
        userPassword: request.body.userPassword,
        userPassword: request.body.userPassword,
        userMobileNumber: request.body.userMobileNumber,
        userEmail: request.body.userEmail,
        userType: request.body.userType,
        userStatus:'InActive',
        userRoleId: roleId,
        createdBy: createdBy
    });
    return user;
};