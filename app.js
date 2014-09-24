var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware =require('less-middleware');
var routes = require('./routes/index');
 console.log('running!!!');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//app.use(express.bodyParser());

app.use(cookieParser());
//app.use(require('less-middleware')(path.join(__dirname, 'public')));

var lessMiddleware = require('less-middleware');

app.use(lessMiddleware({ src: __dirname + '/less', dest: __dirname + '/public/stylesheets' ,force:true, prefix: "/stylesheets"}));
app.use(express.static(__dirname + '/public')); 
//app.use(express.bodyParser());

// var lessMiddleware = require('less-middleware');

app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use('/', routes);
 
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});




/// error handlers

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
