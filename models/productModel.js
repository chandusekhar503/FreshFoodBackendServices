var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
 productName:{type: String,minlength:[3,'Product name should be more than 3'],maxlength:[30,'Product name should be less than 30']},
 productPrice: Number,
 productMerchantId: String,
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Products', productSchema);