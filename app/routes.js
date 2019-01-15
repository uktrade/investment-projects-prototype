const express = require('express');
const { root, investmentProjects } = require('app/paths');

const router = express.Router();

// Root
router.get(root, (req, res) => {
  req.session.regenerate( err => res.render('index'))
});

// Investment projects
router.get(investmentProjects, (req, res) => res.render('investment-projects'));

// Sessions
router.get('/sessions', (req, res) => {
  req.sessionStore.all((error, sessions) => {
    const indentTwoSpaces = 2;
    res.send(JSON.stringify(sessions, null, indentTwoSpaces));
  });
});

module.exports = router;
