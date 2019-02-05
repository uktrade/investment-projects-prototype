const { investmentTypesGET, investmentTypesPOST} = require('./controller');
const { investmentTypes } = require('app/paths');

const express = require('express');
const router = express.Router();

router.get(investmentTypes, investmentTypesGET);
router.post(investmentTypes, investmentTypesPOST);

module.exports = router;
