const overallRelationshipHealth = require('app/data/overall-relationship-health');
const investorTypes = require('app/data/investorTypes');
const fields = require('./fields');
const { getValueKeys } = require('app/utils');

const totalFieldsCount = Object.keys(fields).length;

const saveClientContacts = (investorDetails, body) => {
  investorDetails.clientContacts.value = [];
  for (let i = 0; i < Object.keys(body).length; i++) {
    const value = body[`clientContact${i+1}`];
    if (value) {
      investorDetails.clientContacts.value.push({ name: value });
    }
  }
};

const saveBGChecks = (investorDetails, body) => {
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
  const { body } = req;
  const { investorDetails } = req.session.ci;
  investorDetails.investorType.value = body.investorType;
  investorDetails.description.value = body.description;
  investorDetails.assetsUnderManagement.value = body.assetsUnderManagement;
  investorDetails.overallRelationshipHealth.value = body.overallRelationshipHealth;
  investorDetails.clientRelationshipManager.value = fields.clientRelationshipManager.value; // Not set by the user.
  saveClientContacts(investorDetails, body);
  saveBGChecks(investorDetails, body);
};

const updateFieldsCount = (req) => {
  const { investorDetails } = req.session.ci;
  const valueKeys = getValueKeys(investorDetails);
  investorDetails.incompleteFieldsCount = totalFieldsCount - valueKeys.length;
};

module.exports = {
  saveFields,
  renderFields,
  preselectFields,
  updateFieldsCount
};
