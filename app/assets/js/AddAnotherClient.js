import {autoComplete} from "./auto-complete-utils";
import $ from "jquery";

const HYPHEN = '-';
const DELETE_SELECTOR = '.auto-complete-delete';
const CLIENT_CONTACT = 'client-contact';
const SHOW_DELETE_BUTTON = `show-delete-button`;
const ADD_ANOTHER_CLIENT_SELECTOR = `.add-another-client`;
const CLIENT_CONTACTS_SELECTOR = `div[id^='${CLIENT_CONTACT}']`;

class AddAnotherClient {
  constructor() {
    this.$addAnotherButton = $(ADD_ANOTHER_CLIENT_SELECTOR);
    if(this.$addAnotherButton.length) {
      this.addEventListeners();
    }
  }

  addEventListeners() {
    // Add an event listener for when a user clicks 'Add another client contact'.
    this.$addAnotherButton.click(this.onAddAnotherButtonClick.bind(this));

    const clientContacts = document.querySelectorAll(CLIENT_CONTACTS_SELECTOR);
    if (clientContacts.length > 1) {
      // Add click event listeners to all delete buttons that maybe showing.
      // By default the first client contact is not deletable.
      clientContacts.forEach((clientContact) => new DeleteEventListener(clientContact.id));
    }
  }

  onAddAnotherButtonClick() {
    const clientContacts = $(CLIENT_CONTACTS_SELECTOR);
    if(clientContacts.length === 1) {
      // The user wants to add another client contact. We need to ensure
      // the first client contact becomes deletable.
      clientContacts.closest(DELETE_SELECTOR).addClass(SHOW_DELETE_BUTTON);
      new DeleteEventListener(clientContacts.attr('id'));
    }

    // Ascertain the next id based on the previous one.
    // An id will look like 'client-contact-n' where n is a number and n > 0
    const id = this.getLastClientContactId();

    // Retrieve the id number part of the id and increment it.
    let index = this.getNextIndexFromId(id);

    // The new client contact id.
    this.clientContactId = `${CLIENT_CONTACT}-${index}`;

    // The HTML we are adding to the DOM, it includes a delete button and the
    // div along with its client contact id that we later pass to auto-complete.
    const html =
      `<div class="govuk-form-group auto-complete-delete ${SHOW_DELETE_BUTTON}">
         <label class="govuk-label" for="${this.clientContactId}">Client contact</label>
         <div id="${this.clientContactId}"></div>
         <button class="${this.clientContactId}" type="button">
           <i class="fas fa-user-times"></i>
         </button>
       </div>`;

    // Add the HTML component to the DOM just before the 'Add another' button.
    $(html).insertBefore(this.$addAnotherButton);

    // Add the delete button event listener.
    new DeleteEventListener(this.clientContactId);

    // Select the auto-complete element we've just added to the DOM.
    const clientContactIdSelector = `#${this.clientContactId}`;
    const element = $(clientContactIdSelector)[0];

    // Initialise the auto-complete component with what we've just selected above.
    autoComplete(element, this.clientContactId,'clients');
  }

  getLastClientContactId() {
    return this.$addAnotherButton.prev().find(CLIENT_CONTACTS_SELECTOR).attr('id');
  }

  getNextIndexFromId(id) {
    return parseInt(id.substring(id.lastIndexOf(HYPHEN) + 1)) + 1;
  }
}

class DeleteEventListener {
  constructor(id) {
    this.$deleteButton = $(`.${id}`);
    this.addEventListeners();
  }

  addEventListeners() {
    if(this.$deleteButton.length) {
      this.$deleteButton.click(this.onDeleteClick.bind(this));
    }
  }

  onDeleteClick() {
    this.$deleteButton.closest(DELETE_SELECTOR).remove();
    const deleteElement = $(DELETE_SELECTOR);
    if(deleteElement.length === 1) {
      deleteElement.removeClass(SHOW_DELETE_BUTTON);
    }
  }
}

export default AddAnotherClient;
