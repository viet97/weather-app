export const checkExistsSpecailChar = string => {
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
export const appCreatedBy = 'By GOD Team';
export const DEFINE_DATA_SOURCE = {
  openWeather: {key: 'openWeather', label: 'Open Weather'},
  weatherBit: {key: 'weatherBit', label: 'Weather Bit'},
  foreca: {key: 'foreca', label: 'Foreca'},
};
