const encodeString = (str, isRequire = false) => {
  if (isRequire) {
    return str;
  }
  return str;
};

export const REQUEST_TYPE = {
  //About
  GET_PRIVACY: encodeString('GET_PRIVACY'),
  GET_TERM: encodeString('GET_TERM'),
  // Home
  GET_CONFIG_SERVER: encodeString('GET_CONFIG_SERVER'),
  GET_CONFIG_ABOUT: encodeString('GET_CONFIG_ABOUT'),
  GET_HOME: encodeString('GET_HOME'),
  GET_MENU_HOME_LIST: encodeString('GET_MENU_HOME_LIST'),
  // Channel
  GET_CHANNEL_LIST: encodeString('GET_CHANNEL_LIST'),
  GET_CHANNEL_PROGRAM: encodeString('GET_CHANNEL_PROGRAM'),
  GET_SOURCE_CHANNEL_DEFAULT: encodeString('GET_SOURCE_CHANNEL_DEFAULT'),
  // Vod
  GET_MENU_VOD: encodeString('GET_MENU_VOD'),
  GET_LIST_VOD: encodeString('GET_LIST_VOD'),
  GET_RESULT_SEARCH: encodeString('GET_RESULT_SEARCH'),
  GET_VOD_EPISODE_LIST: encodeString('GET_VOD_EPISODE_LIST'),
  CHANGE_MOVIE_LANGUAGE: encodeString('CHANGE_MOVIE_LANGUAGE'),
  GET_MOVIE_LANGUAGE: encodeString('GET_MOVIE_LANGUAGE'),
  // Content
  GET_SOURCE_CONTENT: encodeString('GET_SOURCE_CONTENT'),
  GET_VOD_DETAIL: encodeString('GET_VOD_DETAIL'),
  GET_VOD_RELATE: encodeString('GET_VOD_RELATE'),
  GET_VOD_STATE: encodeString('GET_VOD_STATE'),
  POST_SET_VOD_STATE: encodeString('POST_SET_VOD_STATE'),
  GET_MENU_VOD_HOME: encodeString('GET_MENU_VOD_HOME'),
  GET_VOD_BY_NODE_ID: encodeString('GET_VOD_BY_NODE_ID'),
  // Guest
  POST_ENTER_LOGIN: encodeString('POST_ENTER_LOGIN'),
  POST_ENTER_PHONE: encodeString('POST_ENTER_PHONE'),
  // User
  LOGIN_VIA_SOCIAL_NETWORK: encodeString('LOGIN_VIA_SOCIAL_NETWORK'),
  LOGOUT_VIA_SOCIAL_NETWORK: encodeString('LOGOUT_VIA_SOCIAL_NETWORK'),
  GET_USER_TRANSITION: encodeString('GET_USER_TRANSITION'),
  GET_USER_INFO: encodeString('GET_USER_INFO'),
  POST_USER_LOGOUT: encodeString('POST_USER_LOGOUT'),
  POST_USER_LOGIN: encodeString('POST_USER_LOGIN'),
  POST_USER_LOGIN_OTP: encodeString('POST_USER_LOGIN_OTP'),
  POST_USER_VERIFY_OTP_REGISTER: encodeString('POST_USER_VERIFY_OTP_REGISTER'),
  POST_USER_VERIFY_OTP_CHANGE_PASSWORD: encodeString(
    'POST_USER_VERIFY_OTP_CHANGE_PASSWORD',
  ),
  POST_USER_REGISTER: encodeString('POST_USER_REGISTER'),
  POST_USER_FORGET_PASSWORD: encodeString('POST_USER_FORGET_PASSWORD'),
  POST_USER_CHANGE_PASSWORD: encodeString('POST_USER_CHANGE_PASSWORD'),
  POST_USER_ACTIVE_CODE: encodeString('POST_USER_ACTIVE_CODE'),
  // Payment
  GET_PACKAGE_LIST_PACKAGE: encodeString('GET_PACKAGE_LIST_PACKAGE'),
  GET_PACKAGE_LIST_PACKAGE_RENT: encodeString('GET_PACKAGE_LIST_PACKAGE_RENT'),
  GET_PACKAGE_BANK_LINK: encodeString('GET_PACKAGE_BANK_LINK'),
  GET_PACKAGE_MOMO_LINK: encodeString('GET_PACKAGE_MOMO_LINK'),
  GET_PACKAGE_BANK_LINK_RENT: encodeString('GET_PACKAGE_BANK_LINK_RENT'),
  GET_PACKAGE_MOMO_LINK_RENT: encodeString('GET_PACKAGE_MOMO_LINK_RENT'),
  POST_PACKAGE_VERIFY_CARD: encodeString('POST_PACKAGE_VERIFY_CARD'),
  POST_PACKAGE_VERIFY_CARD_MONEY: encodeString(
    'POST_PACKAGE_VERIFY_CARD_MONEY',
  ),
  POST_PACKAGE_BUY_ITEM_VOD: encodeString('POST_PACKAGE_BUY_ITEM_VOD'),
  // Ping
  POST_PING_SERVER: encodeString('POST_PING_SERVER'),
  GET_WEATHER: encodeString('GET_WEATHER'),
  GET_NOTIFICATION: encodeString('GET_NOTIFICATION'),
  REVALIDATE_KPLUS: encodeString('REVALIDATE_KPLUS'),
  PAY_IAP: encodeString('PAY_IAP'),
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
