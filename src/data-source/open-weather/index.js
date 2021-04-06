import Connector from '../../connection/Connector';
import ConfigStore from '../../container/ConfigStore';
import {myLog} from '../../Debug';
import {DEFINE_UNITS_TEMP, unitsQuery} from '../../Define';
import LocalStorage from '../../modules/LocalStorage';
import {getStateForKeys} from '../../utils/Util';

const openWeatherAppId = '55ef21e63e49a17721cee8a48a64bad8';
const apiUrl = 'https://api.openweathermap.org/data/2.5/';
const apiEndPoint = {
  oneCall: 'onecall',
  weather: 'weather',
  find: 'find',
};

export class openWeatherManager {
  constructor(props) {
    this.instance = null;
    this.defaultQuery = {
      appid: openWeatherAppId,
    };
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new openWeatherManager();
    }
    return this.instance;
  };
  getConnector = url => new Connector(url);
  getLocationByName = ({query = {}}) => {
    myLog('getLocationByName-->', query);
    return this.getConnector()
      .setUrl(apiUrl + apiEndPoint.find)
      .setQuery({
        ...this.defaultQuery,
        ...query,
        units:
          unitsQuery.openWeather.temp[
            getStateForKeys(ConfigStore().store.getState(), [
              'Setting',
              'unitTemp',
            ])
          ],
        type: 'like',
        sort: 'population',
      })
      .getPromise();
  };
  getWeatherByCityId = async ({query = {}}) => {
    myLog('getWeatherByCityId-->', query);
    const localeUserSet = await LocalStorage.getItem(
      LocalStorage.DEFINE_KEY.LAST_LOCALE_SET,
    );
    return this.getConnector()
      .setUrl(apiUrl + apiEndPoint.weather)
      .setQuery({
        ...this.defaultQuery,
        ...query,
        lang:
          localeUserSet ||
          getStateForKeys(ConfigStore().store.getState(), [
            'Language',
            'language',
          ]),
        units:
          unitsQuery.openWeather.temp[
            getStateForKeys(ConfigStore().store.getState(), [
              'Setting',
              'unitTemp',
            ])
          ],
      })
      .getPromise();
  };
  getWeatherByGeometry = async ({query = {}}) => {
    myLog('getWeatherByGeometry-->', query);
    const localeUserSet = await LocalStorage.getItem(
      LocalStorage.DEFINE_KEY.LAST_LOCALE_SET,
    );
    return this.getConnector()
      .setUrl(apiUrl + apiEndPoint.weather)
      .setQuery({
        ...this.defaultQuery,
        ...query,
        lang:
          localeUserSet ||
          getStateForKeys(ConfigStore().store.getState(), [
            'Language',
            'language',
          ]),
        units:
          unitsQuery.openWeather.temp[
            getStateForKeys(ConfigStore().store.getState(), [
              'Setting',
              'unitTemp',
            ])
          ],
      })
      .getPromise();
  };
}
