const investorRequirementsFields = require('./fields');
const { getValueKeys } = require('app/utils');
const { setValueLabels } = require('./helper');
const { cip } = require('app/paths');

const express = require('express');
const router = express.Router();

const totalFieldsCount = Object.keys(investorRequirementsFields).length;

// Capital investor profile - Investor requirements (Edit & Save)
router.post(cip.largeCapital.investorRequirements, (req, res) => {
  const investorRequirements = req.session.ci.investorRequirements;

  // Update the session
  investorRequirements.edit = req.body.edit;

  if(investorRequirements.edit === 'true') {
    const fields = { ...req.session.ci };
    res.render('investor-profile', {
      fields
    });
  } else if (investorRequirements.edit === 'false') {
    investorRequirements.dealTicketSize.value = req.body.dealTicketSize;
    investorRequirements.assetClasses.energyAndInfrastructure.value = req.body.energyAndInfrastructure;
    investorRequirements.assetClasses.realEstate.value = req.body.realEstate;
    investorRequirements.assetClasses.otherAssetClasses.value = req.body.otherAssetClasses;
    investorRequirements.typesOfInvestment.value = req.body.typesOfInvestment;
    investorRequirements.minimumRateOfReturn.value = req.body.minimumRateOfReturn;
    investorRequirements.timeHorizonTenure.value = req.body.timeHorizonTenure;
    investorRequirements.restrictionsConditions.value = req.body.restrictionsConditions;
    investorRequirements.projectStagesConsidered.value = req.body.projectStagesConsidered;
    investorRequirements.minimumEquityPercentage.value = req.body.minimumEquityPercentage;
    investorRequirements.desiredDealRole.value = req.body.desiredDealRole;

    // Map the values from the post to their corresponding display labels.
    setValueLabels(investorRequirements, 'dealTicketSize');
    setValueLabels(investorRequirements.assetClasses, 'energyAndInfrastructure');
    setValueLabels(investorRequirements.assetClasses, 'realEstate');
    setValueLabels(investorRequirements, 'typesOfInvestment');
    setValueLabels(investorRequirements, 'minimumRateOfReturn');
    setValueLabels(investorRequirements, 'timeHorizonTenure');
    setValueLabels(investorRequirements, 'restrictionsConditions');
    setValueLabels(investorRequirements, 'projectStagesConsidered');
    setValueLabels(investorRequirements, 'minimumEquityPercentage');
    setValueLabels(investorRequirements, 'desiredDealRole');

    // Get all keys that have values against them.
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

    // Redirect
    res.redirect(cip.largeCapital.investorProfile);
  }
});

module.exports = router;
