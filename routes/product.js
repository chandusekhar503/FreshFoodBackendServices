var express = require('express');
var productRouter = express.Router();
var productModel = require('../models/productModel.js');
var helper = require('../utility/helper.js');
var responseBuilder = require('../dto/responseBuilder');
var codeMsg = require('../enum/messagecode.js');
var mongoose = require('mongoose');

/**
 * Creating a product and emailing to registered email.
 */
productRouter.post('/create', function (request, response, next) {
    var query = {$and:[{createdBy:mongoose.Types.ObjectId(request.body.createdBy)},{ productName:request.body.productName}]};
    productModel.findOne(query, function (error, productDb) {
        console.log(productDb);
        if (productDb == null) {
            helper.getProductData(request, function (product) {
                product.save().then(item => {
                    var createProductResponse = responseBuilder.createProductResponse(item, codeMsg.CREATE_PRODUCT_SUCCESS);
                    response.status(200);
                    response.send(createProductResponse);
                }).catch(err => {
                    console.log(err)
                    var createProductResponse = responseBuilder.createProductResponse(null, codeMsg.CREATE_PRODUCT_FAILED);
                    response.status(500);
                    response.send(createProductResponse);
                });
            });
        } else {
            console.log("Product already exists" + request.body.productName);
            var createProductResponse = responseBuilder.createProductResponse(null, codeMsg.PRODUCT_ALREADY_EXISTS);
            response.status(500);
            response.send(createProductResponse);
        }
    });
});

productRouter.put('/update', function (request, response, next) {
    var productId = request.body.productId;
    productModel.findById({ "_id": productId }, function (error, productDb) {
        console.log(productDb);
        if (productDb != null) {
            helper.getUpdatedProductData(request, productDb, function (product) {
                console.log("latest " + product);
                productModel.findOneAndUpdate({ _id: product._id }, product, function (error, item) {
                    var updateProductResponse = null;
                    if (error) {
                        console.log(error);
                        updateProductResponse = responseBuilder.createProductResponse(null, codeMsg.UPDATE_PRODUCT_FAILED);
                        response.status(500);
                    } else {
                        updateProductResponse = responseBuilder.createProductResponse(item, codeMsg.UPDATE_PRODUCT_SUCCESS);
                        response.status(200);
                    }
                    response.send(updateProductResponse);
                });
            });
        } else {
            console.log("Product already exists" + request.body.productName);
            var createProductResponse = responseBuilder.createProductResponse(null, codeMsg.PRODUCT_DOES_NOT_EXISTS);
            response.status(500);
            response.send(createProductResponse);
        }
    });
});


/**
 * get All categories
 */
productRouter.get('/', function (request, response, next) {
    var categoryType = request.query.categoryType;
    if (categoryType != null && categoryType != " ") {
        productModel.find({ "productCategory": categoryType }, function (error, productList) {
            if (error) next(error);
            var res = responseBuilder.getProductResponse(productList);
            response.status(200)
            response.send(res);
        });
    } else {
        productModel.find(function (error, productList) {
            if (error) next(error);
            var res = responseBuilder.getProductResponse(productList);
            response.status(200);
            response.send(res);
        });
    }
});

productRouter.delete('/remove',function(request,response,next){
   var query = {$and:[{createdBy:mongoose.Types.ObjectId(request.query.userId)},{ _id:mongoose.Types.ObjectId(request.query.productId)}]};
    productModel.findOne(query,function(error,product){
        if(error){
            console.log(error);
            next(error);
        }
        var res = null;
        if(product != null){
            product.remove();
            response.status(200);
            res = responseBuilder.createProductResponse(product, codeMsg.DELETE_PRODUCT_SUCCESS);
            response.send(res);
        }else{
            console.log('Product does not exists');
             response.status(500)
             res = responseBuilder.createProductResponse(product, codeMsg.DELETE_PRODUCT_FAILED);
             response.send(res);
        }
        
    });
});

module.exports = productRouter;