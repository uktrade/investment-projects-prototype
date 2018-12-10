module.exports = (req, res, next) => {
  if (!req.session) {
    return next(new Error('Store is disconnected'))
  }
  next();
};
