import {isNumber} from '../modules/Lodash';
import {myLog} from '../Debug';
import {md5} from '../modules/CryptoJS';
import {getConfigDevice} from '../ConfigDevice';
import Config from '../Config';

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
  return output;
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

export const temperatureC = '°C';
export const temperatureF = '°F';

const Util = {
  getStateForKeys,
  checkKeyExistObject,
  getValueFromObjectByKeys,
  createSignature,
  convertToNumber,
};

export default Util;
