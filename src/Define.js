export const checkExistsSpecailChar = (string) => {
  const format = /^[a-zA-Z0-9]*$/;
  return format.test(string);
};

export const KEYBOARD_TYPE = {
  NUMERIC: 'numeric',
  DEFAULT: 'default',
  NUMBER_PAD: 'number-pad',
  DECIMAL: 'decimal-pad',
  EMAIL: 'email-address',
  PHONE_PAD: 'phone-pad',
};

export const INFINITY_NUMBER = 99999;

export const MONTH_NAME = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MOMENT_DATE_FORMAT = 'MM/DD/YY';
