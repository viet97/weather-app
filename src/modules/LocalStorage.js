import {md5} from './CryptoJS';
import Config from '../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const server = {
  secret: '_TcoN.D',
};

const md5Key = str => {
  return !Config.buildRelease ? str : md5(str);
};

export const DEFINE_KEY = {
  //
  IS_LIVE_SCREEN: md5Key('isLiveScreen' + server.secret),
  USER_NAME: md5Key('username' + server.secret),
  PASSWORD: md5Key('password' + server.secret),
  DEVICE_ID: md5Key('device_id' + server.secret),
  DEVICE_NAME: md5Key('device_name' + server.secret),
  DEVICE_PLATFORM_VER: md5Key('platform_ver' + server.secret),
  // refresh
  SESSION: md5Key('session' + server.secret),
  ACCESS_TOKEN: md5Key('access_token' + server.secret),
  UID: md5Key('uid' + server.secret),
  REFRESH_TOKEN: md5Key('refresh_token' + server.secret),
  LOGIN_FROM: md5Key('login_from' + server.secret),
  OTP: md5Key('otp' + server.secret),
  OTP_SESSION: md5Key('otp_session' + server.secret),
  //
  WAS_LOGIN: md5Key('was_login' + server.secret),
  MSG_BONUS: md5Key('msg_bonus' + server.secret),
  BANNER_BONUS: md5Key('banner_bonus' + server.secret),
  LAST_CHANNEL: md5Key('last_channel' + server.secret),
  //i18n
  LAST_LOCALE_SET: md5Key('last_locale_set' + server.secret),
  //twitter
  TWITTER_USER_ID: md5Key('twitter_user_id' + server.secret),
  TWITTER_USER_NAME: md5Key('twitter_user_name' + server.secret),
  TWITTER_USER_TOKEN: md5Key('twitter_user_token' + server.secret),
  TWITTER_USER_TOKEN_SECRET: md5Key(
    'twitter_user_token_secret' + server.secret,
  ),
  // Data Chat
  CHAT_INFO: md5Key('chatInfo' + server.secret),
  //request
  CANCEL_REQUEST: md5Key('cancelRequest' + server.secret),
  // setting app
  SETTING_APP: {
    VALUE_FREQUENCY: md5Key('valueFrequency'),
    WEATHER_PROVIDER: md5Key('weatherProvider'),
    CUSTOM_LAYOUT: md5Key('customLayout'),
    DAILY_NOTIFICATION: md5Key('dailyNotification'),
    TIME_DAILY_NOTIFICATION: md5Key('timeDailyNotification'),
    DAILY_RECEIVE_TIME: md5('dailyReceiveTime'),
    SEVERE_ALERT: md5('severeAlert'),
    ALARM_RAIN_SNOW: md5('rainSnowAlarm'),
    TIME_FORMAT: md5('timeFormat'),
    UNIT_TEMP: md5('unitTemp'),
    UNIT_RAIN_SNOW: md5('unitRainSnow'),
    UNIT_DISTANCE: md5('unitDistance'),
    UNIT_WIND_SPEED: md5('unitWindSpeed'),
    UNIT_PRESSURE: md5('unitPressure'),
    THEME_COLOR: md5('themeColor'),
  },
  LOCATION: md5('LOCATION'),
};

const isExist = async key => {
  try {
    const allKey = await AsyncStorage.getAllKeys();
    for (let index = 0; index < allKey.length; index++) {
      const element = allKey[index];
      if (element === key) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return '';
  } catch (e) {
    return '';
  }
};
const getMultiItem = async key => {
  try {
    const value = await AsyncStorage.multiGet(key);
    if (value !== null) {
      return value;
    }
    return [];
  } catch (e) {
    return [];
  }
};

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const clear = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (e) {
    throw e;
  }
};

const removeItem = async key => {
  return await AsyncStorage.removeItem(key);
};

export const LocalStorage = {
  setItem,
  getItem,
  clear,
  removeItem,
  DEFINE_KEY,
  isExist,
  getMultiItem,
};

export default LocalStorage;
