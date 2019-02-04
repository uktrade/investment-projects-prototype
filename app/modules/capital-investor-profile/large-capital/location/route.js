const locationFields = require('./fields');
const { getValueKeys } = require('app/utils');
const { cip } = require('app/paths');

const express = require('express');
const router = express.Router();

const totalFieldsCount = Object.keys(locationFields).length;

const updateFieldsCount = (req) => {
  const { location } = req.session.ci;
  const valueKeys = getValueKeys(location);
  location.incompleteFieldsCount = totalFieldsCount - valueKeys.length;
};

const renderFields = (req, res) => {
  const fields = { ...req.session.ci };
  res.render('investor-profile', { fields });
};

const saveLocationFields = (req) => {
  const { location } = req.session.ci;
  const { body } = req;
  location.ukLocation.value = body.ukLocation;
  location.ukLocationNotes.value = body.ukLocationNotes;
  location.country.value = body.country;
};

// Location - Edit & Save
router.post(cip.largeCapital.location, (req, res) => {
  const { location } = req.session.ci;
  const { body } = req;
  location.edit = body.edit;
  if(location.edit === 'true') {
    renderFields(req, res);
  } else if (location.edit === 'false') {
    saveLocationFields(req);
    updateFieldsCount(req);
    res.redirect(cip.largeCapital.investorProfile);
  }
});

module.exports = router;
