const { investmentProjects } = require('app/paths');

const express = require('express');
const router = express.Router();

router.get(investmentProjects, (req, res) => res.render('investment-projects'));

module.exports = router;
