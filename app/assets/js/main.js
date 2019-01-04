import accessibleAutocomplete from 'accessible-autocomplete';
import $ from 'jquery';

function getCountries(query) {
  return $.ajax({
    type: 'GET',
    url: `/api/companies/?term=${query}`
  });
}

function getContacts(query) {
  return $.ajax({
    type: 'GET',
    url: `/api/contacts/?term=${query}`
  });
}

function getClients(query) {
  return $.ajax({
    type: 'GET',
    url: `/api/clients/?term=${query}`
  });
}

function getClientRelationshipManager(query) {
  return $.ajax({
    type: 'GET',
    url: `/api/client-relationship-managers/?term=${query}`
  });
}

function getReferralSourceAdviser(query) {
  return $.ajax({
    type: 'GET',
    url: `/api/referral-source-adviser/?term=${query}`
  });
}

function initCountries() {
  const country = document.querySelector('#country');
  if(country) {
    accessibleAutocomplete.enhanceSelectElement({
      selectElement: country,
      minLength: 3,
      showAllValues: true
    });
  }
}

function initCompanies() {
  const company = document.querySelector('#company-container');
  if(company) {
    accessibleAutocomplete({
      element: company,
      id: 'company',
      name: 'company',
      minLength: 3,
      showAllValues: true,
      templates: {
        inputValue: (result) => result && result.name,
        suggestion: (result) => result && `<strong>${result.name}</strong><div>${result.address}</div>`
      },
      source: (query, populateResults) => {
        getCountries(query)
          .then(result => {
            populateResults(result);
          });
      }
    });
  }
}

function initContacts() {
  const contacts = document.querySelector('#contacts-container');
  if(contacts) {
    accessibleAutocomplete({
      element: contacts,
      id: 'background-checks-person',
      name: 'background-checks-person',
      minLength: 3,
      showAllValues: true,
      templates: {
        inputValue: (result) => result && `${result.name} (${result.team})`,
        suggestion: (result) => result && `<strong>${result.name}</strong><span> (${result.team})</span>`
      },
      source: (query, populateResults) => {
        getContacts(query)
          .then(result => {
            populateResults(result);
          });
      }
    });
  }
}

function initClients() {
  const clients = document.querySelector('#clients-contact-container');
  if(clients) {
    accessibleAutocomplete({
      element: clients,
      id: 'client-contact',
      name: 'client-contact',
      minLength: 3,
      showAllValues: true,
      templates: {
        inputValue: (result) => result && result.name,
        suggestion: (result) => result && `<strong>${result.name}</strong>`
      },
      source: (query, populateResults) => {
        getClients(query)
          .then(result => {
            populateResults(result);
          });
      }
    });
  }
}

function initClientRelationshipManager() {
  const managers = document.querySelector('#client-relationship-manager-container');
  if(managers) {
    accessibleAutocomplete({
      element: managers,
      id: 'client-relationship-manager',
      name: 'client-relationship-manager',
      minLength: 3,
      showAllValues: true,
      templates: {
        inputValue: (result) => result && result.name,
        suggestion: (result) => result && `<strong>${result.name}</strong>`
      },
      source: (query, populateResults) => {
        getClientRelationshipManager(query)
          .then(result => {
            populateResults(result);
          });
      }
    });
  }
}

function initClientReferralSourceAdviser() {
  const referralSourceAdviser = document.querySelector('#referral-source-adviser-container');
  if(referralSourceAdviser) {
    accessibleAutocomplete({
      element: referralSourceAdviser,
      id: 'referral-source-adviser',
      name: 'referral-source-adviser',
      minLength: 3,
      showAllValues: true,
      templates: {
        inputValue: (result) => result && result.name,
        suggestion: (result) => result && `<strong>${result.name}</strong>`
      },
      source: (query, populateResults) => {
        getReferralSourceAdviser(query)
          .then(result => {
            populateResults(result);
          });
      }
    });
  }
}

$(document).ready(() => {
  initCountries();
  initCompanies();
  initContacts();
  initClients();
  initClientRelationshipManager();
  initClientReferralSourceAdviser();
});
