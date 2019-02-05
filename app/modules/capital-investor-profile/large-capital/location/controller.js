const { getValueKeys } = require('app/utils');
const locationFields = require('./fields');
const { cip } = require('app/paths');

const totalFieldsCount = Object.keys(locationFields).length;

const setIncompleteFieldsCount = (req) => {
  const { location } = req.session.ci;
  const valueKeys = getValueKeys(location);
  location.incompleteFieldsCount = totalFieldsCount - valueKeys.length;
};

const saveFields = (req) => {
  const { location } = req.session.ci;
  location.ukLocation.value = req.body.ukLocation;
  location.ukLocationNotes.value = req.body.ukLocationNotes;
  location.country.value = req.body.country;
};

const renderFields = (req, res) => {
  const fields = { ...req.session.ci };
  res.render('investor-profile', { fields });
};

const controller = (req, res) => {
  const { location } = req.session.ci;
  location.edit = req.body.edit;

  const userIsEditing = location.edit === 'true';
  if(userIsEditing) {
    renderFields(req, res);
  } else {
    saveFields(req);
    setIncompleteFieldsCount(req);
    res.redirect(cip.largeCapital.investorProfile);
  }
};

module.exports = controller;
