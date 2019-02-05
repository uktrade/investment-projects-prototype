const controller = require('./controller');
const { cip } = require('app/paths');

const express = require('express');
const router = express.Router();

// Investor Details - Edit & Save
router.post(cip.largeCapital.investorDetails, controller);

module.exports = router;
