const { handle404, handleError} = require('app/error/handlers');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const express = require('express');
const path = require('path');

const locals = require('app/locals');
const api = require('app/api');
const routes = require('app/routes');
const { isArray, isString, isObject, isEmpty, isUndefined } = require('lodash');
const session = require('app/session/session');
const sessionCheck = require('app/session/sessionCheck');
const app = express();

app.use(session);
app.use(sessionCheck);
app.enable('trust proxy');

const dist = path.resolve(__dirname, '../dist');
const images = path.resolve(__dirname, 'assets/images');
const govukFrontend = path.resolve(__dirname, '../node_modules/govuk-frontend');

app.use('/dist', express.static(dist));
app.use('/assets/images', express.static(images));
app.use('/assets', express.static(govukFrontend));
app.use('/assets', express.static(`${govukFrontend}/assets`));

nunjucks.configure([
  'app/macro/',
  'app/templates',
  'app/modules/investment-types/',
  'node_modules/govuk-frontend/',
  'node_modules/govuk-frontend/components/',
  'app/modules/investment-projects/',
  'app/modules/capital-investor-profile/create-profile/',
  'app/modules/capital-investor-profile/large-capital/',
  'app/modules/capital-investor-profile/large-capital/location',
  'app/modules/capital-investor-profile/large-capital/investor-details',
  'app/modules/capital-investor-profile/large-capital/investor-profile',
  'app/modules/capital-investor-profile/large-capital/investor-requirements',
], {
  autoescape: true,
  express: app,
})
.addGlobal('isArray',  value => isArray(value))
.addGlobal('isString', value => isString(value))
.addGlobal('isObject', value => isObject(value))
.addGlobal('isEmpty',  value => isEmpty(value))
.addGlobal('isUndefined',  value => isUndefined(value));

app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(locals);
app.use(api);
routes(app);
app.use(handle404);
app.use(handleError);

module.exports = app;
