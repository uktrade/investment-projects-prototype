const { INTERNAL_SERVER_ERROR, NOT_FOUND} = require('http-status-codes');

const getStatus = error => error.status || INTERNAL_SERVER_ERROR;

const handle404 = (req, res, next) => {
  const error = new Error(`Page Not Found - ${req.originalUrl}`);
  error.status = NOT_FOUND;
  next(error);
};

const handleError = (error, req, res, next) => {
  const status = getStatus(error);
  res.status(status);
  res.render(status === NOT_FOUND ? '404' : '500', {
    message: error.message,
    stack: error.stack,
  });
};

module.exports = { handle404, handleError };
