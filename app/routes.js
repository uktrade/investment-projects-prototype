const express = require('express');
const paths = require('app/paths');
const { filter } = require('lodash');
const countries = require('app/data/countries');
const companies = require('app/data/companies');

const router = express.Router();
const {
  root,
  newProject,
  investmentProjects
} = paths;

router.get(root, (req, res) => res.render('index'));
router.get(investmentProjects, (req, res) => res.render('investment-projects'));

router.get(newProject, (req, res) => res.render('new-project', {
  countries,
  fields: {
    country: {
      id: 'country',
      label: 'Country of origins',
    }
  }
}));

router.post(newProject, (req, res) => {
  const formData = req.body;
  const json = JSON.stringify(formData, null, 2);
  res.send(`<h1>Form data</h1><pre>${json}</pre>`);
});

// API
router.get('/api/companies',(req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  const searchResults = filter(companies, (company) => company.name.toLowerCase().includes(searchTerm));
  res.send(searchResults);
});

module.exports = router;
