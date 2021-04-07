import { temperatureC, temperatureF } from './utils/Util';
import { getBootloader } from 'react-native-device-info';
import { Colors } from './themes/Colors';
import { languagesKeys } from './modules/i18n/defined';
// import I18n from './modules/i18n/I18n';

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
    fullName: languagesKeys.carbonMonoxide,
    key: 'co',
  },
  NO: {
    name: 'NO',
    fullName: languagesKeys.nitrogenMonoxide,
    key: 'no',
  },
  NO2: {
    name: 'NO2',
    fullName: languagesKeys.nitrogenDioxide,
    key: 'no2',
  },
  O3: {
    name: 'O3',
    fullName: languagesKeys.ozone,
    key: 'o3',
  },
  SO2: {
    name: 'SO2',
    fullName: languagesKeys.sulphurDioxide,
    key: 'so2',
  },
  PM2_5: {
    name: 'PM2.5',
    fullName: languagesKeys.fineParticlesMatter,
    key: 'pm25',
  },
  PM10: {
    name: 'PM10',
    fullName: languagesKeys.coarseParticulateMatter,
    key: 'pm10',
  },
  NH3: {
    name: 'NH3',
    fullName: languagesKeys.ammonia,
    key: 'nh3',
  },
};

export const AIR_POLLUTION_LEVEL = {
  GOOD: {
    min: 0,
    max: 50,
    rangeText: '0 - 50',
    color: Colors.windLineColor,
    name: languagesKeys.good,
    description:
      'Air quality is considered satisfactory, and air pollution poses little or no risk.',
    flex: 1,
  },
  MODERATE: {
    min: 51,
    max: 100,
    rangeText: '51 - 100',
    color: Colors.moderate,
    name: languagesKeys.moderate,
    description:
      'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
    flex: 1,
  },
  UNHEALTHY_SENSITIVE: {
    min: 101,
    max: 150,
    rangeText: '101 - 150',
    color: Colors.unhealthy_sensitive,
    name: languagesKeys.unhealthySensitive,
    description:
      'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
    flex: 1,
  },
  UNHEALTHY: {
    min: 151,
    max: 200,
    rangeText: '151 - 200',
    color: Colors.unhealthy,
    name: languagesKeys.unhealthy,
    description:
      'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects',
    flex: 1,
  },
  VERY_UNHEALTHY: {
    min: 201,
    max: 300,
    rangeText: '201 - 300',
    color: Colors.very_unhealthy,
    name: languagesKeys.veryUnhealthy,
    description:
      'Health warnings of emergency conditions. The entire population is more likely to be affected.',
    flex: 2,
  },
  HAZARDOUS: {
    min: 300,
    max: INFINITY_NUMBER,
    rangeText: '300+',
    color: Colors.hazardous,
    name: languagesKeys.hazardous,
    description:
      'Health alert: everyone may experience more serious health effects.',
    flex: 4,
  },
};

export const MAX_AIR_QUALITY_INDEX = 500;

export const MOMENT_DATE_FORMAT = 'MM/DD/YY';
export const appCreatedBy = 'By GOD Team';
export const DEFINE_DATA_SOURCE = {
  openWeather: {
    key: 'openWeather',
    value: 'openWeather',
    label: 'Open Weather',
  },
  weatherBit: { key: 'weatherBit', value: 'weatherBit', label: 'Weather Bit' },
  foreca: { key: 'foreca', value: 'foreca', label: 'Foreca' },
};
export const DEFINE_UNIT_FREQUENCY = {
  '30m': {
    value: '30m',
    label: '30 minutes',
    languageKey: languagesKeys.time30m,
  },
  '1h': {
    value: '1h',
    label: '1 hour',
    languageKey: languagesKeys.time1h,
  },
  '2h': {
    value: '2h',
    label: '2 hour',
    languageKey: languagesKeys.time2h,
  },
  '12h': {
    value: '12h',
    label: '12 hour',
    languageKey: languagesKeys.time12h,
  },
};
export const DEFINE_UNITS_TEMP = {
  c: {
    value: 'c',
    label: '°C',
  },
  f: {
    value: 'f',
    label: '°F',
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
  light: {
    value: 'light',
    label: 'Light Mode',
    languageKey: languagesKeys.lightMode,
  },
  dark: {
    value: 'dark',
    label: 'Dark Mode',
    languageKey: languagesKeys.darkMode,
  },
};
export const DEFINE_TIME_FORMAT = {
  '24h': { value: '24h', label: '24 hours', languageKey: languagesKeys.time24h },
  '12h': { value: '12h', label: '12 hours', languageKey: languagesKeys.time12h },
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
    txtSub: 'English',
    value: 'eng',
  },
  vi: {
    label: 'Vietnamese: Tiếng Việt',
    txtSub: 'Tiếng Việt',
    value: 'vi',
  },
  ca: {
    label: 'Catalan : Català',
    txtSub: 'Català',
    value: 'ca',
  },
  we: {
    label: 'Welsh : Cymraeg',
    txtSub: 'Cymraeg',
    value: 'we',
  },
  sv: {
    label: 'Swedish : Svenska',
    txtSub: 'Svenska',
    value: 'sv',
  },
  sl: {
    label: 'Sloval : Slovenský',
    txtSub: 'Slovenský',
    value: 'sl',
  },
  pt: {
    label: 'Portuguese : Português',
    txtSub: 'Português',
    value: 'pt',
  },
  pl: {
    label: 'Polish : Polskie',
    txtSub: 'Polskie',
    value: 'pl',
  },
  it: {
    label: 'Italian : Italiano',
    txtSub: 'Italiano',
    value: 'it',
  },
  de: {
    label: 'German : Deutsch',
    txtSub: 'Deutsch',
    value: 'de',
  },
};

export const unitsQuery = {
  openWeather: {
    temp: {
      [DEFINE_UNITS_TEMP.c.value]: 'metric',
      [DEFINE_UNITS_TEMP.f.value]: 'imperial',
    },
  },
  weatherBit: {
    temp: {
      [DEFINE_UNITS_TEMP.c.value]: 'M',
      [DEFINE_UNITS_TEMP.f.value]: 'I',
    },
  },
};
