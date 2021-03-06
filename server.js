/* eslint-disable no-unused-vars */
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const dbconnection = require('./models');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
// conpress requests
app.use(compression());

// Enable CORS for all HTTP methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// basic router
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to GadaPut' });
});

// const indexRoute = require('./routes/dashboard');

// app.use('/', indexRoute);
// app.use('/dashboard', indexRoute);

// Routes
const usersRoute = require('./routes/users');
const communitiesRoute = require('./routes/communities');
const authRoute = require('./routes/auth');

app.use('/user', usersRoute);
app.use('/', communitiesRoute);
app.use('/auth', authRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`error ${err.status}`);
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on Port ${port}`);
});
