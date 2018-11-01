// @flow

const filterWithText = (dataset: Array<Object>, filter: string, value: any): Array<Object> => {
  if (filter === 'all') return dataset;

  const regexSubstring = new RegExp(value, 'i');

  const datasetFiltered = dataset.filter(item => regexSubstring.test(item[filter]));

  return datasetFiltered;
};

const filterWithAritimetic = (dataset: Array<Object>, filter: string, operator: string, value: any): Array<Object> => {
  const verifyOperatorValue = {
    '<': (val, currentValue) => value > currentValue,
    '>=': (val, currentValue) => value >= currentValue,
    '=': (val, currentValue) => value === currentValue,
    '>': (val, currentValue) => value < currentValue,
    '<=': (val, currentValue) => value <= currentValue,
  };

  const datasetFiltered = dataset.filter(product => verifyOperatorValue[operator](value, product[filter]));

  return datasetFiltered;
};

const filterList = (filterConfig: Object): Array<Object> => {
  const {
    operator,
    dataset,
    filter,
    value,
  } = filterConfig;

  return operator
    ? filterWithAritimetic(dataset, filter, operator, value)
    : filterWithText(dataset, filter, value);
};

export default filterList;
