import {isNumber} from '../modules/Lodash';
import {myLog} from '../Debug';
import {md5} from '../modules/CryptoJS';
import {getConfigDevice} from '../ConfigDevice';
import Config from '../Config';
import {
  AIR_POLLUTION_LEVEL,
  MONTH_NAME,
  WEEK_DAY_NAME,
  WEEK_FULL_DAY_NAME,
} from '../Define';
const appInfo = {
  deviceId: getConfigDevice().deviceId,
  deviceType: getConfigDevice().deviceType,
  deviceName: getConfigDevice().deviceName,
};
const TAG = 'Util : ';

function convertToNumber(item) {
  if (item === null || item === undefined) return 0;
  const number = Number(item);
  if (number === NaN) return 0;
  return number;
}

export const parseJSON = (opts, defaults) => {
  if (opts !== null && typeof opts === 'object') {
    return opts;
  }
  defaults = defaults || null;
  try {
    defaults = JSON.parse(opts);
  } catch (e) {
    myLog(TAG, 'Lỗi parse Json');
  }
  return defaults;
};

export const getStateForKeys = (state = {}, keys = []) => {
  const length = keys.length;
  if (length === 0 || Object.keys(state).length === 0) {
    return null;
  }
  let output = state;
  for (let i = 0; i < length; i++) {
    output = output.get(keys[i]);
  }
  return output && output.toJS && typeof output.toJS === 'function'
    ? output.toJS()
    : output;
};

export const checkKeyExistObject = (obj = {}, keys = []) => {
  const length = keys.length;
  if (!obj || length === 0 || Object.keys(obj).length === 0) {
    return false;
  }
  let output = obj;
  for (let i = 0; i < length; i++) {
    output = output[keys[i]];
    if (!output) {
      return false;
    }
  }
  if (!output) {
    return false;
  }
  return true;
};

export const getValueFromObjectByKeys = (
  obj = {},
  keys = [],
  defaultValue = undefined,
) => {
  const length = keys.length;
  if (!obj || length === 0 || Object.keys(obj).length === 0) {
    return defaultValue;
  }
  let output = obj;
  for (let i = 0; i < length; i++) {
    output = output[keys[i]];
    if (output === 0) {
      return 0;
    }
    if (!output) {
      return defaultValue;
    }
  }
  if (output === 0) {
    return 0;
  }
  if (!output) {
    return defaultValue;
  }
  return output || defaultValue;
};

export const formatMoney = ({amount, curency = ' VND'}) => {
  return !isNumber(amount)
    ? 0 + curency
    : amount.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c;
      }) + curency;
};

export const formatTimeVideo = ({seconds, type}) => {
  const hh = ~~(seconds / 3600);
  const mm = ~~(seconds / 60) % 60;
  const ss = ~~seconds % 60;
  return (
    (hh ? (hh < 10 ? '0' : '') + hh + ':' : type === 1 ? '00:' : '') +
    (mm < 10 ? '0' : '') +
    mm +
    ':' +
    (ss < 10 ? '0' : '') +
    ss
  );
};

export const checkInternet = () => {
  return navigator.onLine;
};

export const nowCustom = () => {
  return Date.now();
};

export const sortObjectByKey = unordered => {
  const ordered = {};
  Object.keys(unordered)
    .sort()
    .forEach(function (key) {
      ordered[key] = unordered[key];
    });
  return ordered;
};

export const createSignature = obj => {
  return md5(Object.values(obj).join('$') + '$#123Ag');
};

export const getParamsEnterGuest = () => {
  const signature = createSignature({
    deviceType: appInfo.deviceType,
    deviceId: appInfo.deviceId,
    versionCode: Config.versionCode,
    deviceName: appInfo.deviceName,
  });
  const params = {
    deviceType: appInfo.deviceType,
    deviceId: appInfo.deviceId,
    versionCode: Config.versionCode,
    deviceName: appInfo.deviceName,
    signature,
  };
  return params;
};

export const checkNetwork = (
  {isShowPopup = false, isShowToast = false} = {
    isShowPopup: false,
    isShowToast: false,
  },
) => {
  const networkModule = require('../modules/NetworkStateModule').NetworkModule;
  if (!networkModule.isConnected) {
    if (isShowPopup) {
      //show popup
    } else if (isShowToast) {
      //show toast
    }
    return false;
  }
  return true;
};

export const checkDiffTwoObject = (obj1 = {}, obj2 = {}) => {
  let isDiff = false;
  if ((obj1 && !obj2) || (!obj1 && obj2)) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return true;
  } else if (typeof obj1 !== typeof obj2) {
    return true;
  } else {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return true;
    } else {
      Object.keys(obj1).map(key => {
        if (
          typeof obj1[key] === 'string' &&
          typeof obj1[key] === typeof obj2[key] &&
          obj1[key] !== obj2[key]
        ) {
          isDiff = true;
        }
        if (
          typeof obj1[key] === 'number' &&
          typeof obj1[key] === typeof obj2[key] &&
          obj1[key] !== obj2[key]
        ) {
          isDiff = true;
        }
      });
      return isDiff;
    }
  }
};

export const addQueryToUrl = (url, query = {}) => {
  if (!query || typeof query !== 'object' || Object.keys(query).length === 0)
    return url;
  let urlReturn = url;
  if (url && typeof url === 'string') {
    if (url.indexOf('?') !== -1) {
      Object.keys(query).map(keyQ => {
        if (keyQ && query[keyQ]) {
          urlReturn += `&${keyQ}=${query[keyQ]}`;
        }
      });
      return urlReturn;
    } else {
      Object.keys(query).map((keyQ, index) => {
        let keyConnect = index === 0 ? '?' : '&';
        if (keyQ && query[keyQ]) {
          urlReturn += `${keyConnect}${keyQ}=${query[keyQ]}`;
        }
      });
    }
  }
  return urlReturn;
};

export const getHourString = timeStamp => {
  if (!timeStamp) return '';
  const hour = new Date(timeStamp * 1000).getHours();
  let dateTimeStr = '';
  if (hour <= 12) {
    dateTimeStr = hour + ' am';
  } else {
    dateTimeStr = hour - 12 + ' pm';
  }
  return dateTimeStr;
};

export const getDateTimeString = timeStamp => {
  if (!timeStamp) return '';
  const dateTime = new Date(timeStamp * 1000);
  const day = dateTime.getDay();
  const dayStr = WEEK_DAY_NAME[day];
  const date = dateTime.getDate();
  return `${dayStr} ${date < 10 ? '0' + date : date}`;
};

export const getDayMonth = timeStamp => {
  if (!timeStamp) return '';
  const dateTime = new Date(timeStamp);
  const day = dateTime.getDay();
  const dayStr = WEEK_FULL_DAY_NAME[day];
  const monthNameStr = MONTH_NAME[dateTime.getMonth()];
  const date = dateTime.getDate();
  const dateStr = date < 10 ? '0' + date : date;
  return `${dayStr}, ${monthNameStr} ${dateStr}`;
};

export const getGreetingTime = m => {
  let g = null; //return g

  if (!m || !m.isValid()) {
    return;
  } //if we can't find a valid or filled moment, we return.

  const split_afternoon = 12; //24hr time to split the afternoon
  const split_evening = 17; //24hr time to split the evening
  const currentHour = parseFloat(m.format('HH'));

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    g = 'afternoon';
  } else if (currentHour >= split_evening) {
    g = 'evening';
  } else {
    g = 'morning';
  }

  return g;
};

export const getMoonPhase = (year, month, day) => {
  let c = (e = jd = b = 0);

  if (month < 3) {
    year--;
    month += 12;
  }

  ++month;

  c = 365.25 * year;

  e = 30.6 * month;

  jd = c + e + day - 694039.09; //jd is total days elapsed

  jd /= 29.5305882; //divide by the moon cycle

  b = parseInt(jd); //int(jd) -> b, take integer part of jd

  jd -= b; //subtract integer part to leave fractional part of original jd

  b = Math.round(jd * 8); //scale fraction from 0-8 and round

  if (b >= 8) {
    b = 0; //0 and 8 are the same so turn 8 into 0
  }

  // 0 => New Moon
  // 1 => Waxing Crescent Moon
  // 2 => Quarter Moon
  // 3 => Waxing Gibbous Moon
  // 4 => Full Moon
  // 5 => Waning Gibbous Moon
  // 6 => Last Quarter Moon
  // 7 => Waning Crescent Moon

  return b;
};

export const getAirPollutionLevel = iaqi => {
  for (const key in AIR_POLLUTION_LEVEL) {
    if (Object.hasOwnProperty.call(AIR_POLLUTION_LEVEL, key)) {
      const airLevel = AIR_POLLUTION_LEVEL[key];
      myLog('getAirPollutionLevel', iaqi, airLevel);
      if (iaqi <= airLevel.max && iaqi >= airLevel.min) return airLevel;
    }
  }
};

export const temperatureC = '°C';
export const temperatureF = '°F';
export const temperatureNne = '°';

export const deepCopyObject = (obj = {}) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (error) {
    return obj;
  }
};

const Util = {
  getStateForKeys,
  checkKeyExistObject,
  getValueFromObjectByKeys,
  createSignature,
  convertToNumber,
  getHourString,
  getDateTimeString,
  getDayMonth,
};

export default Util;
