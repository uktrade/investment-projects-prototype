const controller = (req, res) => {
  const {
    investorDetails,
    investorRequirements,
    location } = req.session.ci;

  investorDetails.edit = false;
  investorRequirements.edit = false;
  location.edit = false;

  const fields = { ...req.session.ci };
  res.render('investor-profile', { fields });
};

module.exports = controller;
