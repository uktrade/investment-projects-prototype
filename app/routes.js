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

const getProject = (project = {}) => {
  return {
    countries,
    fields: {
      title: project.title,
      description: project.description,
      country: {
        id: 'country',
        label: 'Country of origin',
        value: project.country
      }
    }
  }
};

// Root
router.get(root, (req, res) => res.render('index'));

// Investment projects
router.get(investmentProjects, (req, res) => res.render('investment-projects'));

// Project details GET
router.get(projectDetails, (req, res) => {
  if(req.session && req.session.project) {
    const project = getProject(req.session.project);
    res.render('project-details', project);
  } else {
    res.render('project-details', getProject());
  }
});

// Project details POST
router.post(projectDetails, (req, res) => {
  if(req.session) {
    req.session.project = { ...req.body };
    res.redirect(project);
  } else {
    throw new Error('Unable to write to session: POST /project-details ');
  }
});

// Project
router.get(project, (req, res) => {
  if(req.session && req.session.project) {
    const project = getProject(req.session.project);
    res.render('project', project)
  } else {
    throw new Error('Unable to read from session: GET /project');
  }
});

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
