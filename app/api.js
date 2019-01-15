const express = require('express');
const router = express.Router();

const { filter } = require('lodash');

const managers = require('app/data/client-relationship-managers');
const countries = require('app/data/countries');
const companies = require('app/data/companies');
const contacts = require('app/data/contacts');
const clients = require('app/data/clients');
const advisers = require('app/data/referral-source-advisers');

router.get('/api/countries',(req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  const searchResults = filter(countries, (country) => country.toLowerCase().includes(searchTerm));
  res.send(searchResults);
});

router.get('/api/companies',(req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  const searchResults = filter(companies, (company) => company.name.toLowerCase().includes(searchTerm));
  res.send(searchResults);
});

router.get('/api/contacts',(req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  const searchResults = filter(contacts, (contact) => contact.name.toLowerCase().includes(searchTerm));
  res.send(searchResults);
});

router.get('/api/clients',(req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  const searchResults = filter(clients, (client) => client.name.toLowerCase().includes(searchTerm));
  res.send(searchResults);
});

router.get('/api/client-relationship-managers',(req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  const searchResults = filter(managers, (manager) => manager.name.toLowerCase().includes(searchTerm));
  res.send(searchResults);
});

router.get('/api/referral-source-adviser',(req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  const searchResults = filter(advisers, (adviser) => adviser.name.toLowerCase().includes(searchTerm));
  res.send(searchResults);
});

module.exports = router;
