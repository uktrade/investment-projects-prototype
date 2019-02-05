const controller = require('./controller');
const { cip } = require('app/paths');

const express = require('express');
const router = express.Router();

// Investor requirements (Edit & Save)
router.post(cip.largeCapital.investorRequirements, controller);

module.exports = router;
