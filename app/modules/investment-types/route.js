const express = require('express');
const router = express.Router();

const { investmentTypes, capitalInvestment } = require('app/paths');

const investTypes = [
  {
    value: "fdi",
    text: "Foreign Direct Investment (FDI)"
  },
  {
    value: "non-fdi",
    text: "Non-Foreign Direct Investment (Non-FDI)"
  },
  {
    value: "cti",
    text: "Commitment to invest"
  },
  {
    value: "cip",
    text: "Capital investor profile"
  },
  {
    value: "ci",
    text: "UK Investment Opportunity (Project or Portfolio)"
  }
];

router.get(investmentTypes, (req, res) => {
  res.render('investment-types', {
    investmentTypes: investTypes,
  });
});

router.post(investmentTypes, (req, res) => {
  const investmentType = req.body.investmentType;
  if(!investmentType) {
    res.render('investment-types', {
      error: true,
      investmentTypes: investTypes,
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
  } else {
    if(investmentType === 'cip') {
      res.redirect(capitalInvestment.createProject);
    } else {
      throw new Error('This has not been implemented yet! Go back and try \`Capital investor profile\` instead.');
    }
  }
});

module.exports = router;
