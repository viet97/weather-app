import Connector from '../../connection/Connector';
import ConfigStore from '../../container/ConfigStore';
import {myLog} from '../../Debug';
import {DEFINE_UNITS_TEMP, unitsQuery} from '../../Define';
import LocalStorage from '../../modules/LocalStorage';
import {getStateForKeys} from '../../utils/Util';

const forecaAppId =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wZmEuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTYxNzcwOTI0NywiZXhwIjoxNjE4MzE0MDQ3LCJuYmYiOjE2MTc3MDkyNDcsImp0aSI6IjA1MGYxNTUxOTdlZDUwNWIiLCJzdWIiOiJhY2NjIiwiZm10IjoiWERjT2hqQzQwK0FMamxZVHRqYk9pQT09In0.Dk_vLgidNLgcX5rlCnFgCAFBBP0H1ztd-rdw8BnFIz0';
const apiUrl = 'https://pfa.foreca.com/api/v1/';
const apiEndPoint = {
  current: 'current',
};

export class forecaWeatherManager {
  constructor(props) {
    this.instance = null;
    this.defaultQuery = {
      token: forecaAppId,
    };
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new forecaWeatherManager();
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
    const {lat, lon} = query;
    return this.getConnector()
      .setUrl(apiUrl + apiEndPoint.current + '/' + `${lon},${lat}`)
      .setQuery({
        ...this.defaultQuery,
        lang:
          localeUserSet ||
          getStateForKeys(ConfigStore().store.getState(), [
            'Language',
            'language',
          ]),
        tempunit:
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
