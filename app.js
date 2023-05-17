// Node.js module imports
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Router imports
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const clientsRouter = require('./routes/clients');
const policiesRouter = require('./routes/policies');

// Create express app
const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set up middleware
app.use(logger('dev')); // log HTTP requests
app.use(helmet()); // set HTTP headers for security
app.use(cors()); // enable Cross-Origin Resource Sharing
app.use(rateLimit({ // limit request rate to 100 requests per 15 minutes
  windowMs: 15 * 60 * 1000,
  max: 100
}));
app.use(express.json()); // parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // parse URL-encoded request bodies
app.use(cookieParser()); // parse Cookie header and populate req.cookies
app.use(express.static(path.join(__dirname, 'public'))); // serve static files

// Set up routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/clients', clientsRouter);
app.use('/policies', policiesRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
