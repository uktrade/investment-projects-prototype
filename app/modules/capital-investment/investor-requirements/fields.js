const options = require('app/modules/capital-investment/investor-requirements/options');

const fields = {
  dealTicketSize: {
    id: 'dealTicketSize',
    options: options.dealTicketSize
  },
  assetClasses: {
    isComplete: false,
    energyAndInfrastructure: {
      id: 'energyAndInfrastructure',
      options: options.energyAndInfrastructure
    },
    realEstate: {
      id: 'realEstate',
      options: options.realEstate
    },
    otherAssetClasses: {
      id: 'otherAssetClasses',
    }
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

module.exports = fields;
