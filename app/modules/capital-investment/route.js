const express = require('express');
const investorTypes = require('app/data/investorTypes');
const referralSourceActivity = require('app/data/referral-source-activity');
const specificInvestmentProgramme = require('app/data/specific-investment-programme');
const overallRelationshipHealth = require('app/data/overall-relationship-health');
const investorDetails = require('app/modules/capital-investment/investor-details/fields');
const clientRequirements = require('app/modules/capital-investment/client-requirements/fields');
const location = require('app/modules/capital-investment/location/fields');
const countries = require('app/data/countries');
const { capitalInvestment } = require('app/paths');
const { isObject } = require('app/utils/checks');

const router = express.Router();

const incompleteFieldsCount = {
  INVESTOR_DETAILS: investorDetails.incompleteFieldsCount,
  CLIENT_REQUIREMENTS: clientRequirements.incompleteFieldsCount,
  LOCATION: location.incompleteFieldsCount,
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

const selectInvestorDetailsFields = (investorDetails) => {
  selectItem(investorTypes, investorDetails.investorType.value, 'selected');
  selectItem(referralSourceActivity, investorDetails.referralSourceActivity.value, 'selected');
  selectItem(specificInvestmentProgramme, investorDetails.specificInvestmentProgramme.value, 'selected');
  selectItem(overallRelationshipHealth, investorDetails.overallRelationshipHealth.value, 'checked');
};

const getValueLabels = (value, options) => {
  if(!value) {
    return value;
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
  obj[field].valueLabels = getValueLabels(obj[field].value, obj[field].options);
};

const getValueKeys = (obj) => {
  return Object.keys(obj).filter(key => {
    return isObject(obj[key]) && obj[key].value
  });
};

router.get(capitalInvestment.createProject, (req, res) => {
  res.render('create-project', { countries });
});

router.post(capitalInvestment.createProject, (req, res) => {
  req.session.ci = {
    project: { ...req.body },
    investorDetails,
    clientRequirements,
    location
  };

  if(req.session.ci.project.sizeOfOpportunity === 'largeCapital') {
    res.redirect(capitalInvestment.investorOpportunity);
  } else {
    res.send('TODO: Growth Capital');
  }
});

// CI Investor Opportunity - Investor Details, Client Requirements and Location
router.get(capitalInvestment.investorOpportunity, (req, res) => {
  req.session.ci.investorDetails.edit = false;
  req.session.ci.clientRequirements.edit = false;
  req.session.ci.location.edit = false;

  const fields = { ...req.session.ci };

  res.render('opportunity', {
    fields
  });
});

// CI Investor Opportunity - Investor Details (Edit & Save)
router.post(capitalInvestment.investorOpportunityDetails, (req, res) => {

  const investorDetails = req.session.ci.investorDetails;

  // Update the session
  investorDetails.edit = req.body.edit;

  if(investorDetails.edit === 'true') {
    // As we're editing we need to set any controls they were previously set by the user.
    selectInvestorDetailsFields(investorDetails);

    const fields = { ...req.session.ci };
    res.render('opportunity', {
      investorTypes,
      overallRelationshipHealth,
      referralSourceActivity,
      specificInvestmentProgramme,
      fields
    });
  } else if (investorDetails.edit === 'false') {
    investorDetails.investorType.value = req.body.investorType;
    investorDetails.assetsUnderManagement.value = req.body.assetsUnderManagement;
    investorDetails.overallRelationshipHealth.value = req.body.overallRelationshipHealth;
    investorDetails.backgroundChecks.value = req.body.backgroundChecks;

    const hasBackgroundChecks = investorDetails.backgroundChecks.value === 'true';
    investorDetails.backgroundChecks.day = hasBackgroundChecks ? req.body.backgroundChecksDay : null;
    investorDetails.backgroundChecks.month = hasBackgroundChecks ? req.body.backgroundChecksMonth : null;
    investorDetails.backgroundChecks.year = hasBackgroundChecks ? req.body.backgroundChecksYear : null;
    investorDetails.backgroundChecks.person = hasBackgroundChecks ? req.body.backgroundChecksPerson : null;

    investorDetails.description.value = req.body.description;
    investorDetails.clientContact.value = req.body.clientContact;
    investorDetails.clientRelationshipManager.value = req.body.clientRelationshipManager;
    investorDetails.referralSourceAdviser.value = req.body.referralSourceAdviser;
    investorDetails.referralSourceActivity.value = req.body.referralSourceActivity;
    investorDetails.specificInvestmentProgramme.value = req.body.specificInvestmentProgramme;

    // Determine the number of incomplete fields.
    const valueKeys = getValueKeys(investorDetails);
    investorDetails.incompleteFieldsCount = incompleteFieldsCount.INVESTOR_DETAILS - valueKeys.length;

    res.redirect(capitalInvestment.investorOpportunity);
  }

});

// CI Investor Opportunity - Client Requirements (Edit & Save)
router.post(capitalInvestment.investorOpportunityClientRequirements, (req, res) => {
  const clientRequirements = req.session.ci.clientRequirements;

  // Update the session
  clientRequirements.edit = req.body.edit;

  if(clientRequirements.edit === 'true') {
    const fields = { ...req.session.ci };
    res.render('opportunity', {
      fields
    });
  } else if (clientRequirements.edit === 'false') {
    clientRequirements.dealTicketSize.value = req.body.dealTicketSize;
    clientRequirements.assetClassesOfInterest.value = req.body.assetClassesOfInterest;
    clientRequirements.typesOfInvestment.value = req.body.typesOfInvestment;
    clientRequirements.minimumRateOfReturn.value = req.body.minimumRateOfReturn;
    clientRequirements.timeHorizonTenure.value = req.body.timeHorizonTenure;
    clientRequirements.restrictionsConditions.value = req.body.restrictionsConditions;
    clientRequirements.projectStagesConsidered.value = req.body.projectStagesConsidered;
    clientRequirements.minimumEquityPercentage.value = req.body.minimumEquityPercentage;
    clientRequirements.desiredDealRole.value = req.body.desiredDealRole;

    // Map the values from the post to their corresponding display labels.
    setValueLabels(clientRequirements, 'dealTicketSize');
    setValueLabels(clientRequirements, 'typesOfInvestment');
    setValueLabels(clientRequirements, 'minimumRateOfReturn');
    setValueLabels(clientRequirements, 'timeHorizonTenure');
    setValueLabels(clientRequirements, 'restrictionsConditions');
    setValueLabels(clientRequirements, 'projectStagesConsidered');
    setValueLabels(clientRequirements, 'minimumEquityPercentage');
    setValueLabels(clientRequirements, 'desiredDealRole');

    // Determine the number of incomplete fields.
    const valueKeys = getValueKeys(clientRequirements);
    clientRequirements.incompleteFieldsCount = incompleteFieldsCount.CLIENT_REQUIREMENTS - valueKeys.length;

    // Redirect
    res.redirect(capitalInvestment.investorOpportunity);
  }
});

// CI Investor Opportunity - Location (Edit & Save)
router.post(capitalInvestment.investorOpportunityLocation, (req, res) => {

  const location = req.session.ci.location;

  // Update the session
  location.edit = req.body.edit;

  if(location.edit === 'true') {
    const fields = { ...req.session.ci };
    res.render('opportunity', {
      fields
    });
  } else if (location.edit === 'false') {
    location.ukLocation.value = req.body.ukLocation;
    location.country.value = req.body.country;

    // Determine the number of incomplete fields.
    const valueKeys = getValueKeys(location);
    location.incompleteFieldsCount = incompleteFieldsCount.LOCATION - valueKeys.length;

    res.redirect(capitalInvestment.investorOpportunity);
  }
});

module.exports = router;
