import {autoComplete} from "./auto-complete-utils";
import $ from "jquery";

const CLIENT_CONTACT = 'client-contact';
const HYPHEN = '-';

class AddAnotherClient {
  constructor() {
    this.$addAnotherButton = $('.add-another');
    this.addEventListeners();
  }

  addEventListeners() {
    if(this.$addAnotherButton.length) {
      this.$addAnotherButton.click(this.onAddAnotherButtonClick.bind(this));
    }
  }

  onAddAnotherButtonClick() {
    let index = this.getIndexFromId(this.getLastClientContactId());
    index++;

    this.clientContactId = `${CLIENT_CONTACT}-${index}`;

    const html =
      `<div class="govuk-form-group">
         <label class="govuk-label" for="${this.clientContactId}">Client contact ${index}</label>
         <div id="${this.clientContactId}"></div>
       </div>`;

    // Add this auto-complete component before the 'Add another' button.
    $(html).insertBefore(this.$addAnotherButton);

    // Select the auto-complete element we've just added and pass to autocomplete.
    const element = $(`#${this.clientContactId}`)[0];

    // Initialise the auto-complete component
    autoComplete(element, this.clientContactId,'clients');
  }

  getLastClientContactId() {
    return this.$addAnotherButton.prev().find(`div[id^='${CLIENT_CONTACT}']`).attr('id');
  }

  getIndexFromId(id) {
    return parseInt(id.substring(id.lastIndexOf(HYPHEN) + 1));
  }
}

export default AddAnotherClient;
