const fields = {
  ukLocation: {
    id: 'ukLocation'
  },
  ukLocationNotes: {
    id: 'ukLocationNotes'
  },
  country: {
    id: 'country'
  }
};

fields.incompleteFieldsCount = Object.keys(fields).length;

module.exports = fields;
