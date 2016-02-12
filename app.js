var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');

// Connect to the local MongoDB instance
// Note: if the db has never been created, it will be created upon this call.
mongoose.connect('mongodb://localhost/music_recommender');

// Pre-Load Schema
var Music = require('./models/musicModel');

// Routes
var routes = require('./routes/index');
var workouts = require('./routes/workouts');
var user = require('./routes/userRoutes');
var music = require('./routes/musicRoutes');

var app = express();

/**
* The file that Node.js uses to bootstrap the Express application.
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes);
app.get('/workouts', workouts.index);
app.get('/workouts/:id', workouts.show);
app.del('/workouts', workouts.delete);
app.post('/workouts', workouts.create);
app.put('/workouts', workouts.update);

app.get('/music', music.findAllMusic);
app.get('/user', user.findAllUsers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
