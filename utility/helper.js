var express = require('express');
var userModel = require("../models/userModel.js");
var productModel = require('../models/productModel.js');
var config = require('../config.js');
var usertype = require('../enum//usertypes.js');

exports.getUserData = function (request, otherCreatedBy, otherRoleId, getUserDataCallback) {
    console.log('dscasdvkjabsdvkhjv');
    var user = new userModel();
    if (request.body.userType == usertype.value.CUSTOMER) {
        user = this.createUser(request, config.default.customerCreatedBy, config.default.customerDefaultRole);
    } else if (request.body.userType == usertype.value.MERCHANT) {
        user = this.createUser(request, config.default.merchantCreatedBy, config.default.merchantDefaultRole);
    } else if (request.body.userType == usertype.value.OTHERS) {
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
        userStatus: 'InActive',
        userRoleId: roleId,
        createdBy: createdBy
    });
    return user;
};

exports.getProductData = function (request, getProductDataCallback) {
    var product = this.createProduct(request);
    getProductDataCallback(product);
};

exports.getUpdatedProductData = function (request, oldProduct, getUpdatedProductDataCallback) {
    var updatedProduct = this.createUpdatedProduct(request, oldProduct);
    getUpdatedProductDataCallback(updatedProduct);
};

exports.createUpdatedProduct = function (request, oldProduct) {
        oldProduct.productCategory = request.body.productCategory,
        oldProduct.productName = request.body.productName,
        oldProduct.productQuantity = request.body.productQuantity,
        oldProduct.productPrice = request.body.productPrice,
        oldProduct.productMerchantId = request.body.productMerchantId,
        oldProduct.updateAt = Date.now()
    return oldProduct;
};

exports.createProduct = function (request) {
    var product = new productModel({
        productCategory: request.body.productCategory,
        productName: request.body.productName,
        productQuantity: request.body.productQuantity,
        productPrice: request.body.productPrice,
        productMerchantId: request.body.productMerchantId
    });
    return product;
};