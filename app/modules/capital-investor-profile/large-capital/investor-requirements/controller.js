const investorRequirementsFields = require('./fields');
const { getValueKeys } = require('app/utils');
const { cip } = require('app/paths');

const totalFieldsCount = Object.keys(investorRequirementsFields).length;

const getValueLabels = (value, options) => {
  if(!value || !options) {
    return null;
  }

  let valueLabels = [];

  let values = [];
  if(typeof value === 'string') {
    values.push(value);
  } else if (Array.isArray(value)) {
    values = value;
  }

  values.forEach(function(value) {
    options.forEach(function(option) {
      if(value === option.value) {
        valueLabels.push(option.label);
      }
    });
  });

  return valueLabels;
};

const setAssetClassesComplete = (req) => {
  const { investorRequirements } = req.session.ci;
  const assetClassesValueKeys = getValueKeys(investorRequirements.assetClasses);
  // If at least one field is set within Asset Classes then it's complete.
  investorRequirements.assetClasses.isComplete = assetClassesValueKeys.length > 0;
};

const setIncompleteFieldsCount = (req) => {
  const { investorRequirements } = req.session.ci;
  let valueKeys = getValueKeys(investorRequirements).length;
  if(investorRequirements.assetClasses.isComplete) {
    valueKeys++;
  }
  investorRequirements.incompleteFieldsCount = totalFieldsCount - valueKeys;
};

const setValueLabels = (obj, field) => {
  const valueLabels = getValueLabels(obj[field].value, obj[field].options);
  obj[field].valueLabels = valueLabels ? valueLabels : [];
};

const preselectFields = (req) => {
  const { investorRequirements } = req.session.ci;
  setValueLabels(investorRequirements, 'dealTicketSize');
  setValueLabels(investorRequirements.assetClasses, 'energyAndInfrastructure');
  setValueLabels(investorRequirements.assetClasses, 'realEstate');
  setValueLabels(investorRequirements, 'typesOfInvestment');
  setValueLabels(investorRequirements, 'minimumRateOfReturn');
  setValueLabels(investorRequirements, 'timeHorizonTenure');
  setValueLabels(investorRequirements, 'restrictionsConditions');
  setValueLabels(investorRequirements, 'constructionRisk');
  setValueLabels(investorRequirements, 'minimumEquityPercentage');
  setValueLabels(investorRequirements, 'desiredDealRole');
};

const saveFields = (req) => {
  const { body } = req;
  const { investorRequirements } = req.session.ci;
  investorRequirements.dealTicketSize.value = body.dealTicketSize;
  investorRequirements.assetClasses.energyAndInfrastructure.value = body.energyAndInfrastructure;
  investorRequirements.assetClasses.realEstate.value = body.realEstate;
  investorRequirements.assetClasses.otherAssetClasses.value = body.otherAssetClasses;
  investorRequirements.typesOfInvestment.value = body.typesOfInvestment;
  investorRequirements.minimumRateOfReturn.value = body.minimumRateOfReturn;
  investorRequirements.timeHorizonTenure.value = body.timeHorizonTenure;
  investorRequirements.restrictionsConditions.value = body.restrictionsConditions;
  investorRequirements.constructionRisk.value = body.constructionRisk;
  investorRequirements.minimumEquityPercentage.value = body.minimumEquityPercentage;
  investorRequirements.desiredDealRole.value = body.desiredDealRole;
};

const renderFields = (req, res) => {
  const fields = { ...req.session.ci };
  res.render('investor-profile', { fields });
};

const controller = (req, res) => {
  const { investorRequirements } = req.session.ci;
  investorRequirements.edit = req.body.edit;

  const userIsEditing = investorRequirements.edit === 'true';
  if(userIsEditing) {
    renderFields(req, res);
  } else {
    saveFields(req);
    preselectFields(req);
    setAssetClassesComplete(req);
    setIncompleteFieldsCount(req);
    res.redirect(cip.largeCapital.investorProfile);
  }
};

module.exports = controller;
