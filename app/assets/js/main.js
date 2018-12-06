import accessibleAutocomplete from 'accessible-autocomplete';
import $ from 'jquery';

function getCountries(query) {
  return $.ajax({
    type: 'GET',
    url: `/api/companies/?term=${query}`
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

$(document).ready(() => {
  initCountries();
  initCompanies();
});
