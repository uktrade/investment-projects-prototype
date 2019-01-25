import { initAutoCompleteFields } from './auto-complete-fields';
import AddAnotherClient from './AddAnotherClient';
import Details from './Details';
import $ from 'jquery';

$(document).ready(() => {
  initAutoCompleteFields();
  new Details();
  new AddAnotherClient();
});
