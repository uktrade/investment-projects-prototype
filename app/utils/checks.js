const notDefined = val => typeof val === 'undefined' || val === null;
const defined = val => !notDefined(val);
const isObject = obj => typeof obj === 'object' && obj !== null && !Array.isArray(obj);

module.exports = { notDefined, defined, isObject }
