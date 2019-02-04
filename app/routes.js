const largeCapitalRoute = require('app/modules/capital-investor-profile/large-capital/route');
const investmentProjectsRoute = require('app/modules/investment-projects/route');
const investmentTypesRoute = require('app/modules/investment-types/route');
const sessionsRoute = require('app/session/route');
const { root } = require('app/paths');
const express = require('express');

const router = express.Router();

// Create a new session when at root.
router.get(root, (req, res) => {
  req.session.regenerate( err => res.render('index'))
});

module.exports = (app) => {
  app.use(router);
  app.use(sessionsRoute);
  app.use(largeCapitalRoute);
  app.use(investmentTypesRoute);
  app.use(investmentProjectsRoute);
};
