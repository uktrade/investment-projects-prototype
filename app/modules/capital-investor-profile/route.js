const investorRequirementsCtrl = require('./large-capital/investor-requirements/controller');
const { createProfileGET, createProfilePOST} = require('./create-profile/controller');
const investorProfileCtrl = require('./large-capital/investor-profile/controller');
const investorDetailsCtrl = require('./large-capital/investor-details/controller');
const locationCtrl = require('./large-capital/location/controller');
const { cip } = require('app/paths');

const express = require('express');
const router = express.Router();

// Create profile
router.get(cip.createProfile, createProfileGET);
router.post(cip.createProfile, createProfilePOST);

// Large Capital
router.post(cip.largeCapital.investorDetails, investorDetailsCtrl);
router.get(cip.largeCapital.investorProfile, investorProfileCtrl);
router.post(cip.largeCapital.investorRequirements, investorRequirementsCtrl);
router.post(cip.largeCapital.location, locationCtrl);

module.exports = router;
