import Config from '../Config';
import Connector, {TYPE_METHOD} from './Connector';
import AppInfoManager from '../AppInfoManager';
import LocationModule from '../modules/LocationModule';
import {getValueFromObjectByKeys} from '../utils/Util';
import {myLog} from '../Debug';

export const URL = {
  _tmpUrl: '',
  getBaseUrl: () => 'https://api.openweathermap.org/data/2.5/',
  getBaseCovidUrl: () => 'https://corona-api.com/',
  getBaseAqiUrl: () => 'https://api.waqi.info/feed/',
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
  allData: 'onecall',
  getAirPollutionUrl: ({lat, lon}) =>
    `geo:${lat};${lon}/?token=${Config.aqiToken}`,
  getCountryCovidUrl: code => `countries/${code}`,
  worldCovid: 'timeline',
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
  getConnector = (url, baseUrl = URL.getBaseUrl()) => {
    return new Connector().setUrl(baseUrl + url);
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
  // Get Home (Menu+Slide+Config)
  getAllData = async () => {
    const location = await LocationModule.getCurrentPosition();

    let lat = getValueFromObjectByKeys(location, ['latitude']);
    let lon = getValueFromObjectByKeys(location, ['longitude']);

    return this.getConnector(URL.allData)
      .setQuery({
        appid: Config.apiKey,
        lang: 'en',
        lat,
        lon,
        units: 'metric',
        exclude: 'minutely',
      })
      .getPromise();
  };
  getAirPollution = async () => {
    const location = await LocationModule.getCurrentPosition();

    let lat = getValueFromObjectByKeys(location, ['latitude']);
    let lon = getValueFromObjectByKeys(location, ['longitude']);

    return this.getConnector(
      URL.getAirPollutionUrl({lat, lon}),
      URL.getBaseAqiUrl(),
    ).getPromise();
  };
  getCountryCovid = async () => {
    const currentAddressInfo = await LocationModule.getCurrentAddressInfo();
    const countryCode = getValueFromObjectByKeys(currentAddressInfo, [
      'countryCode',
    ]);
    myLog('getCountryCovid', currentAddressInfo, countryCode);
    return this.getConnector(
      URL.getCountryCovidUrl(countryCode),
      URL.getBaseCovidUrl(),
    ).getPromise();
  };
  getWorldCovid = () => {
    return this.getConnector(
      URL.worldCovid,
      URL.getBaseCovidUrl(),
    ).getPromise();
  };
}

export {ManagerAPI};
