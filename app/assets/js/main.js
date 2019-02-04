import { initAutoCompleteFields } from './auto-complete-fields';
import AddAnotherClient from './add-another-client';
import Details from './details';
import $ from 'jquery';

$(document).ready(() => {
  initAutoCompleteFields();
  new Details();
  new AddAnotherClient();
});
