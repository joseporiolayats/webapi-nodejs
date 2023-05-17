// Default imports
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var rateLimit = require('express-rate-limit');
var cors = require('cors');

// Router imports
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var clientsRouter = require('./routes/clients');
var policiesRouter = require('./routes/policies');


//  Launch app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(helmet()); // sets HTTP headers for security
app.use(cors()); // allows Cross-Origin Resource Sharing
app.use(rateLimit({ // rate limits to 100 requests per 15 minutes
  windowMs: 15 * 60 * 1000,
  max: 100
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router app
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/clients', clientsRouter);
app.use('/policies', policiesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

