const capitalInvestorProfile = require('app/modules/capital-investor-profile/route');
const investmentProjects = require('app/modules/investment-projects/route');
const investmentTypes = require('app/modules/investment-types/route');
const session = require('app/session/route');
const { root } = require('app/paths');

const express = require('express');
const router = express.Router();

// Create a new session when at root.
router.get(root, (req, res) => {
  req.session.regenerate( err => res.render('index'))
});

module.exports = (app) => {
  app.use(router);
  app.use(session);
  app.use(capitalInvestorProfile);
  app.use(investmentTypes);
  app.use(investmentProjects);
};
