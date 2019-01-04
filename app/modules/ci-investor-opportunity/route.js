const express = require('express');
const router = express.Router();

const investorTypes = require('app/data/investorTypes');
const referralSourceActivity = require('app/data/referral-source-activity');
const specificInvestmentProgramme = require('app/data/specific-investment-programme');

const { ciInvestorOpportunity } = require('app/paths');

const relationshipHealth = [
  { "text": "Good", "value": "good" },
  { "text": "Fair", "value": "fair" },
  { "text": "Poor", "value": "poor" },
];

router.get(ciInvestorOpportunity, (req, res) => {
  res.render('ci-investor-opportunity', {
    investorTypes,
    relationshipHealth,
    referralSourceActivity,
    specificInvestmentProgramme
  });
});

router.post(ciInvestorOpportunity, (req, res) => {
  res.send(req.body);
});

module.exports = router;
