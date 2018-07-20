var express = require('express');
var productRouter = express.Router();
var productModel = require('../models/productModel.js');
var helper = require('../utility/helper.js');
var responseBuilder = require('../dto/responseBuilder');
var codeMsg = require('../enum/messagecode.js');

/*
productRouter.post('/create', function (request, respone, next) {
    productModel.create(request.body, function (error, createdProduct) {
        if (error) return next(error);
        respone.json(createdProduct);
    });
});
*/

/**
 * Creating a product and emailing to registered email.
 */
productRouter.post('/create', function (request, response, next) {
    var query = { $and: [{ productMerchantId: { $regex: request.body.productMerchantId, $options: 'i' } }, { productName: { $regex: request.body.productName, $options: 'i' } }] }
    productModel.findOne(query, function (error, productDb) {
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

productRouter.post('/update', function (request, response, next) {
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
    if (categoryType != null && categoryType != "") {
        productModel.find({ "productCategory": categoryType }, function (error, categoryList) {
            if (error) next(error);
            var res = responseBuilder.getProductResponse(categoryList);
            response.status(200)
            response.send(res);
        });
    } else {
        productModel.find(function (error, categoryList) {
            if (error) next(error);
            var res = responseBuilder.getProductResponse(categoryList);
            response.status(200)
            response.send(res);
        });
    }
});

module.exports = productRouter;