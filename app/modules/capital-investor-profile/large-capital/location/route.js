const locationFields = require('./fields');
const { getValueKeys } = require('app/utils');
const { cip } = require('app/paths');

const express = require('express');
const router = express.Router();

const totalFieldsCount = Object.keys(locationFields).length;

// Capital investor profile - Location (Edit & Save)
router.post(cip.largeCapital.location, (req, res) => {

  const location = req.session.ci.location;

  // Update the session
  location.edit = req.body.edit;

  if(location.edit === 'true') {
    const fields = { ...req.session.ci };
    res.render('investor-profile', {
      fields
    });
  } else if (location.edit === 'false') {
    location.ukLocation.value = req.body.ukLocation;
    location.ukLocationNotes.value = req.body.ukLocationNotes;
    location.country.value = req.body.country;

    // Determine the number of incomplete fields.
    const valueKeys = getValueKeys(location);
    location.incompleteFieldsCount = totalFieldsCount - valueKeys.length;

    res.redirect(cip.largeCapital.investorProfile);
  }
});

module.exports = router;
