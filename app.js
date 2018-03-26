var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

//Creamos una variable nameDB a la q se conecte nuestro proyecto en producción:
// En producción le damos un nombre a la variable nameDB- eg:Babel, sino se conecta a test
const nameDB = process.env.DB || 'test';
mongoose.connect(`mongodb://localhost/${nameDB}`);
const packageRouter = require('./routes/package');
var app = express();

const cache = require('./cache.js');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/packages', packageRouter);

app.use('/:name', (req,res) => {
  res.json({msg: `hola: ${req.params.name}`})
});

app.get('*',(req,res,next) => {
  if(cache[req.url]){
    console.log('return cache');
    return res.json(cache[req.url]);
  }
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.error(err);
  res.status(err.status || 500);
  res.json({msg:err.message || 'error'});
});

module.exports = app;
