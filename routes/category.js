var express = require('express');
var categoryRouter = express.Router();
var categoryModel = require('../models/categoryModel.js');
var responseBuilder = require('../dto/responseBuilder');

/**
 * Added Category for products
 */
categoryRouter.post('/add', function (request, response, next) {
    var categoryName = request.body.categoryName;
    categoryModel.findOne({ "categoryName": categoryName }, function (error, category) {
        if (error) return next(error);
        if (category != null) {
            console.log("Category is already exists.");
            response.status(500);
            response.send("Category already exists.");
        } else {
            console.log("Category does not exists.");
            categoryModel.create(request.body, function (error, categoryDb) {
                if (error) return next(error);
                response.status(200);
                response.send("Category Added.");
            });
        }
    });
});

/**
 * get All categories
 */
categoryRouter.get('/', function (request, response, next) {
    categoryModel.find(function (error,categoryList) {
        if(error)next(error);
           var res = responseBuilder.getCategoryResponse(categoryList);
           response.status(200)
           response.send(res);
    });
});



//categoryRouter.post('/edit', function (request, response, next) {});

//categoryRouter.post('/delete', function (request, response, next) {});

module.exports = categoryRouter;