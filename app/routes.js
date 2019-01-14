const express = require('express');

const countries = [
  { "label": "Andorra", "value": "andorra" },
  { "label": "Angola", "value": "angola" },
  { "label": "Antigua & Barbuda", "value": "antigua-and-barbuda" },
  { "label": "Bahamas", "value": "bahamas" },
  { "label": "Bahrain", "value": "Bahrain" },
  { "label": "Bangladesh", "value": "bangladesh" },
  { "label": "Barbados", "value": "barbados" },
  { "label": "Belgium", "value": "belgium" },
  { "label": "Cambodia", "value": "cambodia" },
  { "label": "Canada", "value": "canada" },
  { "label": "Cameroon", "value": "cameroon" },
  { "label": "Cape Verde", "value": "cape-verde" },
  { "label": "Cayman Islands", "value": "cayman-islands" },
  { "label": "France", "value": "france" },
  { "label": "Germany", "value": "germany" },
  { "label": "Italy", "value": "italy" },
  { "label": "Portugal", "value": "portugal" },
  { "label": "Spain", "value": "spain" },
  { "label": "United Kingdom", "value": "uk" },
  { "label": "United Arab Emirates", "value": "uae" }
];

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
        value: project.country
      }
    }
  }
};

// Root
router.get(root, (req, res) => {
  req.session.regenerate( err => res.render('index'))
});

// Investment projects
router.get(investmentProjects, (req, res) => res.render('investment-projects'));

// Project details
router.get(projectDetails, (req, res) => {
  const project = getProject(req.session.project);
  res.render('project-details', project);
});

router.post(projectDetails, (req, res) => {
  req.session.project = { ...req.body };
  res.redirect(project);
});

// Project
router.get(project, (req, res) => {
  const project = getProject(req.session.project);
  res.render('project', project)
});

// Sessions
router.get('/sessions', (req, res) => {
  req.sessionStore.all((error, sessions) => {
    const indentTwoSpaces = 2;
    res.send(JSON.stringify(sessions, null, indentTwoSpaces));
  });
});

module.exports = router;
