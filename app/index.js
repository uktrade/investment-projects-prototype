const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const express = require('express');
const path = require('path');

const routes = require('app/routes');
const app = express();

const images = path.resolve(__dirname, 'assets/images');
const css = path.resolve(__dirname, 'assets/styles/css');
const govukFrontend = path.resolve(__dirname, '../node_modules/govuk-frontend');

app.use('/css', express.static(css));
app.use('/assets/images', express.static(images));
app.use('/govuk-frontend', express.static(govukFrontend));
app.use('/assets', express.static(`${govukFrontend}/assets`));

nunjucks.configure([
  'app/templates',
  'node_modules/govuk-frontend/',
  'node_modules/govuk-frontend/components/'
], {
  autoescape: true,
  express: app
});

app.set('view engine', 'html');

// Support for parsing data in POSTs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

module.exports = app;
