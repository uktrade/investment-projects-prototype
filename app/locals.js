const paths = require('app/paths');

const locals = (req, res, next) => {
  res.locals.paths = paths;
  next();
};

module.exports = locals;
