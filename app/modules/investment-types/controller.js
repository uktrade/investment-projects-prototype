const { cip } = require('app/paths');
const investmentTypes = require('./options');

const displayError = (res) => {
  res.render('investment-types', {
    error: true,
    investmentTypes,
    errorList: [
      {
        text: "Select an investment type",
        href: "#investmentType-error"
      }
    ],
    errorMessage: {
      text: "Select one of the investment types"
    },
  });
};

const investmentTypesGET = (req, res) => {
  res.render('investment-types', { investmentTypes });
};

const investmentTypesPOST = (req, res) => {
  const { investmentType } = req.body;
  if(!investmentType) {
    displayError(res);
  } else {
    if(investmentType === 'cip') {
      res.redirect(cip.createProfile);
    } else {
      throw new Error('This has not been implemented yet! Go back and try \`Capital investor profile\` instead.');
    }
  }
};

module.exports = {
  investmentTypesGET,
  investmentTypesPOST
};
