const props = process.env;

const prop = (propName, defaultValue) => props[`REACT_APP_${propName}`] || defaultValue;
const propIsTrue = propName => prop(propName, '').toLowerCase() === 'true';

export { props, prop, propIsTrue };
