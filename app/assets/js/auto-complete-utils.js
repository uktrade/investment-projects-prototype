import $ from "jquery";
import accessibleAutocomplete from "accessible-autocomplete";
import { camelCase } from "lodash";

export const inputValue = (result) => result && result.name;
export const suggestion = (result) => result && result.name;

const getData = (endpoint, query) => {
  return $.ajax({
    type: 'GET',
    url: `/api/${endpoint}/?term=${query}`
  });
};

export function apiCall(query, populateResults) {
  getData(this.endpoint, query)
    .then(result => {
      populateResults(result);
    });
}

export const autoComplete = (element, id, endpoint) =>  {
  if(element) {
    accessibleAutocomplete({
      id,
      element,
      name: camelCase(id),
      minLength: 3,
      showAllValues: true,
      source: apiCall.bind({ endpoint }),
      templates: { inputValue, suggestion },
      defaultValue: element.dataset.target
    });
  }
};
