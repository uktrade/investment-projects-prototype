const overallRelationshipHealth = require('app/data/overall-relationship-health');
const investorTypes = require('app/data/investorTypes');
const { getValueKeys } = require('app/utils');
const { cip } = require('app/paths');
const fields = require('./fields');

const totalFieldsCount = Object.keys(fields).length;

const saveClientContacts = (req) => {
  const { investorDetails } = req.session.ci;
  investorDetails.clientContacts.value = [];
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    const value = req.body[`clientContact${i+1}`];
    if (value) {
      investorDetails.clientContacts.value.push({ name: value });
    }
  }
};

const saveBGChecks = (req) => {
  const { body } = req;
  const { investorDetails } = req.session.ci;
  investorDetails.backgroundChecks.value = body.backgroundChecks;
  const hasBackgroundChecks = investorDetails.backgroundChecks.value === 'true';
  investorDetails.backgroundChecks.day = hasBackgroundChecks ? body.backgroundChecksDay : null;
  investorDetails.backgroundChecks.month = hasBackgroundChecks ? body.backgroundChecksMonth : null;
  investorDetails.backgroundChecks.year = hasBackgroundChecks ? body.backgroundChecksYear : null;
  investorDetails.backgroundChecks.person = hasBackgroundChecks ? body.backgroundChecksPerson : null;
};

const selectItem = (items, item, selectionType) => {
  if(item === undefined) {
    return;
  }
  items.forEach(type => type.value === item ?
    type[selectionType] = true :
    type[selectionType] = false
  );
};

const preselectFields = (req) => {
  const { investorDetails } = req.session.ci;
  selectItem(investorTypes, investorDetails.investorType.value, 'selected');
  selectItem(overallRelationshipHealth, investorDetails.overallRelationshipHealth.value, 'checked');
};

const renderFields = (req, res) => {
  const fields = { ...req.session.ci };
  res.render('investor-profile', {
    investorTypes,
    overallRelationshipHealth,
    fields
  });
};

const saveFields = (req) => {
  const { investorDetails } = req.session.ci;
  investorDetails.investorType.value = req.body.investorType;
  investorDetails.description.value = req.body.description;
  investorDetails.assetsUnderManagement.value = req.body.assetsUnderManagement;
  investorDetails.overallRelationshipHealth.value = req.body.overallRelationshipHealth;
  investorDetails.clientRelationshipManager.value = fields.clientRelationshipManager.value; // Not set by the user.
  saveClientContacts(req);
  saveBGChecks(req);
};

const updateFieldsCount = (req) => {
  const { investorDetails } = req.session.ci;
  const valueKeys = getValueKeys(investorDetails);
  investorDetails.incompleteFieldsCount = totalFieldsCount - valueKeys.length;
};

const controller = (req, res) => {
  const { investorDetails } = req.session.ci;
  investorDetails.edit = req.body.edit;

  const userIsEditing = investorDetails.edit === 'true';
  if (userIsEditing) {
    preselectFields(req);
    renderFields(req, res);
  } else {
    saveFields(req);
    updateFieldsCount(req);
    if (investorDetails.clientContacts.value.length === 0) {
      investorDetails.clientContacts.value.push({}); // Render a client contact field.
    }
    res.redirect(cip.largeCapital.investorProfile);
  }
};

module.exports = controller;
