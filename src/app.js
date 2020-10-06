var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var exampleRouter = require('./routes/example')

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', exampleRouter)

app.use(express.static(path.join(__dirname, 'public')));

// function to return the 404 message and error to client
app.get('*', function(req, res, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(error)
});

app.use(function(error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error : {
      message: error.message
    }
  });
  console.log("ERROR: ", error);
});

module.exports = app;
