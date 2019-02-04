const { saveFields, renderFields, preselectFields, updateFieldsCount } = require('./helper');
const { cip } = require('app/paths');

const express = require('express');
const router = express.Router();

// Investor Details - Edit & Save
router.post(cip.largeCapital.investorDetails, (req, res) => {
  const { investorDetails } = req.session.ci;
  investorDetails.edit = req.body.edit;
  if (investorDetails.edit === 'true') {
    preselectFields(req);
    renderFields(req, res);
  } else if (investorDetails.edit === 'false') {
    saveFields(req);
    updateFieldsCount(req);
    if (investorDetails.clientContacts.value.length === 0) {
      investorDetails.clientContacts.value.push({}); // Render a client contact field.
    }
    res.redirect(cip.largeCapital.investorProfile);
  }
});

module.exports = router;
