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
    value: "ci-investor-opportunity",
    text: "CI Investor Opportunity"
  },
  {
    value: "ci",
    text: "UK Investment Need (Project or Portfolio)"
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
          text: "Please select an investment type",
          href: "#investmentType-error"
        }
      ],
      errorMessage: {
        text: "Select one of the investment types"
      },
    });
  } else {
    if(investmentType === 'ci-investor-opportunity') {
      res.redirect(capitalInvestment.createProject);
    } else {
      throw new Error('This has not been implemented yet! Go back and try \`CI Investor Opportunity\` instead.');
    }
  }
});

module.exports = router;
