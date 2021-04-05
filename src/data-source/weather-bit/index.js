import Connector from '../../connection/Connector';
import ConfigStore from '../../container/ConfigStore';
import {myLog} from '../../Debug';
import {DEFINE_UNITS_TEMP, unitsQuery} from '../../Define';
import LocalStorage from '../../modules/LocalStorage';
import {getStateForKeys} from '../../utils/Util';

const appId = 'd0d30cae45894e30b50cf0e222b04683';
const apiUrl = 'https://api.weatherbit.io/v2.0/';
const apiEndPoint = {
  current: 'current',
  weather: 'weather',
  find: 'find',
};

export class weatherBitManager {
  constructor(props) {
    this.instance = null;
    this.defaultQuery = {
      key: appId,
    };
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new weatherBitManager();
    }
    return this.instance;
  };
  getConnector = url => new Connector(url);
  getStateStore = () => ConfigStore().store.getState();
  getLocationByName = async ({query = {}}) => {
    myLog('getLocationByName-->', query);
    const localeUserSet = await LocalStorage.getItem(
      LocalStorage.DEFINE_KEY.LAST_LOCALE_SET,
    );
    return this.getConnector()
      .setUrl(apiUrl + apiEndPoint.current)
      .setQuery({
        ...this.defaultQuery,
        ...query,
        lang:
          localeUserSet ||
          getStateForKeys(this.getStateStore(), ['Language', 'language']),
        units:
          unitsQuery.weatherBit.temp[
            getStateForKeys(this.getStateStore(), ['Setting', 'unitTemp'])
          ],
      })
      .getPromise();
  };
  getWeatherByCityId = async ({query = {}}) => {
    myLog('getWeatherByCityId-->', query);
    const localeUserSet = await LocalStorage.getItem(
      LocalStorage.DEFINE_KEY.LAST_LOCALE_SET,
    );
    return this.getConnector()
      .setUrl(apiUrl + apiEndPoint.current)
      .setQuery({
        ...this.defaultQuery,
        ...query,
        lang:
          localeUserSet ||
          getStateForKeys(this.getStateStore(), ['Language', 'language']),
        units:
          unitsQuery.weatherBit.temp[
            getStateForKeys(this.getStateStore(), ['Setting', 'unitTemp'])
          ],
      })
      .getPromise();
  };
}
