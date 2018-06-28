var mongodb = require('mongodb').MongoClient;
const CircularJSON = require('circular-json');
var mongoUrl = 'mongodb://localhost';
var dbName = 'chandu';
var clientDb;
var userModel = require('../models/userModel.js');
var roleModel = require('../models/userModel.js');

exports.connect = function (callback) {
  mongodb.connect(mongoUrl, function (err, database) {
    if (err) throw err;
    clientDb = database;
    console.log("database: " + database);
    callback();
  });
}

exports.signIn = function (username, password, signInCallBack) {
  const mydb = clientDb.db(dbName);
  var query = { $and: [{ userMobileNumber: username }, { userPassword: password }] };
  mydb.collection("users").findOne(query, function (error, result) {
    if (error) throw error;
    console.log('result: ' + result);
    console.log(JSON.stringify(result));
    signInCallBack(result);
    clientDb.close();
  });
}

exports.getRoleData = function (roleId, getRoleByIdCallback) {
  const mydb = clientDb.db(dbName);
  var query = { _id: roleId };
  mydb.collection("roles").findOne(query, function (error, result) {
    if (error) throw error;
    console.log('result: ' + result);
    console.log(JSON.stringify(result));
    getRoleByIdCallback(result);
    clientDb.close();
  });
}