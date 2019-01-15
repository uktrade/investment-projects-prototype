const express = require('express');
const investorTypes = require('app/data/investorTypes');
const referralSourceActivity = require('app/data/referral-source-activity');
const specificInvestmentProgramme = require('app/data/specific-investment-programme');
const overallRelationshipHealth = require('app/data/overallRelationshipHealth');
const countries = require('app/data/countries');
const { capitalInvestment } = require('app/paths');

const router = express.Router();
const INVESTOR_DETAILS_FIELDS_REQUIRED = 10;

const excludedKeys = [
  'edit',
  'requiredFieldsCount',
  'backgroundChecksDay',
  'backgroundChecksMonth',
  'backgroundChecksYear',
  'backgroundChecksPerson',
];

const getValueKeys = (obj) => {
  return Object.keys(obj).filter(key => {
    for (let i = 0; i < excludedKeys.length; i++) {
      if (key === excludedKeys[i]) {
        return false;
      }
    }
    return obj[key] !== '';
  });
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
  selectItem(investorTypes, investorDetails.investorType, 'selected');
  selectItem(referralSourceActivity, investorDetails.referralSourceActivity, 'selected');
  selectItem(specificInvestmentProgramme, investorDetails.specificInvestmentProgramme, 'selected');
  selectItem(overallRelationshipHealth, investorDetails.overallRelationshipHealth, 'checked');
};

router.get(capitalInvestment.createProject, (req, res) => {
  res.render('create-project', { countries });
});

router.post(capitalInvestment.createProject, (req, res) => {
  req.session.ci = {
    project: {},
    investorDetails: {
      requiredFieldsCount: INVESTOR_DETAILS_FIELDS_REQUIRED
    },
    clientRequirements: {},
    location: {}
  };

  req.session.ci.project = { ...req.body };

  if(req.session.ci.project.sizeOfOpportunity === 'largeCapital') {
    res.redirect(capitalInvestment.investorOpportunity);
  } else {
    res.send('TODO: Growth Capital');
  }
});

// CI Investor Opportunity - Investor Details, Client Requirements and Location
router.get(capitalInvestment.investorOpportunity, (req, res) => {
  req.session.ci.investorDetails.edit = false;
  const fields = { ...req.session.ci };
  res.render('opportunity', {
    fields
  });
});

// CI Investor Opportunity - Investor Details (Edit & Save)
router.post(capitalInvestment.investorOpportunityDetails, (req, res) => {
  // Merge the POST into the session investorDetails object.
  req.session.ci.investorDetails = { ...req.session.ci.investorDetails, ...req.body };

  // Reference the session investorDetails object.
  let investorDetails = req.session.ci.investorDetails;

  // Cleanup the background checks as they may have been set previously.
  if(investorDetails.backgroundChecks === 'false') {
    delete investorDetails.backgroundChecksDay;
    delete investorDetails.backgroundChecksMonth;
    delete investorDetails.backgroundChecksYear;
    delete investorDetails.backgroundChecksPerson;
  }

  // Determine the number of required fields the user is yet to complete.
  const valueKeys = getValueKeys(investorDetails);
  investorDetails.requiredFieldsCount = INVESTOR_DETAILS_FIELDS_REQUIRED - valueKeys.length;

  if(investorDetails.edit === 'true') {
    // Create a fields object for the page.
    const fields = { ...req.session.ci };

    // As we're editing we need to set any controls they were previously set by the user.
    selectInvestorDetailsFields(investorDetails);

    // Render the opportunity page including the form data and fields.
    res.render('opportunity', {
      investorTypes,
      overallRelationshipHealth,
      referralSourceActivity,
      specificInvestmentProgramme,
      fields
    });
  } else {
    // User wishes to save their changes.
    res.redirect(capitalInvestment.investorOpportunity);
  }
});

// CI Investor Opportunity - Client Requirements.
router.post(capitalInvestment.investorOpportunityClientRequirements, (req, res) => {

});

// CI Investor Opportunity - Location.
router.post(capitalInvestment.investorOpportunityLocation, (req, res) => {

});

module.exports = router;
