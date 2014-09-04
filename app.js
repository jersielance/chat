var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);

var app = express();

http.createServer(app).listen(config.get('port'), function() {
    log.info('Express server listening on port ' + config.get('port'));
});


// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
//var users = require('./routes/user');

app.use(favicon());
if(app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.use(function(req, res, next) {
   if(req.url == '/') {
    res.render('index', {})
   }
});

app.use(function(req, res) {
   res.send(404, "page not found!");
});

app.use(function (err, req, res, next) {
    if(app.get('env') == 'development') {
        var errorHandler = express.errorHandler();
        errorHandler(err, req, res, next);
    } else {
        res.send(500);
    }
});




/// catch 404 and forwarding to error handler



