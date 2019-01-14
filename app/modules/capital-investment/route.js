const express = require('express');
const router = express.Router();

const investorTypes = require('app/data/investorTypes');
const referralSourceActivity = require('app/data/referral-source-activity');
const specificInvestmentProgramme = require('app/data/specific-investment-programme');
const overallRelationshipHealth = require('app/data/overallRelationshipHealth');
const countries = require('app/data/countries');

const { capitalInvestment } = require('app/paths');

const selectItem = (items, item, selectionType) => {
  if(!items || !item || !selectionType) {
    return;
  }
  items.forEach(type => type.value === item ?
    type[selectionType] = true :
    type[selectionType] = false
  );
};

const getFields = (session = {}) => {
  const fields = {};
  Object.keys(session).forEach( key => {
    fields[key] = {
      value: session[key]
    };
  });
  return fields;
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
    investorDetails: {},
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
  req.session.ci.investorDetails = { ...req.session.ci.investorDetails, ...req.body };

  // Cleanup the background checks
  if(req.session.ci.investorDetails.backgroundChecks === 'false') {
    delete req.session.ci.investorDetails.backgroundChecksDay;
    delete req.session.ci.investorDetails.backgroundChecksMonth;
    delete req.session.ci.investorDetails.backgroundChecksYear;
    delete req.session.ci.investorDetails.backgroundChecksPerson;
  }

  const fields = { ...req.session.ci };
  if(fields.investorDetails.edit === 'true') {
    selectInvestorDetailsFields(fields.investorDetails);
    res.render('opportunity', {
      investorTypes,
      overallRelationshipHealth,
      referralSourceActivity,
      specificInvestmentProgramme,
      fields
    });
  } else {
    res.redirect(capitalInvestment.investorOpportunity);
  }
});

// CI Investor Opportunity - Client Requirements.
router.post(capitalInvestment.investorOpportunityClientRequirements, (req, res) => {

});

// CI Investor Opportunity - Location.
router.post(capitalInvestment.investorOpportunityLocation, (req, res) => {

});

// router.get(capitalInvestment.investorOpportunityEdit, (req, res) => {
//   const fields = getFields(req.session.ci);
//   selectFields(fields);
//   res.render('ci-investor-opportunity-edit', {
//     investorTypes,
//     overallRelationshipHealth,
//     referralSourceActivity,
//     specificInvestmentProgramme,
//     fields
//   });
// });

// router.post(capitalInvestment.investorOpportunityEdit, (req, res) => {
//   const post = { ...req.body };
//
//   post.backgroundChecks = post.backgroundChecks === 'true';
//   if(post.backgroundChecks === false) {
//     delete post.backgroundChecksDay;
//     delete post.backgroundChecksMonth;
//     delete post.backgroundChecksYear;
//     delete post.backgroundChecksPerson;
//   }
//
//   req.session.ci = { ...post };
//   res.redirect(ciInvestorOpportunity);
// });

module.exports = router;
