const express = require('express');
const router = express.Router();

const managers = require('app/data/client-relationship-managers');
const countries = require('app/data/countries');
const ukLocations = require('app/data/uk-locations');
const companies = require('app/data/companies');
const contacts = require('app/data/contacts');
const clients = require('app/data/clients');
const advisers = require('app/data/referral-source-advisers');
const assetClasses = require('app/data/asset-classes');

const { filter } = require('lodash');

const filterResults = (req, list, field) => {
  const searchTerm = req.query.term;
  return filter(list, item => {
    let str = field ? item[field] : item;
    return str.toLowerCase().includes(searchTerm.toLowerCase())
  });
};

router.get('/api/countries',(req, res) => {
  res.send(filterResults(req, countries));
});

router.get('/api/uk-locations',(req, res) => {
  res.send(filterResults(req, ukLocations));
});

router.get('/api/asset-classes-of-interest',(req, res) => {
  res.send(filterResults(req, assetClasses));
});

router.get('/api/companies',(req, res) => {
  res.send(filterResults(req, companies, 'name'));
});

router.get('/api/contacts',(req, res) => {
  res.send(filterResults(req, contacts, 'name'));
});

router.get('/api/clients',(req, res) => {
  res.send(filterResults(req, clients, 'name'));
});

router.get('/api/client-relationship-manager',(req, res) => {
  res.send(filterResults(req, managers, 'name'));
});

router.get('/api/referral-source-adviser',(req, res) => {
  res.send(filterResults(req, advisers, 'name'));
});

module.exports = router;
