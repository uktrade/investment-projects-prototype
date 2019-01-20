const fields = {
  investorType: {
    id: 'investorType'
  },
  assetsUnderManagement: {
    id: 'assetsUnderManagement'
  },
  overallRelationshipHealth: {
    id: 'overallRelationshipHealth'
  },
  backgroundChecks: {
    id: 'backgroundChecks',
    day: null,
    month: null,
    year: null,
    person: null
  },
  description: {
    id: 'description'
  },
  clientContact: {
    id: 'clientContact'
  },
  clientRelationshipManager: {
    id: 'clientRelationshipManager'
  },
  referralSourceAdviser: {
    id: 'referralSourceAdviser'
  },
  referralSourceActivity: {
    id: 'referralSourceActivity'
  },
  specificInvestmentProgramme: {
    id: 'specificInvestmentProgramme'
  }
};

fields.incompleteFieldsCount = Object.keys(fields).length;

module.exports = fields;
