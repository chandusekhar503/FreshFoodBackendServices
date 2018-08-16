var Promise = require('promise');
var userModel = require("../models/userModel.js");

exports.getUserByMobileNumber = function (mobileNumber) {
    console.log('getUserByMobileNumber');
    return new Promise(function (success, error) {
        userModel.findOne({ "userMobileNumber": mobileNumber }, function (err, user) {
            if (err) {
                console.log('Got error in  getUserByMobileNumber: ' + err);
                return error(err);
            }
            return success(user);
        });
    });
}

exports.saveUser = function (user) {
    console.log('saveUser');
    return new Promise(function (onSuccess, onFail) {
        user.save().then(item => {
            return onSuccess(item);
          }).catch(err => {
            console.log("Error Occured while saving user "+err);
            return onFail(item);
          });
    });
}