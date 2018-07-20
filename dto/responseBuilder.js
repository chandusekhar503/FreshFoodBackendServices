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
    responseHeader.message = rootObject.message;
    responseHeader.code = rootObject.code;
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
        email.sendEmailActivationLink(userResult.userEmail, userResult._id);
    } else {
        responseHeader = this.getResponseHeader(codeMsg.CREATE_USER_FAILED);
    }
    var createUserResponse = new Object();
    createUserResponse.responseHeader = responseHeader;
    createUserResponse.userDetails = userDetails;
    return createUserResponse;
};

exports.getCategoryResponse = function (categoryListDb) {
    var categoryResponse = new Object();
    var responseHeader = null;
    if (categoryListDb != null && categoryListDb.length > 0) {
        responseHeader = this.getResponseHeader(codeMsg.GET_CATEGORY_SUCCESS);
        var categoryList = new Array();
        for (var i = 0; i < categoryListDb.length; i++) {
            var categoryDb = categoryListDb[i];
            var category = new Object();
            category.categoryId = categoryDb._id;
            category.categoryName = categoryDb.categoryName;
            categoryList.push(category);
        }
        categoryResponse.categoryList = categoryList;
    } else {
        responseHeader = this.getResponseHeader(codeMsg.GET_CATEGORY_EMPTY);
    }
    categoryResponse.responseHeader = responseHeader;
    return categoryResponse;
};

exports.getProductResponse = function (productListDb) {
    var productResponse = new Object();
    var responseHeader = null;
    if (productListDb != null && productListDb.length > 0) {
        responseHeader = this.getResponseHeader(codeMsg.GET_PRODUCT_SUCCESS);
        var productList = new Array();
        for (var i = 0; i < productListDb.length; i++) {
            var productDb = productListDb[i];
            var product = new Object();
            product.productId = productDb._id;
            product.productName = productDb.productName;
            product.productQuantity = productDb.productQuantity;
            product.productPrice = productDb.productPrice;
            productList.push(product);
        }
        productResponse.productList = productList;
    } else {
        responseHeader = this.getResponseHeader(codeMsg.PRODUCT_EMPTY);
    }
    productResponse.responseHeader = responseHeader;
    return productResponse;
};

exports.createProductResponse = function (product, codeMsg) {
    var productDetails = null;
    var responseHeader = null;
    if (product != null) {
        productDetails = new Object();
        responseHeader = this.getResponseHeader(codeMsg);
        productDetails.productId = product._id;
        productDetails.productName = product.productName;
    } else {
        responseHeader = this.getResponseHeader(codeMsg);
    }
    var createProductResponse = new Object();
    createProductResponse.responseHeader = responseHeader;
    if (productDetails != null) createProductResponse.productDetails = productDetails;
    return createProductResponse;
};