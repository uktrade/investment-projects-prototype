const express = require('express');
const investorTypes = require('app/data/investorTypes');
const overallRelationshipHealth = require('app/data/overall-relationship-health');
const investorDetailsFields = require('app/modules/capital-investment/investor-details/fields');
const clientRequirementsFields = require('app/modules/capital-investment/client-requirements/fields');
const locationFields = require('app/modules/capital-investment/location/fields');
const countries = require('app/data/countries');
const { capitalInvestment } = require('app/paths');
const { isEmpty } = require('lodash');

const router = express.Router();

const totalFieldsCount = {
  INVESTOR_DETAILS: Object.keys(investorDetailsFields).length,
  CLIENT_REQUIREMENTS: Object.keys(clientRequirementsFields).length,
  LOCATION: Object.keys(locationFields).length,
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
  selectItem(overallRelationshipHealth, investorDetails.overallRelationshipHealth.value, 'checked');
};

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

const getValueKeys = (obj) => {
  return Object.keys(obj).filter(key => {
    return !isEmpty(obj[key].value)
  });
};

router.get(capitalInvestment.createProject, (req, res) => {
  res.render('create-project', { countries });
});

router.post(capitalInvestment.createProject, (req, res) => {
  req.session.ci = {
    project: { ...req.body },
    investorDetails: investorDetailsFields,
    clientRequirements: clientRequirementsFields,
    location: locationFields
  };

  const ci = req.session.ci;

  ci.investorDetails.incompleteFieldsCount = totalFieldsCount.INVESTOR_DETAILS - 1;
  ci.clientRequirements.incompleteFieldsCount = totalFieldsCount.CLIENT_REQUIREMENTS;
  ci.location.incompleteFieldsCount = totalFieldsCount.LOCATION;

  // Add a client contact field for the user to complete.
  ci.investorDetails.clientContacts.value = [{}];

  if(ci.project.sizeOfOpportunity === 'largeCapital') {
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
      fields
    });
  } else if (investorDetails.edit === 'false') {
    investorDetails.investorType.value = req.body.investorType;
    investorDetails.assetsUnderManagement.value = req.body.assetsUnderManagement;
    investorDetails.description.value = req.body.description;

    // The client relationship manager will never be defined by the user.
    investorDetails.clientRelationshipManager.value = investorDetailsFields.clientRelationshipManager.value;

    investorDetails.clientContacts.value = [];
    const keyCount = Object.keys(req.body).length;
    for (let i = 0; i < keyCount; i++) {
      const value = req.body[`clientContact${i+1}`];
      if (value) {
        investorDetails.clientContacts.value.push({ name: value });
      }
    }

    investorDetails.overallRelationshipHealth.value = req.body.overallRelationshipHealth;

    investorDetails.backgroundChecks.value = req.body.backgroundChecks;
    const hasBackgroundChecks = investorDetails.backgroundChecks.value === 'true';
    investorDetails.backgroundChecks.day = hasBackgroundChecks ? req.body.backgroundChecksDay : null;
    investorDetails.backgroundChecks.month = hasBackgroundChecks ? req.body.backgroundChecksMonth : null;
    investorDetails.backgroundChecks.year = hasBackgroundChecks ? req.body.backgroundChecksYear : null;
    investorDetails.backgroundChecks.person = hasBackgroundChecks ? req.body.backgroundChecksPerson : null;

    // Get all investorDetails keys where the corresponding value has been set.
    const valueKeys = getValueKeys(investorDetails);

    // Determine the number of incomplete fields.
    investorDetails.incompleteFieldsCount = totalFieldsCount.INVESTOR_DETAILS - valueKeys.length;

    // Client contacts:
    // 1. Ensure we always have a client contact field to display to the user.
    // 2. Ensure it comes after the incompleteFieldsCount calculation.
    if(investorDetails.clientContacts.value.length === 0) {
      investorDetails.clientContacts.value.push({});
    }

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
    clientRequirements.assetClasses.energyAndInfrastructure.value = req.body.energyAndInfrastructure;
    clientRequirements.assetClasses.realEstate.value = req.body.realEstate;
    clientRequirements.assetClasses.otherAssetClasses.value = req.body.otherAssetClasses;
    clientRequirements.typesOfInvestment.value = req.body.typesOfInvestment;
    clientRequirements.minimumRateOfReturn.value = req.body.minimumRateOfReturn;
    clientRequirements.timeHorizonTenure.value = req.body.timeHorizonTenure;
    clientRequirements.restrictionsConditions.value = req.body.restrictionsConditions;
    clientRequirements.projectStagesConsidered.value = req.body.projectStagesConsidered;
    clientRequirements.minimumEquityPercentage.value = req.body.minimumEquityPercentage;
    clientRequirements.desiredDealRole.value = req.body.desiredDealRole;

    // Map the values from the post to their corresponding display labels.
    setValueLabels(clientRequirements, 'dealTicketSize');
    setValueLabels(clientRequirements.assetClasses, 'energyAndInfrastructure');
    setValueLabels(clientRequirements.assetClasses, 'realEstate');
    setValueLabels(clientRequirements, 'typesOfInvestment');
    setValueLabels(clientRequirements, 'minimumRateOfReturn');
    setValueLabels(clientRequirements, 'timeHorizonTenure');
    setValueLabels(clientRequirements, 'restrictionsConditions');
    setValueLabels(clientRequirements, 'projectStagesConsidered');
    setValueLabels(clientRequirements, 'minimumEquityPercentage');
    setValueLabels(clientRequirements, 'desiredDealRole');

    // Get all keys that have values against them.
    let valueKeys = getValueKeys(clientRequirements).length;

    // If any of the asset classes have been set then increment valueKeys by one.
    const valueKeysAssetClasses = getValueKeys(clientRequirements.assetClasses);
    if(valueKeysAssetClasses.length) {
      valueKeys++;
    }

    // If at least one field is set within Asset classes then it's complete.
    clientRequirements.assetClasses.isComplete = valueKeysAssetClasses.length > 0;

    // Determine the number of incomplete fields.
    clientRequirements.incompleteFieldsCount = totalFieldsCount.CLIENT_REQUIREMENTS - valueKeys;

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
    location.ukLocationNotes.value = req.body.ukLocationNotes;
    location.country.value = req.body.country;

    // Determine the number of incomplete fields.
    const valueKeys = getValueKeys(location);
    location.incompleteFieldsCount = totalFieldsCount.LOCATION - valueKeys.length;

    res.redirect(capitalInvestment.investorOpportunity);
  }
});

module.exports = router;
