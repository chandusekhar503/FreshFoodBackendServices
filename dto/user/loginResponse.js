exports.getLoginResponse = function (result) {
    var userDetails = null;
    var responseHeader = new Object();
    if (result != null) {
        responseHeader.message = "Login Success";
        responseHeader.code = 0;

        userDetails = new Object();
        userDetails.id = result._id;
        userDetails.firstName = result.userFirstName;
        userDetails.lastName = result.userLastName;
    } else {
        responseHeader.message = "Login failed! Please try again...";
        responseHeader.code = 5001;
    }


    var loginResponse = new Object();
    loginResponse.responseHeader = responseHeader;
    loginResponse.userDetails = userDetails;
    return loginResponse;
};
