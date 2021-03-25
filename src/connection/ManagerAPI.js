import Config from '../Config';
import Connector, { TYPE_METHOD } from './Connector';
import { md5 } from '../modules/CryptoJS';
import AppInfoManager from '../AppInfoManager';
import { TYPE_MENU_HOME } from '../Define';
import { Platform } from 'react-native';
import { createSignature, getParamsEnterGuest } from '../utils/Util';
import { myLog } from '../Debug';

export const URL = {
  _tmpUrl: '',
  baseUrl: Config.serverHost,
  customerUrl: Config.serverHostCustomer,
  switchCustomerUrl: function (url) {
    if (url) {
      this.customerUrl =
        url.lastIndexOf('/') !== url.length - 1 ? url + '/' : url;
    }
  },
  switchBaseUrl: function (url) {
    if (Config.useServerTest) {
      if (url.indexOf(Config.versionApi) !== -1) {
        this.baseUrl = url;
        return;
      }
      this.baseUrl = url + Config.versionApi;
      return;
    }
    if (url.indexOf(Config.versionApi) !== -1) {
      this.baseUrl = url;
      return;
    }
    this.baseUrl = url + Config.versionApi;
  },
  switchDebugMode: function (enable = false) {
    if (enable) {
      this._tmpUrl = this.baseUrl;
      this.baseUrl = 'http://123.30.235.63:3005' + Config.versionApi;
    } else {
      this.baseUrl = this._tmpUrl;
      this._tmpUrl = '';
    }
  },
  // Config
  ping: 'ping',
  getConfig: 'config',
  getConfigAbout: 'about',
  getTerm: 'term',
  getPrivacy: 'privacy',
  // Home
  getHome: 'home/new1',
  getMenuHome: 'vod/getMenuHome',
  getMenuHomeMix: 'home/getMix',
  getMenuHomeList: 'vod/getMenuHomeList',
  getList: 'vod/getList',
  getResultSuggest: 'search/suggest',
  changeMovieLanguage: 'user/saveLanguage',
  getMovieLanguage: 'taxonomy/language',
  // Content
  getSource: 'getSource',
  getSourceChannelDefault: 'channel/getDefaultSource',
  getChannelProgram: 'channel/schedule',
  getChannelList: 'channel',
  getVodDetail: 'metadata/detail',
  getVodRelate: 'metadata/relate',
  getVodState: 'vod/getState',
  setVodState: 'metadata/save',
  getVodEpisodeList: 'metadata/episode',
  getMenuVodHome: 'menuVodHome',
  metadata: 'metadata',
  searchMetadata: 'metadata/search',
  // User
  getTransactionHistory: 'user/transaction',
  getUserInfo: 'details',
  login: 'login',
  refreshToken: 'refreshToken',
  userPostEnter: 'user/enter',
  loginOTP: 'user/loginOTP',
  register: 'user/register',
  verifyOTPRegister: 'user/verifyOTPRegister',
  verifyOTPChangePassword: 'user/verifyOTPChangePassword',
  forgetPassword: 'user/forgetPassword',
  changePassword: 'user/changePassword',
  activeCode: 'user/activeCode',
  // Guest
  guestEnter: 'enterGuest',
  postLogout: 'logout',
  // Payment
  getListPackage: 'pay/getPackageList',
  getListPackageRent: 'pay/getMoneyInfo',
  getBankLink: 'pay/getBankLink',
  getMomoLink: 'pay/getMoMoLink',
  getBankLinkRent: 'pay/getBankLinkMoney',
  getMomoLinkRent: 'pay/getMoMoLinkMoney',
  payVerifyCard: 'pay/verifyCard',
  payVerifyCardMoney: 'pay/verifyCardMoney',
  buyItemVod: 'vod/buyItem',
  //revalidate
  payIap: 'pay/verifyIap',
};

const appInfo = {
  platform: AppInfoManager.getInstance().getAppInfo().platform,
  versionCode: AppInfoManager.getInstance().getAppInfo().versionCode,
  deviceId: AppInfoManager.getInstance().getAppInfo().deviceId,
  deviceName: AppInfoManager.getInstance().getAppInfo().deviceName,
};

export default class ManagerAPI {
  static getInstance() {
    if (!this._instance) {
      this._instance = new ManagerAPI();
    }
    return this._instance;
  }
  static clear() {
    if (this._instance) {
      delete this._instance;
    }
  }
  constructor() {
    this.name = 'ManagerAPI';
  }
  // 0. GetConnector
  getConnector = (url, customUrl) => {
    return new Connector().setUrl(customUrl ? customUrl : URL.baseUrl + url);
  };
  // Create custom request
  requestCustom = ({
    url,
    method = TYPE_METHOD.GET,
    query = {},
    params = {},
    timeout = 30000,
    useRefreshToken = true,
    useToken = true,
    useCrypto = false,
    dataTmp = {},
  }) => {
    if (!url) {
      return new Promise((res, rej) => {
        res(true);
      });
    }
    return this.getConnector(url, url)
      .setMethod(method)
      .setQuery(query)
      .setParams(params)
      .setTimeOut(timeout)
      .setUseToken(useToken)
      .setUseCrypto(useCrypto)
      .setDataTmp(dataTmp)
      .setUseRefreshToken(useRefreshToken)
      .getPromise();
  };
  // Get Config Server
  getConfigServer = () => {
    return this.getConnector(URL.getConfig)
      .setUseToken(false)
      .setTimeOut(10000)
      .setAcceptCancelRequest(false)
      .getPromise();
  };
  // Get Home (Menu+Slide+Config)
  getHome = () => {
    return this.getConnector(URL.getHome)
      .setQuery({
        ...AppInfoManager.getInstance().getAppInfo(),
      })
      .getPromise();
  };
  getConfigAbout = () => {
    return this.getConnector(URL.getConfigAbout).getPromise();
  };
  getTerm = () => {
    return this.getConnector(URL.getTerm).getPromise();
  };
  getPrivacy = () => {
    return this.getConnector(URL.getPrivacy).getPromise();
  };
  getResultSuggest = ({ q, limit, offset }) => {
    return this.getConnector(URL.searchMetadata)
      .setQuery({ q, limit, offset })
      .getPromise();
  };
  //   Guest login
  postGuestLogin = () => {
    const params = getParamsEnterGuest();
    return this.getConnector(URL.guestEnter, URL.customerUrl + URL.guestEnter)
      .setParams(params)
      .setMethod(TYPE_METHOD.POST)
      .setUseRefreshToken(false)
      .setUseToken(false)
      .setUseFcmToken(true)
      .setAcceptCancelRequest(false)
      .getPromise();
  };
  // Enter phone
  postUserEnter = ({ username }) => {
    const deviceId = AppInfoManager.getInstance().getDeviceId();
    const params = {
      username,
      deviceId,
      ...AppInfoManager.getInstance().getAppInfo(),
      signature: md5(
        [
          username,
          deviceId,
          appInfo.platform,
          appInfo.deviceType,
          appInfo.dtId,
          appInfo.spId,
          appInfo.secret,
        ].join('$'),
      ),
    };
    return this.getConnector(URL.userPostEnter)
      .setMethod(TYPE_METHOD.POST)
      .setParams(params)
      .setUseToken(false)
      .setUseRefreshToken(false)
      .getPromise();
  };

  verifyOTPRegister = async ({ username, otp }) => {
    const deviceId = AppInfoManager.getInstance().getDeviceId();
    const otpSession = await AppInfoManager.getInstance().getOTPSession();
    const params = {
      username,
      deviceId,
      ...AppInfoManager.getInstance().getAppInfo(),
      otpSession,
      otp,
      signature: md5(
        [
          username,
          deviceId,
          appInfo.platform,
          appInfo.deviceType,
          appInfo.dtId,
          appInfo.spId,
          otpSession,
          otp,
          appInfo.secret,
        ].join('$'),
      ),
    };
    return this.getConnector(URL.verifyOTPRegister)
      .setMethod(TYPE_METHOD.POST)
      .setParams(params)
      .setUseToken(false)
      .setUseRefreshToken(false)
      .getPromise();
  };

  verifyOTPChangePassword = async ({ username, otp }) => {
    const deviceId = AppInfoManager.getInstance().getDeviceId();
    const otpSession = await AppInfoManager.getInstance().getOTPSession();
    const params = {
      username,
      deviceId,
      ...AppInfoManager.getInstance().getAppInfo(),
      otpSession,
      otp,
      signature: md5(
        [
          username,
          deviceId,
          appInfo.platform,
          appInfo.deviceType,
          appInfo.dtId,
          appInfo.spId,
          otpSession,
          otp,
          appInfo.secret,
        ].join('$'),
      ),
    };
    return this.getConnector(URL.verifyOTPChangePassword)
      .setMethod(TYPE_METHOD.POST)
      .setParams(params)
      .setUseToken(false)
      .setUseRefreshToken(false)
      .getPromise();
  };

  registerUser = async ({ username, password }) => {
    const deviceId = AppInfoManager.getInstance().getDeviceId();
    const deviceName = AppInfoManager.getInstance().getDeviceName();
    const otpToken = await AppInfoManager.getInstance().getOTP();
    const params = {
      username,
      deviceId,
      ...AppInfoManager.getInstance().getAppInfo(),
      // otp,
      deviceName,
      deviceToken: '',
      otpToken,
      password,
      signature: md5(
        [
          username,
          deviceId,
          appInfo.platform,
          appInfo.deviceType,
          appInfo.dtId,
          appInfo.spId,
          otpToken,
          password,
          appInfo.secret,
        ].join('$'),
      ),
    };
    return this.getConnector(URL.register)
      .setMethod(TYPE_METHOD.POST)
      .setParams(params)
      .setUseToken(false)
      .setUseRefreshToken(false)
      .getPromise();
  };
  loginViaSocialNetwork = ({ idToken, name, avatar }) => {
    let objSignature = {
      deviceType: appInfo.deviceType,
      token: idToken,
      deviceId: appInfo.deviceId,
      versionCode: appInfo.versionCode,
      deviceName: appInfo.deviceName,
    };
    let params = {
      deviceType: appInfo.deviceType,
      token: idToken,
      deviceId: appInfo.deviceId,
      versionCode: appInfo.versionCode,
      deviceName: appInfo.deviceName,
    };
    if (name) {
      objSignature.name = name;
      params.name = name;
    }
    if (avatar) {
      objSignature.avatar = avatar;
      params.avatar = avatar;
    }
    params.signature = createSignature(objSignature);
    return this.getConnector(URL.login, URL.customerUrl + URL.login)
      .setMethod('POST')
      .setParams(params)
      .setUseCrypto(false)
      .setUseFcmToken(true)
      .getPromise();
  };
  logOut = () => {
    return this.getConnector(URL.postLogout, URL.customerUrl + URL.postLogout)
      .setMethod('POST')
      .setUseCrypto(false)
      .setUseFcmToken(true)
      .getPromise();
  };
  login = ({ username, password }) => {
    const deviceId = AppInfoManager.getInstance().getDeviceId();
    const deviceName = AppInfoManager.getInstance().getDeviceName();
    const params = {
      username,
      deviceId,
      ...AppInfoManager.getInstance().getAppInfo(),
      deviceName,
      deviceToken: '',
      password,
      signature: md5(
        [
          username,
          deviceId,
          appInfo.platform,
          appInfo.deviceType,
          appInfo.dtId,
          appInfo.spId,
          password,
          appInfo.secret,
        ].join('$'),
      ),
    };
    return this.getConnector(URL.login)
      .setMethod(TYPE_METHOD.POST)
      .setParams(params)
      .setUseToken(false)
      .setUseRefreshToken(false)
      .getPromise();
  };

  loginOTP = async ({ username, otp }) => {
    const deviceId = AppInfoManager.getInstance().getDeviceId();
    const deviceName = AppInfoManager.getInstance().getDeviceName();
    const otpSession = await AppInfoManager.getInstance().getOTPSession();
    let params = {
      username,
      deviceId,
      deviceName,
      ...AppInfoManager.getInstance().getAppInfo(),
      otpSession,
      otp,
      signature: md5(
        [
          username,
          deviceId,
          appInfo.platform,
          appInfo.deviceType,
          appInfo.dtId,
          appInfo.spId,
          otpSession,
          otp,
          appInfo.secret,
        ].join('$'),
      ),
    };
    return this.getConnector(URL.loginOTP)
      .setMethod(TYPE_METHOD.POST)
      .setParams(params)
      .setUseToken(false)
      .setUseRefreshToken(false)
      .getPromise();
  };

  forgetPassword = ({ username }) => {
    const deviceId = AppInfoManager.getInstance().getDeviceId();
    let params = {
      username,
      deviceId,
      ...AppInfoManager.getInstance().getAppInfo(),
      signature: md5(
        [
          username,
          deviceId,
          appInfo.platform,
          appInfo.deviceType,
          appInfo.dtId,
          appInfo.spId,
          appInfo.secret,
        ].join('$'),
      ),
    };
    return this.getConnector(URL.forgetPassword)
      .setMethod(TYPE_METHOD.POST)
      .setParams(params)
      .setUseToken(false)
      .setUseRefreshToken(false)
      .getPromise();
  };

  changePassword = async ({ username, password }) => {
    const deviceId = AppInfoManager.getInstance().getDeviceId();
    const deviceName = AppInfoManager.getInstance().getDeviceName();
    const otpToken = await AppInfoManager.getInstance().getOTP();
    let params = {
      username,
      deviceId,
      ...AppInfoManager.getInstance().getAppInfo(),
      deviceName,
      deviceToken: '',
      otpToken,
      password,
      signature: md5(
        [
          username,
          deviceId,
          appInfo.platform,
          appInfo.deviceType,
          appInfo.dtId,
          appInfo.spId,
          otpToken,
          password,
          appInfo.secret,
        ].join('$'),
      ),
    };
    return this.getConnector(URL.changePassword)
      .setMethod(TYPE_METHOD.POST)
      .setParams(params)
      .setUseToken(false)
      .setUseRefreshToken(false)
      .getPromise();
  };

  // USER
  logout = ({ deviceId }) => {
    return this.getConnector(URL.postLogout)
      .setMethod(TYPE_METHOD.POST)
      .setParams({ deviceId })
      .getPromise();
  };

  getUserInfo = () => {
    return this.getConnector(URL.getUserInfo, URL.customerUrl + URL.getUserInfo)
      .setAcceptCancelRequest(false)
      .getPromise();
  };

  getTransactionHistory = () => {
    return this.getConnector(URL.getTransactionHistory).getPromise();
  };

  activeCode = ({ code }) => {
    return this.getConnector(URL.activeCode)
      .setMethod(TYPE_METHOD.POST)
      .setParams({ code })
      .getPromise();
  };

  // CHANNEL
  getChannelList = () => {
    let codec = [];
    return (
      this.getConnector(URL.getChannelList)
        // .setQuery({codec})
        .getPromise()
    );
  };

  getChannelProgram = ({ channelId, date }) => {
    return this.getConnector(`${URL.getChannelProgram}/${channelId}/${date}`)
      .setParams({ channelId, date })
      .getPromise();
  };

  getSourceChannelDefault = ({ resolution } = {}) => {
    let codec = [];
    return this.getConnector(URL.getSourceChannelDefault)
      .setQuery({
        resolution: resolution ? resolution : window.screen.width,
        codec: codec,
        ...AppInfoManager.getInstance().getAppInfo(),
      })
      .getPromise();
  };
  // VOD
  getMenuHomeList = ({ items }) => {
    return this.getConnector(URL.getMenuHomeList)
      .setQuery({ items })
      .getPromise();
  };

  getMenuVod = ({ id, offset, limit, type, mixData }) => {
    return this.getConnector(
      type === TYPE_MENU_HOME.MENU_MIX ? URL.getMenuHomeMix : URL.getMenuHome,
    )
      .setQuery({
        id,
        offset,
        limit,
        mixData: type === TYPE_MENU_HOME.MENU_MIX ? mixData : undefined,
      })
      .getPromise();
  };

  getListVod = ({ id, limit, offset, type, mixData }) => {
    return this.getConnector(
      type === TYPE_MENU_HOME.MENU_MIX ? URL.getMenuHomeMix : URL.getList,
    )
      .setQuery({
        id,
        offset,
        limit,
        mixData: type === TYPE_MENU_HOME.MENU_MIX ? mixData : undefined,
      })
      .getPromise();
  };
  // Content
  getSource = ({ id, type, session }) => {
    return this.getConnector(URL.getSource)
      .setQuery({
        id,
        type,
      })
      .setSession(session)
      .setMethod(TYPE_METHOD.GET)
      .getPromise();
  };
  //
  getVodDetail = ({ id }) => {
    // let filter = {};{ filter: JSON.stringify(filter), id}
    return this.getConnector(URL.getVodDetail + '/' + id).getPromise();
  };

  getVodEpisodeList = ({ id, limit, offset }) => {
    // let filter = {};{ filter: JSON.stringify(filter), id}
    return this.getConnector(URL.getVodEpisodeList + '/' + id)
      .setQuery({ limit, offset })
      .getPromise();
  };

  getVodRelate = ({ id, type, offset }) => {
    return this.getConnector(URL.getVodRelate + '/' + id)
      .setQuery({ type, offset })
      .getPromise();
  };

  setVodState = ({ id, time }) => {
    return this.getConnector(URL.setVodState)
      .setMethod(TYPE_METHOD.POST)
      .setParams({ id, time })
      .getPromise();
  };

  getVodState = ({ id }) => {
    return this.getConnector(URL.getVodState)
      .setQuery({ id })
      .getPromise();
  };
  getMenuVodHome = () => {
    return this.getConnector(URL.getMenuVodHome).getPromise();
  };
  getVodByNodeId = ({ id, limit, offset, displayChildren }) => {
    const paramsGetData = { nodeId: id, limit, offset, displayChildren };
    if (!limit) {
      delete paramsGetData.limit;
    }
    return this.getConnector(URL.metadata)
      .setQuery(paramsGetData)
      .getPromise();
  };

  changeMovieLanguage = ({ languages }) => {
    return this.getConnector(URL.changeMovieLanguage)
      .setMethod(TYPE_METHOD.POST)
      .setParams({ languages })
      .getPromise();
  };

  getMovieLanguage = () => {
    return this.getConnector(URL.getMovieLanguage).getPromise();
  };

  //Payment
  getListPackage = () => {
    return this.getConnector(URL.getListPackage).getPromise();
  };

  getListPackageRent = () => {
    return this.getConnector(URL.getListPackageRent).getPromise();
  };

  getBankLink = ({ packageCode, time, deviceNumber, username }) => {
    return this.getConnector(URL.getBankLink)
      .setQuery({ packageCode, time, deviceNumber, username })
      .getPromise();
  };

  getMomoLink = ({ packageCode, time, deviceNumber, username }) => {
    return this.getConnector(URL.getMomoLink)
      .setQuery({ packageCode, time, deviceNumber, username })
      .getPromise();
  };

  getBankLinkRent = ({ amount }) => {
    return this.getConnector(URL.getBankLinkRent)
      .setQuery({ amount })
      .getPromise();
  };

  getMomoLinkRent = ({ amount }) => {
    return this.getConnector(URL.getMomoLinkRent)
      .setQuery({ amount })
      .getPromise();
  };

  payVerifyCard = async ({
    username,
    deviceNumber,
    packageCode,
    time,
    serial,
    cardCode,
    extra,
  }) => {
    const realUsername = username
      ? username
      : await AppInfoManager.getInstance().getUsername();
    return this.getConnector(URL.payVerifyCard)
      .setMethod(TYPE_METHOD.POST)
      .setParams({
        username: realUsername,
        deviceNumber,
        packageCode,
        time,
        serial,
        cardCode,
        extra,
      })
      .getPromise();
  };

  payVerifyCardMoney = async ({ amount, serial, cardCode, extra, username }) => {
    const realUsername = username
      ? username
      : await AppInfoManager.getInstance().getUsername();
    return this.getConnector(URL.payVerifyCardMoney)
      .setMethod(TYPE_METHOD.POST)
      .setParams({
        username: realUsername,
        amount,
        serial,
        cardCode,
        extra,
      })
      .getPromise();
  };

  buyItemVod({ id }) {
    return this.getConnector(URL.buyItemVod)
      .setMethod(TYPE_METHOD.POST)
      .setParams({ id: id })
      .getPromise();
  }
  payIap = ({ packageCode, time, deviceNumber, receipt }) => {
    return this.getConnector(URL.payIap)
      .setParams({
        packageCode,
        time,
        deviceNumber,
        receipt,
      })
      .setMethod(TYPE_METHOD.POST)
      .getPromise();
  };
  //
  //Ping
  pingServer = ({ url }) => {
    return this.getConnector('', url)
      .setUseToken(true)
      .setAcceptCancelRequest(false)
      .getPromise();
  };
  requestApi = ({
    url,
    method = TYPE_METHOD.GET,
    query = {},
    params = {},
    timeout = 30000,
    useCrypto = false,
  }) => {
    return this.getConnector('', url)
      .setMethod(method)
      .setQuery(query)
      .setParams(params)
      .setTimeOut(timeout)
      .setUseCrypto(useCrypto)
      .getPromise();
  };
}

export { ManagerAPI };
