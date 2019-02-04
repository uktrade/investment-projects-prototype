const { renderFields, saveFields, preselectFields, updateFieldsCount } = require('./helper');
const { cip } = require('app/paths');

const express = require('express');
const router = express.Router();

// Investor requirements (Edit & Save)
router.post(cip.largeCapital.investorRequirements, (req, res) => {
  const { investorRequirements } = req.session.ci;
  const { body } = req;
  investorRequirements.edit = body.edit;
  if(investorRequirements.edit === 'true') {
    renderFields(req, res);
  } else if (investorRequirements.edit === 'false') {
    saveFields(investorRequirements, body);
    preselectFields(investorRequirements);
    updateFieldsCount(investorRequirements);
    res.redirect(cip.largeCapital.investorProfile);
  }
});

module.exports = router;
