var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var validator = require('express-validator');
var bodyParser = require('body-parser');

//MONGO Database connection
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://chandu:qwerty12@ds113122.mlab.com:13122/freshfood')
  .then(() => console.log('mongo database connection succesful'))
  .catch((err) => console.error(err));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var roleRouter = require('./routes/role');
var categoryRouter = require('./routes/category');
var userRouter1 = require('./controllers/userController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles', roleRouter);
app.use('/products', productRouter);
app.use('/category', categoryRouter);
app.use('/v1/users', userRouter1);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500);
  if (err instanceof Error) {
    res.send({
      status: "error",
      message: err.message
    });
  } else {
    res.send({
      status: err.status,
      message: err.message,
      errors: err.errors
    });
  }


});

app.use(validator());

module.exports = app;
