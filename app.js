var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var swig = require('swig');
var morgan = require('morgan');
var router = require('./routes/');
var sass = require('node-sass-middleware');
var Models = require('./models');

//set render engine to swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
//disable express cache
app.set('view cache', false);
//disable swig cache
swig.setDefaults({ cache: false });


app.listen(3000, function(){
	console.log("listening on 3000");
});


//modular routing system
app.use('/',router);

app.use(
  sass({
    src: __dirname + '/assets', //where the sass files are 
    dest: __dirname + '/public', //where css should go
    debug: true
  })
);

//serve static files
app.use(express.static(__dirname+'/public'));
app.use('/bower_components',express.static(__dirname+'/bower_components'));


// error handling middleware
// catch 404 (no route hit) forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// handle all errors (anything passed into next())
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({error: err});
    res.render('error');
});