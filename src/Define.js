import {temperatureC, temperatureF} from './utils/Util';

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
export const DEFINE_UNIT_FREQUENCY = {
  '30m': {
    value: '30m',
    label: '30 minutes',
  },
  '1h': {
    value: '1h',
    label: '1 hour',
  },
  '2h': {
    value: '2h',
    label: '2 hour',
  },
  '12h': {
    value: '12h',
    label: '12 hour',
  },
};
export const DEFINE_UNITS_TEMP = {
  c: {
    value: 'c',
    label: temperatureC,
  },
  f: {
    value: 'f',
    label: temperatureF,
  },
};
export const DEFINE_UNITS_RAIN_SNOW = {
  mm: {
    value: 'mm',
    label: 'mm',
  },
  in: {
    value: 'in',
    label: 'in',
  },
};
export const DEFINE_UNITS_DISTANCE = {
  mi: {
    value: 'mi',
    label: 'mi',
  },
  km: {
    value: 'km',
    label: 'km',
  },
};
export const DEFINE_UNITS_WIND_SPEED = {
  mph: {
    value: 'mph',
    label: 'mph',
  },
  kph: {
    value: 'kph',
    label: 'kph',
  },
  'km/h': {
    value: 'km/h',
    label: 'km/h',
  },
  'm/s': {
    value: 'm/s',
    label: 'm/s',
  },
};
export const DEFINE_UNITS_PRESSURE = {
  mBar: {
    value: 'mBar',
    label: 'mBar',
  },
  inHg: {
    value: 'inHg',
    label: 'inHg',
  },
  psi: {
    value: 'psi',
    label: 'psi',
  },
  bar: {
    value: 'bar',
    label: 'bar',
  },
  mmHg: {
    value: 'mmHg',
    label: 'mmHg',
  },
};
export const DEFINE_NOTIFICATION = {
  daily: {
    value: 'daily',
    label: 'Daily Notification',
  },
  severe: {
    value: 'severe',
    label: 'Severe Alerts',
  },
  rain: {
    label: 'Rain & Snow Alarm',
    value: 'rain',
  },
};
export const DEFINE_THEME_COLOR = {
  light: {value: 'light', label: 'Light Mode'},
  dark: {value: 'dark', label: 'Dark Mode'},
};
export const DEFINE_TIME_FORMAT = {
  '24h': {value: '24h', label: '24 hours'},
  '12h': {value: '12h', label: '12 hours'},
};
export const DEFINE_LAYOUT = {
  status: {
    value: 'status',
    label: 'Status',
    index: 1,
    active: 1,
  },
  detail: {
    value: 'detail',
    label: 'Detail',
    index: 2,
    active: 1,
  },
  hourly: {
    value: 'hourly',
    label: 'Hourly',
    index: 3,
    active: 1,
  },
  sunAndMoon: {
    value: 'sunAndMoon',
    label: 'Sun and Moon',
    index: 4,
    active: 1,
  },
  windAndPressure: {
    value: 'Wind and Pressure',
    label: 'windAndPressure',
    index: 5,
    active: 1,
  },
  airQuality: {
    value: 'airQuality',
    label: 'Air Quality',
    index: 6,
    active: 1,
  },
  radar: {
    value: 'radar',
    label: 'Radar',
    index: 7,
    active: 0,
  },
  covid: {
    value: 'covid',
    label: 'Covid',
    index: 8,
    active: 0,
  },
};

export const DEFINE_LANGUAGE = {
  eng: {
    label: 'English : English',
    value: 'eng',
  },
  vi: {
    label: 'Vietnamese: Tiếng Việt',
    value: 'vi',
  },
  ca: {
    label: 'Catalan : Català',
    value: 'ca',
  },
};
