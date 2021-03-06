import { apiCall, autoComplete, inputValue } from "./auto-complete-utils";
import accessibleAutocomplete from "accessible-autocomplete";
import { camelCase } from "lodash";

const initCountries = () => {
  const id = 'country';
  const element = document.querySelector(`#${id}`);
  if(element) {
    accessibleAutocomplete({
      id,
      element,
      name: camelCase(id),
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.target,
      source: apiCall.bind({ endpoint: 'countries' })
    });
  }
};

const initUkLocation = () => {
  const id = 'uk-location';
  const element = document.querySelector(`#${id}`);
  if(element) {
    accessibleAutocomplete({
      id,
      element,
      name: camelCase(id),
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.target,
      source: apiCall.bind({ endpoint: `${id}s` })
    });
  }
};

const initCompanies = () => {
  const id = 'company';
  const element = document.querySelector(`#${id}`);
  if(element) {
    accessibleAutocomplete({
      id,
      element,
      name: camelCase(id),
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.target,
      source: apiCall.bind({ endpoint: 'companies' }),
      templates: {
        inputValue,
        suggestion: (result) => result && `<strong>${result.name}</strong><div>${result.address}</div>`
      }
    });
  }
};

const initContacts = () => {
  const id = 'background-checks-person';
  const element = document.querySelector(`#${id}`);
  if(element) {
    accessibleAutocomplete({
      id,
      element,
      name: camelCase(id),
      minLength: 3,
      showAllValues: true,
      defaultValue: element.dataset.target,
      source: apiCall.bind({ endpoint: 'contacts' }),
      templates: {
        inputValue: (result) => result && `${result.name} (${result.team})`,
        suggestion: (result) => result && `${result.name} <span>(${result.team})</span>`
      },
    });
  }
};

const initClientContactsAutoComplete = () => {
  const id = 'client-contact';
  const elements = document.querySelectorAll(`div[id^='${id}']`);
  elements.forEach((element, index) => autoComplete(element, `${id}-${index + 1}`, 'clients'));
};

export const initAutoCompleteFields = () => {
  initCountries();
  initUkLocation();
  initCompanies();
  initContacts();
  initClientContactsAutoComplete();
};
