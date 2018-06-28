var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
 userFirstName:{type: String,minlength:[3,'user first name should be more than 3'],maxlength:[30,'user first name should be less than 30'],required:true},
 userLastName: {type: String,minlength:[3,'user last name should be more than 3'],maxlength:[30,'user last name should be less than 30'],required:true},
 userPassword: {type: String,required:true,minlength:[8,'password should contain more than 8 characters'],required:true}, 
 userEmail: String,
 userMobileNumber: {type: String,required:true},
 userType: {type: String,required:true},
 userRoleId: {type: mongoose.Schema.Types.ObjectId,ref:"Roles"}, 
 createdBy: {type: mongoose.Schema.Types.ObjectId,ref:"Users"},
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', userSchema);