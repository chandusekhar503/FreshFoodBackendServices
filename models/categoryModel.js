var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
 categoryName:{type: String,minlength:[3,'Product name should be more than 3'],maxlength:[30,'Product name should be less than 30']},
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Category', categorySchema);