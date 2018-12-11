const express = require('express');
const { filter } = require('lodash');
const countries = require('app/data/countries');
const companies = require('app/data/companies');
const {
  root,
  project,
  projectDetails,
  investmentProjects
} = require('app/paths');

const router = express.Router();

const getProject = (data = {}) => {
  console.log('---------------------------------------------');
  console.log('             getProject(data)                ');
  console.log('---------------------------------------------');
  console.log(JSON.stringify(data, null, 2));

  return {
    countries,
    fields: {
      title: data.title,
      description: data.description,
      country: {
        id: 'country',
        label: 'Country of origin',
        value: data.country
      }
    }
  }
};

// Root
router.get(root, (req, res) => res.render('index'));

// Investment projects
router.get(investmentProjects, (req, res) => res.render('investment-projects'));

// Project details
router.get(projectDetails, (req, res) => res.render('project-details', getProject(req.session.project)));

router.post(projectDetails, (req, res) => {
  req.session.project = { ...req.body };
  res.redirect(project);
});

// Project
router.get(project, (req, res) => res.render('project', getProject(req.session.project)));

// Sessions
router.get('/sessions', (req, res) => {
  req.sessionStore.all((error, sessions) => {
    const indentTwoSpaces = 2;
    res.send(JSON.stringify(sessions, null, indentTwoSpaces));
  });
});

// API
router.get('/api/companies',(req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  const searchResults = filter(companies, (company) => company.name.toLowerCase().includes(searchTerm));
  res.send(searchResults);
});

module.exports = router;
