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
