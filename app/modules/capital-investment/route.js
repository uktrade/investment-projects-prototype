const express = require('express');
const investorTypes = require('app/data/investorTypes');
const referralSourceActivity = require('app/data/referral-source-activity');
const specificInvestmentProgramme = require('app/data/specific-investment-programme');
const overallRelationshipHealth = require('app/data/overallRelationshipHealth');
const countries = require('app/data/countries');
const { capitalInvestment } = require('app/paths');

const router = express.Router();

const incompleteFieldsCount = {
  INVESTOR_DETAILS: 10,
  CLIENT_REQUIREMENTS: 9,
  LOCATION: 2
};

const excludedKeys = [
  'edit',
  'incompleteFieldsCount',
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
    project: { ...req.body },
    investorDetails: {
      incompleteFieldsCount: incompleteFieldsCount.INVESTOR_DETAILS
    },
    clientRequirements: {
      incompleteFieldsCount: incompleteFieldsCount.CLIENT_REQUIREMENTS
    },
    location: {
      incompleteFieldsCount: incompleteFieldsCount.LOCATION
    }
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

  // Determine the number of incomplete fields the user is yet to complete.
  const valueKeys = getValueKeys(investorDetails);
  investorDetails.incompleteFieldsCount = incompleteFieldsCount.INVESTOR_DETAILS - valueKeys.length;

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

// CI Investor Opportunity - Client Requirements (Edit & Save)
router.post(capitalInvestment.investorOpportunityClientRequirements, (req, res) => {

  // Merge the POST into the session investorDetails object.
  req.session.ci.clientRequirements = { ...req.session.ci.clientRequirements, ...req.body };

  // Reference the session clientRequirements object.
  let clientRequirements = req.session.ci.clientRequirements;

  if(clientRequirements.edit === 'true') {
    // Create a fields object for the page.
    const fields = { ...req.session.ci };

    // Render the opportunity page including the form data and fields.
    res.render('opportunity', {
      fields
    });
  } else {
    // User wishes to save their changes.
    res.redirect(capitalInvestment.investorOpportunity);
  }
});

// CI Investor Opportunity - Location (Edit & Save)
router.post(capitalInvestment.investorOpportunityLocation, (req, res) => {

  // Merge the POST into the session location object.
  req.session.ci.location = { ...req.session.ci.location, ...req.body };

  // Reference the session location object.
  let location = req.session.ci.location;

  // Determine the number of incomplete fields the user is yet to complete.
  const valueKeys = getValueKeys(location);
  location.incompleteFieldsCount = incompleteFieldsCount.LOCATION - valueKeys.length;

  if(location.edit === 'true') {
    // Create a fields object for the page.
    const fields = { ...req.session.ci };

    // Render the opportunity page including the form data and fields.
    res.render('opportunity', {
      fields
    });
  } else {
    // User wishes to save their changes.
    res.redirect(capitalInvestment.investorOpportunity);
  }
});

module.exports = router;
