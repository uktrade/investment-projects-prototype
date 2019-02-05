const investorRequirementsFields = require('./fields');
const { getValueKeys } = require('app/utils');

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

const setValueLabels = (obj, field) => {
  const valueLabels = getValueLabels(obj[field].value, obj[field].options);
  obj[field].valueLabels = valueLabels ? valueLabels : [];
};

const preselectFields = (investorRequirements) => {
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

const saveFields = (investorRequirements, body) => {
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
const updateFieldsCount = (investorRequirements) => {
  let valueKeys = getValueKeys(investorRequirements).length;

  // If any of the asset classes have been set then increment valueKeys by one.
  const valueKeysAssetClasses = getValueKeys(investorRequirements.assetClasses);
  if(valueKeysAssetClasses.length) {
    valueKeys++;
  }

  // If at least one field is set within Asset classes then it's complete.
  investorRequirements.assetClasses.isComplete = valueKeysAssetClasses.length > 0;

  // Determine the number of incomplete fields.
  investorRequirements.incompleteFieldsCount = totalFieldsCount - valueKeys;
};

const renderFields = (req, res) => {
  const fields = { ...req.session.ci };
  res.render('investor-profile', {
    fields
  });
};

module.exports = {
  saveFields,
  renderFields,
  preselectFields,
  updateFieldsCount
};
