const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const express = require('express');
const path = require('path');

const routes = require('app/routes');
const app = express();

const dist = path.resolve(__dirname, '../dist');
const images = path.resolve(__dirname, 'assets/images');
const govukFrontend = path.resolve(__dirname, '../node_modules/govuk-frontend');

app.use('/assets/dist', express.static(dist));
app.use('/assets/images', express.static(images));
app.use('/assets', express.static(govukFrontend));
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

module.exports = app;
