const investorRequirementsRoute = require('app/modules/capital-investor-profile/large-capital/investor-requirements/route');
const investorDetailsRoute = require('app/modules/capital-investor-profile/large-capital/investor-details/route');
const investorProfileRoute = require('app/modules/capital-investor-profile/large-capital/investor-profile/route');
const locationRoute = require('app/modules/capital-investor-profile/large-capital/location/route');
const createProfile = require('app/modules/capital-investor-profile/create-profile/route');
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
  app.use(createProfile);
  app.use(locationRoute);
  app.use(investorProfileRoute);
  app.use(investorDetailsRoute);
  app.use(investmentTypesRoute);
  app.use(investmentProjectsRoute);
  app.use(investorRequirementsRoute);
};
