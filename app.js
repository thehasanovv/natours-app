const express = require('express');
const morgan = require('morgan');
const app = express();
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//////////////////////////////////
// 1) MIDDLAWARES

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // console.log('Hello from the middleware ✋');
  req.requestTime = new Date().toISOString();
  next();
});

//////////////////////////////////
// 2) Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//////////////////////////////////
// 3) All wrong path call global globalErrorHandler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//////////////////////////////////
// 4) Catch all errors send err response
app.use(globalErrorHandler);

module.exports = app;

// app.all('*', (req, res, next) => {
//   // res.status(404).json({
//   //   status: 'fail',
//   //   message: `Can't find ${req.originalUrl} on this server!`,
//   // });
//   const err = new Error(`Can't find ${req.originalUrl} on this server`);
//   err.status = 'fail';
//   err.statusCode = 404;
//   next(err);
// });
