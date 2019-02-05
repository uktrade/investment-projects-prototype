const { cip } = require('app/paths');

const express = require('express');
const router = express.Router();

// Investor details, Investor requirements and Location
router.get(cip.largeCapital.investorProfile, (req, res) => {
  req.session.ci.investorDetails.edit = false;
  req.session.ci.investorRequirements.edit = false;
  req.session.ci.location.edit = false;

  const fields = { ...req.session.ci };
  res.render('investor-profile', {
    fields
  });
});

module.exports = router;
