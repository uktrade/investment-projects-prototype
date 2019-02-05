const controller = require('./controller');
const { cip } = require('app/paths');

const express = require('express');
const router = express.Router();

// Location - Edit & Save
router.post(cip.largeCapital.location, controller);

module.exports = router;
