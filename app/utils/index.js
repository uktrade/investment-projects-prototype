const { isEmpty } = require('lodash');

const getValueKeys = (obj) => {
  return Object.keys(obj).filter(key => {
    return !isEmpty(obj[key].value)
  });
};

module.exports = {
  getValueKeys
};
