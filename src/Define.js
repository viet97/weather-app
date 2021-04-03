import {getBootloader} from 'react-native-device-info';
import {Colors} from './themes/Colors';

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
export const WEEK_DAY_NAME = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const WEEK_FULL_DAY_NAME = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const AIR_TYPE = [
  {
    status: 'Good',
    value: 1,
    color: Colors.windLineColor,
  },
  {
    status: 'Fair',
    value: 1,
    color: Colors.windLineColor,
  },
  {
    status: 'Moderate',
    value: 1,
    color: Colors.windLineColor,
  },
  {
    status: 'Poor',
    value: 1,
    color: Colors.windLineColor,
  },
  {
    status: 'Very Poor',
    value: 1,
    color: Colors.windLineColor,
  },
];

export const AIR_LIST = {
  CO: {
    name: 'CO',
    fullName: 'Carbon monoxide',
    key: 'co',
  },
  NO: {
    name: 'NO',
    fullName: 'Nitrogen monoxide',
    key: 'no',
  },
  NO2: {
    name: 'NO2',
    fullName: 'Nitrogen dioxide',
    key: 'no2',
  },
  O3: {
    name: 'O3',
    fullName: 'Ozone',
    key: 'o3',
  },
  SO2: {
    name: 'SO2',
    fullName: 'Sulphur dioxide',
    key: 'so2',
  },
  PM2_5: {
    name: 'PM2.5',
    fullName: 'Fine particles matter',
    key: 'pm2_5',
  },
  PM10: {
    name: 'PM10',
    fullName: 'Coarse particulate matter',
    key: 'pm10',
  },
  PM2_5: {
    name: 'NH3',
    fullName: 'Ammonia',
    key: 'nh3',
  },
};

export const MOMENT_DATE_FORMAT = 'MM/DD/YY';
export const appCreatedBy = 'By GOD Team';
export const DEFINE_DATA_SOURCE = {
  openWeather: {key: 'openWeather', label: 'Open Weather'},
  weatherBit: {key: 'weatherBit', label: 'Weather Bit'},
  foreca: {key: 'foreca', label: 'Foreca'},
};
