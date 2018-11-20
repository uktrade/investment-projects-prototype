const express = require('express');
const paths = require('app/paths');

const router = express.Router();
const {
  root,
  newProject,
  investmentProjects
} = paths;

router.get(root, (req, res) => res.render('index'));
router.get(investmentProjects, (req, res) => res.render('investment-projects'));
router.get(newProject, (req, res) => res.render('new-project'));

module.exports = router;
