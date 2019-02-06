const investorRequirementsFields = require('../large-capital/investor-requirements/fields');
const investorDetailsFields = require('../large-capital/investor-details/fields');
const locationFields = require('../large-capital/location/fields');
const countries = require('app/data/countries');
const { cip } = require('app/paths');

const totalFieldsCount = {
  INVESTOR_DETAILS: Object.keys(investorDetailsFields).length,
  CLIENT_REQUIREMENTS: Object.keys(investorRequirementsFields).length,
  LOCATION: Object.keys(locationFields).length,
};

const createProfileGET = (req, res) => {
  res.render('create-profile', { countries });
};

const createProfilePOST = (req, res) => {
  req.session.ci = {
    profile: { ...req.body },
    investorDetails: investorDetailsFields,
    investorRequirements: investorRequirementsFields,
    location: locationFields
  };

  const ci = req.session.ci;
  ci.investorDetails.incompleteFieldsCount = totalFieldsCount.INVESTOR_DETAILS - 1;
  ci.investorRequirements.incompleteFieldsCount = totalFieldsCount.CLIENT_REQUIREMENTS;
  ci.location.incompleteFieldsCount = totalFieldsCount.LOCATION;
  ci.investorDetails.clientContacts.value = [{}]; // Add a client contact field for the user to complete.

  if (ci.profile.sizeOfOpportunity === 'largeCapital') {
    res.redirect(cip.largeCapital.investorProfile);
  } else {
    res.send('TODO: Growth Capital');
  }
};

module.exports = {
  createProfileGET,
  createProfilePOST
};
