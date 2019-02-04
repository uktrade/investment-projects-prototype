const getValueLabels = (value, options) => {
  if(!value || !options) {
    return null;
  }

  let valueLabels = [];

  let values = [];
  if(typeof value === 'string') {
    values.push(value);
  } else if (Array.isArray(value)) {
    values = value;
  }

  values.forEach(function(value) {
    options.forEach(function(option) {
      if(value === option.value) {
        valueLabels.push(option.label);
      }
    });
  });

  return valueLabels;
};

const setValueLabels = (obj, field) => {
  const valueLabels = getValueLabels(obj[field].value, obj[field].options);
  obj[field].valueLabels = valueLabels ? valueLabels : [];
};

module.exports = {
  setValueLabels
};
