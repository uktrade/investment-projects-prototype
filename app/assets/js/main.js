import accessibleAutocomplete from 'accessible-autocomplete';
import $ from 'jquery';

function getData(endpoint, query) {
  return $.ajax({
    type: 'GET',
    url: `/api/${endpoint}/?term=${query}`
  });
}

function inputValue(result) {
  return result && result.name
}

function suggestion(result) {
  return result && result.name
}

function apiCall(query, populateResults) {
  getData(this.endpoint, query)
    .then(result => {
      populateResults(result);
    });
}

const EXPAND_ALL = 'Expand all';
const COLLAPSE_ALL = 'Collapse all';

class Details {
  constructor() {
    this.details = $('details');
    this.summaries = this.details.find('summary');
    this.divs = this.details.find('div.govuk-details__text');
    this.expandAll = $('#expand-all')[0];
    this.expandedMap = {};

    this.addEventListeners();
  }

  addEventListeners() {
    if(this.expandAll && this.summaries.length) {
      this.expandAll.onclick = this.onExpandAllClick.bind(this);
      this.summaries.map((index, summary) => summary.onclick = this.onSummaryClick.bind(this));
    }
  }

  onExpandAllClick() {
    const expandAll = this.expandAll.text === EXPAND_ALL;
    this.expandAll.text = expandAll ? COLLAPSE_ALL : EXPAND_ALL;
    this.details.map((index, detail) => {
      if(expandAll) {
        $(detail).attr('open', expandAll);
      } else {
        $(detail).removeAttr('open');
      }
    });
    this.summaries.map((index, summary) => $(summary).attr('aria-expanded', expandAll));
    this.divs.map((index, div) => $(div).attr('aria-hidden', !expandAll));
    this.expandedMap = {};
  }

  onSummaryClick(event) {
    // When the user clicks the edit button we don't want
    // to expand or collapse the details section.
    // const target = $(event.target);
    // if (target.is(":button")) {
    //   return;
    // }

    // Update the `Expand all` text if all details are either manually expanded or collapsed.
    const summary = $(event.currentTarget);
    const summaryText = summary.first().text().trim();
    const hasExpanded = summary.attr('aria-expanded') === 'true';
    this.expandedMap[summaryText] = hasExpanded;
    const values = Object.values(this.expandedMap);
    if( values.length === this.details.length) {
      if(values[0] && values[1] && values[2]) {
        this.expandAll.text = COLLAPSE_ALL;
      } else if(!values[0] && !values[1] && !values[2]) {
        this.expandAll.text = EXPAND_ALL;
      }
    }

    // Show/hide the edit button.
    //const button = $(summary).find('button');
    //button.css('display', hasExpanded ? 'block' : 'none');
  }
}

function initCountries() {
  const element = document.querySelector('#country');
  if(element) {
    accessibleAutocomplete({
      element,
      id: 'country',
      name: 'country',
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.country,
      source: apiCall.bind({ endpoint: 'countries' })
    });
  }
}

function initUkLocation() {
  const element = document.querySelector('#uk-location');
  if(element) {
    accessibleAutocomplete({
      element,
      id: 'uk-location',
      name: 'ukLocation',
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.ukLocation,
      source: apiCall.bind({ endpoint: 'uk-locations' })
    });
  }
}

function initCompanies() {
  const element = document.querySelector('#company-container');
  if(element) {
    accessibleAutocomplete({
      element,
      id: 'company',
      name: 'company',
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.company,
      templates: {
        inputValue: function(result) {
          return result && result.name;
        },
        suggestion: (result) => result && `<strong>${result.name}</strong><div>${result.address}</div>`
      },
      source: apiCall.bind({ endpoint: 'companies' })
    });
  }
}

function initContacts() {
  const element = document.querySelector('#background-checks-person');
  if(element) {
    accessibleAutocomplete({
      element,
      id: 'background-checks-person',
      name: 'backgroundChecksPerson',
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.backgroundChecksPerson,
      templates: {
        inputValue: (result) => result && `${result.name} (${result.team})`,
        suggestion: (result) => result && `${result.name} <span>(${result.team})</span>`
      },
      source: apiCall.bind({ endpoint: 'contacts' })
    });
  }
}

function initClients() {
  const element = document.querySelector('#clients-contact');
  if(element) {
    accessibleAutocomplete({
      element,
      id: 'client-contact',
      name: 'clientContact',
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.clientContact,
      templates: { inputValue, suggestion },
      source: apiCall.bind({ endpoint: 'clients' })
    });
  }
}

function initClientRelationshipManager() {
  const element = document.querySelector('#client-relationship-manager');
  if(element) {
    accessibleAutocomplete({
      element,
      id: 'client-relationship-manager',
      name: 'clientRelationshipManager',
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.clientRelationshipManager,
      templates: { inputValue, suggestion },
      source: apiCall.bind({ endpoint: 'client-relationship-managers' })
    });
  }
}

function initClientReferralSourceAdviser() {
  const element = document.querySelector('#referral-source-adviser');
  if(element) {
    accessibleAutocomplete({
      element,
      id: 'referral-source-adviser',
      name: 'referralSourceAdviser',
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.referralSourceAdviser,
      templates: { inputValue, suggestion },
      source: apiCall.bind({ endpoint: 'referral-source-adviser' })
    });
  }
}

function assetClassesOfInterest() {
  const element = document.querySelector('#asset-classes-of-interest');
  if(element) {
    accessibleAutocomplete({
      element,
      id: 'asset-classes-of-interest',
      name: 'assetClassesOfInterest',
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.assetClassesOfInterest,
      source: apiCall.bind({ endpoint: 'asset-classes-of-interest' })
    });
  }
}

$(document).ready(() => {
  initCountries();
  initUkLocation();
  initCompanies();
  initContacts();
  initClients();
  initClientRelationshipManager();
  initClientReferralSourceAdviser();
  assetClassesOfInterest();
  new Details();
});
