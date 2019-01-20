const options = require('app/modules/capital-investment/client-requirements/options');

const fields = {
  dealTicketSize: {
    id: 'dealTicketSize',
    options: options.dealTicketSize
  },
  assetClassesOfInterest: {
    id: 'assetClassesOfInterest',
  },
  typesOfInvestment: {
    id: 'typesOfInvestment',
    options: options.typesOfInvestment
  },
  minimumRateOfReturn: {
    id: 'minimumRateOfReturn',
    options: options.minimumRateOfReturn
  },
  timeHorizonTenure: {
    id: 'timeHorizonTenure',
    options: options.timeHorizonTenure
  },
  restrictionsConditions: {
    id: 'restrictionsConditions',
    options: options.restrictionsConditions
  },
  projectStagesConsidered: {
    id: 'projectStagesConsidered',
    options: options.projectStagesConsidered
  },
  minimumEquityPercentage: {
    id: 'minimumEquityPercentage',
    options: options.minimumEquityPercentage
  },
  desiredDealRole: {
    id: 'desiredDealRole',
    options: options.desiredDealRole
  }
};

fields.incompleteFieldsCount = Object.keys(fields).length;

module.exports = fields;
