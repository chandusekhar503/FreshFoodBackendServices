var mongodb = require('mongodb').MongoClient;
const CircularJSON = require('circular-json');
var mongoUrl = 'mongodb://localhost';
var dbName = 'chandu';
var clientDb;

exports.connect = function(callback) {
  mongodb.connect(mongoUrl, function(err, database) {
    if( err ) throw err;
    clientDb = database;
    console.log("database: "+database);
    callback();
  });
}

exports.signIn = function(username,password,signInCallBack){
  const mydb = clientDb.db(dbName);
  var query = { $and:[{userMobileNumber: username}, {userPassword: password}]};
  mydb.collection("users").findOne(query,function(err, result) {
    if (err) throw err;
    console.log('result: '+result);
    signInCallBack(result);
    clientDb.close();
  });
}

exports.createRole