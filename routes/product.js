var express = require('express');
var productRouter = express.Router();
var productModel = require('../models/productModel.js');

productRouter.post('/create',function(request,respone,next){
    productModel.create(request.body,function(error,createdProduct){
        if(error)return next(error);
        respone.json(createdProduct);  
    });
});








module.exports = productRouter;