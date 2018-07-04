var express = require('express');
var codeMsg = require('../enum/messagecode.js');
var email = require('../utility/email.js');

exports.getLoginResponse = function (userResult, roleResult) {
    var userDetails = null;
    var responseHeader = null;
    if (userResult != null) {
        userDetails = new Object();
        switch (userResult.userStatus) {
            case 'Active':
                responseHeader = this.getResponseHeader(codeMsg.LOGIN_SUCCESS);
                userDetails.id = userResult._id;
                userDetails.firstName = userResult.userFirstName;
                userDetails.lastName = userResult.userLastName;
                userDetails.AssignedRoles = roleResult.assignedRoles;
                break;
            case 'InActive':
                responseHeader = this.getResponseHeader(codeMsg.EMAIL_NOT_VEIFIED);
                userDetails = null;
                break;
            case 'Blocked':
                responseHeader = this.getResponseHeader(codeMsg.USER_BLOCKED);
                userDetails.id = userResult._id;
                userDetails.firstName = userResult.userFirstName;
                userDetails.lastName = userResult.userLastName;
                break;
            default:
                break;
        }
    } else {
        responseHeader = this.getResponseHeader(codeMsg.LOGIN_FAILED);
    }

    var loginResponse = new Object();
    loginResponse.responseHeader = responseHeader;
    loginResponse.userDetails = userDetails;
    return loginResponse;
};

exports.getResponseHeader = function (rootObject) {
    var responseHeader = new Object();
    responseHeader.message = rootObject.code;
    responseHeader.code = rootObject.message;
    return responseHeader;
}

exports.createUserResponse = function (userResult) {
    var createUserResponse = new Object();
    var userDetails = null;
    var responseHeader = null;
    if (userResult != null) {
        userDetails = new Object();
        responseHeader = this.getResponseHeader(codeMsg.CREATE_USER_SUCCESS);
        userDetails.id = userResult._id;
        userDetails.firstName = userResult.userFirstName;
        userDetails.lastName = userResult.userLastName;
        email.sendEmailActivationLink(userResult.userEmail,userResult._id);
    } else {
        responseHeader = this.getResponseHeader(codeMsg.CREATE_USER_FAILED);
    }
    var createUserResponse = new Object();
    createUserResponse.responseHeader = responseHeader;
    createUserResponse.userDetails = userDetails;
    return createUserResponse;
};

