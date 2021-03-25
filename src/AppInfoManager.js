import { getConfigDevice } from './ConfigDevice';
import Config from './Config';
import LocalStorage from './modules/LocalStorage';
import { getStateForKeys } from './utils/Util';
import { getDeviceId } from 'react-native-device-info';

const appInfo = {
  platform: getConfigDevice().platform,
  model: getConfigDevice().model,
  systemVersion: getConfigDevice().systemVersion,
  versionCode: Config.versionCode,
  deviceId: getConfigDevice().deviceId,
  deviceName: getConfigDevice().deviceName,
  buildVersion: getConfigDevice().buildVersion,
};

export default class AppInfoManager {
  static getInstance(store) {
    if (!this._instance) {
      this._instance = new AppInfoManager(store);
    }
    return this._instance;
  }
  static clear() {
    if (this._instance) {
      delete this._instance;
    }
  }
  constructor(store) {
    this.store = store;
    this._init();
    this.lockAccount = false;
    this.forceUpdate = false;
  }

  setStore(store) {
    if (!store) {
      return;
    }
    this.store = store;
  }

  getStore() {
    return this.store;
  }

  _init() {
    this.accessToken = this.getAccessToken();
    this.username = this.getUsername();
    this.password = this.getPassword();
    this.otpSession = this.getOTPSession();
    this.otp = this.getOTP();
    console.log(appInfo);
  }

  getStateRedux(keys = []) {
    if (!this.store) {
      return;
    }
    return getStateForKeys(this.store.getState(), keys);
  }

  setUserInfo(userInfo = undefined) {
    this.userInfo = userInfo;
  }

  getUserInfo() {
    return this.userInfo;
  }

  async setUsername(username) {
    if (!username) {
      return;
    }
    this.username = username;
    await LocalStorage.setItem(LocalStorage.DEFINE_KEY.USER_NAME, username);
  }

  async getUsername() {
    return this.username
      ? this.username
      : await LocalStorage.getItem(LocalStorage.DEFINE_KEY.USER_NAME);
  }

  async setPassword(password) {
    if (!password) {
      return;
    }
    this.password = password;
    await LocalStorage.setItem(LocalStorage.DEFINE_KEY.PASSWORD, password);
  }

  async getPassword() {
    return this.password
      ? this.password
      : await LocalStorage.getItem(LocalStorage.DEFINE_KEY.PASSWORD);
  }

  async checkLogin() {
    const wasLogin = await LocalStorage.getItem(
      LocalStorage.DEFINE_KEY.WAS_LOGIN,
    );
    if (!wasLogin) {
      return false;
    }
    return true;
  }

  async setAccessToken(accessToken) {
    if (!accessToken) {
      return;
    }
    this.accessToken = accessToken;
    await LocalStorage.setItem(
      LocalStorage.DEFINE_KEY.ACCESS_TOKEN,
      accessToken,
    );
    return true;
  }

  async getAccessToken() {
    return await LocalStorage.getItem(LocalStorage.DEFINE_KEY.ACCESS_TOKEN);
  }

  async setOTP(otp) {
    if (!otp) {
      return;
    }
    this.otp = otp;
    await LocalStorage.setItem(LocalStorage.DEFINE_KEY.OTP, otp);
  }

  async getOTP() {
    return this.otp
      ? this.otp
      : await LocalStorage.getItem(LocalStorage.DEFINE_KEY.OTP);
  }

  async setOTPSession(otpSession) {
    if (!otpSession) {
      return;
    }
    this.otpSession = otpSession;
    await LocalStorage.setItem(LocalStorage.DEFINE_KEY.OTP_SESSION, otpSession);
  }

  async getOTPSession() {
    return this.otpSession
      ? this.otpSession
      : await LocalStorage.getItem(LocalStorage.DEFINE_KEY.OTP_SESSION);
  }

  async setRefreshToken(refreshToken) {
    if (!refreshToken) {
      return;
    }
    this.refreshToken = refreshToken;
    await LocalStorage.setItem(
      LocalStorage.DEFINE_KEY.REFRESH_TOKEN,
      refreshToken,
    );
  }

  async getRefreshToken() {
    return this.refreshToken
      ? this.refreshToken
      : await LocalStorage.getItem(LocalStorage.DEFINE_KEY.REFRESH_TOKEN);
  }

  exitApp() { }

  getDeviceName() {
    return getConfigDevice().deviceName;
  }

  getDeviceId() {
    return getConfigDevice().deviceId;
  }

  getAppInfo() {
    return appInfo;
  }
}
