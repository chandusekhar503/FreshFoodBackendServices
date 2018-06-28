var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
 roleName:{type: String,minlength:[3,'role name should be more than 3'],maxlength:[30,'user first name should be less than 30'],required:true},
 roleData: {type: String,required:true},
 createdBy: {type: mongoose.Schema.Types.ObjectId,ref:"Users"},
 createdAt: {type: Date, default: Date.now},
 updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Roles', roleSchema);


