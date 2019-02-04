const overallRelationshipHealth = require('app/data/overall-relationship-health');
const investorTypes = require('app/data/investorTypes');
const investorDetailsFields = require('./fields');
const { getValueKeys } = require('app/utils');
const { cip } = require('app/paths');

const express = require('express');
const router = express.Router();

const totalFieldsCount = Object.keys(investorDetailsFields).length;

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

// Capital investor profile - Investor Details (Edit & Save)
router.post(cip.largeCapital.investorDetails, (req, res) => {

  const investorDetails = req.session.ci.investorDetails;

  // Update the session
  investorDetails.edit = req.body.edit;

  if(investorDetails.edit === 'true') {
    // As we're editing we need to set any controls they were previously set by the user.
    selectInvestorDetailsFields(investorDetails);
    const fields = { ...req.session.ci };
    res.render('investor-profile', {
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
    investorDetails.incompleteFieldsCount = totalFieldsCount - valueKeys.length;

    // Client contacts:
    // 1. Ensure we always have a client contact field to display to the user.
    // 2. Ensure it comes after the incompleteFieldsCount calculation.
    if(investorDetails.clientContacts.value.length === 0) {
      investorDetails.clientContacts.value.push({});
    }

    res.redirect(cip.largeCapital.investorProfile);
  }
});

module.exports = router;
