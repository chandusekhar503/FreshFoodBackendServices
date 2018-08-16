var userRepository = require("../dbrepo/userRepository.js");
var responseBuilder = require('../dto/responseBuilder');
var helper = require('../utility/helper.js');

exports.registerUser = function (request, response, next) {
    console.log('registerUser');
    var userPromiseData = userRepository.getUserByMobileNumber(request.body.userMobileNumber);
    userPromiseData.then(function (user) {
        console.log('User Details: ' + user);
        if (user == null) {
            helper.getUserData(request, 'createdby', 'roleId', function (userd) {
                console.log('User Details: ' + userd);
                var saveUserPromise = userRepository.saveUser(userd);
                saveUserPromise.then(function (data) {
                    var createUserResponse = responseBuilder.createUserResponse(data);
                    response.status(200);
                    response.send(createUserResponse);
                }, function (error) {
                    console.log(error);
                    var createUserResponse = responseBuilder.createUserResponse(null);
                    response.status(500);
                    response.send(createUserResponse);
                });
            });
        } else {
            console.log("User already exists with mobile number: " + request.body.userMobileNumber);
            var createUserResponse = responseBuilder.createUserResponse(null);
            response.status(500);
            response.send(createUserResponse);
        }
    }, function (error) {
        console.log("Error occured while creating user: " + request.body.userMobileNumber + "with reason" + error);
        var createUserResponse = responseBuilder.createUserResponse(null);
        response.status(500);
        response.send(createUserResponse);
    });
};