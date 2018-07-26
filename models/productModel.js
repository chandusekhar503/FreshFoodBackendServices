var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    productName: { type: String, minlength: [3, 'Product name should be more than 3'], maxlength: [30, 'Product name should be less than 30'] },
    productPrice: Number,
    productImage:String,
    productQuantity:String,
    productCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

mongoose.set('debug', true);
module.exports = mongoose.model('Products', productSchema);