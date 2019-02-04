import $ from "jquery";

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
  }
}

export default Details;
