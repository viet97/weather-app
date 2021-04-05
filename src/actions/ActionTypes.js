const encodeString = (str, isRequire = false) => {
  if (isRequire) {
    return str;
  }
  return str;
};

export const REQUEST_TYPE = {
  //About
  GET_PRIVACY: encodeString('GET_PRIVACY'),
  GET_ALL_DATA: encodeString('GET_ALL_DATA'),
  GET_AIR_POLLUTION: encodeString('GET_AIR_POLLUTION'),
};

export const REQUEST_SUBTYPE = {
  REQUEST: encodeString('OnRequest'),
  ERROR: encodeString('OnError'),
  SUCCESS: encodeString('OnSuccess'),
};

export const NORMAL_TYPE = {
  CHANGE_VOD_STATE: encodeString('CHANGE_VOD_STATE'),
  CLEAR_DATA_CATEGORY: encodeString('CLEAR_DATA_CATEGORY'),
  CHANGE_RESIZE_WINDOW: encodeString('CHANGE_RESIZE_WINDOW'),
  NETWORK_CHANGE: encodeString('NETWORK_CHANGE'),
  CHANGE_LANGUAGE: encodeString('CHANGE_LANGUAGE'),
  I18N_SET_LOCALE: encodeString('I18N_SET_LOCALE'),
  I18N_SET_TRANSLATIONS: encodeString('I18N_SET_TRANSLATIONS'),
  CHANGE_STATE_LOGIN: encodeString('CHANGE_STATE_LOGIN'),
  CHANGE_DATA_SOURCE: encodeString('CHANGE_DATA_SOURCE'),
  CHANGE_VALUE_FREQUENCY: encodeString('CHANGE_VALUE_FREQUENCY'),
  CHANGE_VALUE_DAILY_NOTIFICATION: encodeString(
    'CHANGE_VALUE_DAILY_NOTIFICATION',
  ),
  CHANGE_VALUE_SEVERE_ALERT: encodeString('CHANGE_VALUE_SEVERE_ALERT'),
  CHANGE_VALUE_NOTI_RAIN_SNOW: encodeString('CHANGE_VALUE_NOTI_RAIN_SNOW'),
  CHANGE_VALUE_LANGUAGE: encodeString('CHANGE_VALUE_LANGUAGE'),
  CHANGE_LAYOUT: encodeString('CHANGE_LAYOUT'),
  CHANGE_WEATHER_PROVIDER: encodeString('CHANGE_WEATHER_PROVIDER'),
  CHANGE_VALUE_UNIT_TEMP: encodeString('CHANGE_VALUE_UNIT_TEMP'),
  CHANGE_VALUE_UNIT_RAIN: encodeString('CHANGE_VALUE_UNIT_RAIN'),
  CHANGE_VALUE_UNIT_DISTANCE: encodeString('CHANGE_VALUE_UNIT_DISTANCE'),
  CHANGE_VALUE_UNIT_WIND: encodeString('CHANGE_VALUE_UNIT_WIND'),
  CHANGE_VALUE_UNIT_PRESSURE: encodeString('CHANGE_VALUE_UNIT_PRESSURE'),
  CHANGE_TIME_FORMAT: encodeString('CHANGE_TIME_FORMAT'),
  CHANGE_THEME_COLOR: encodeString('CHANGE_THEME_COLOR'),
  CHANGE_VALUE_SETTING: encodeString('CHANGE_VALUE_SETTING'),
  CHANGE_MULTI_VALUE_SETTING: encodeString('CHANGE_MULTI_VALUE_SETTING'),
  CHANGE_VALUE_THEME_COLOR: encodeString('CHANGE_VALUE_THEME_COLOR'),
  CHANGE_VALUE_TIME_FORMAT: encodeString('CHANGE_VALUE_TIME_FORMAT'),
  //location
  ADD_LOCATION: encodeString('ADD_LOCATION'),
  REMOVE_LOCATION: encodeString('REMOVE_LOCATION'),
  CHANGE_LOCATION: encodeString('CHANGE_LOCATION'),
};

export const NAVIGATION_ACTION = {
  NAVIGATE: encodeString('@@TcoN.D/Navigate'),
  GO_BACK: encodeString('@@TcoN.D/GoBack'),
  INIT: encodeString('@@TcoN.D/Init'),
  RESET: encodeString('@@TcoN.D/Reset'),
};

const ActionTypes = {
  NAVIGATION_ACTION,
  REQUEST_TYPE,
  REQUEST_SUBTYPE,
  NORMAL_TYPE,
};

export default ActionTypes;
