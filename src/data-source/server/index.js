import Connector from '../../connection/Connector';
import ConfigStore from '../../container/ConfigStore';
import { myLog } from '../../Debug';
import { DEFINE_DATA_SOURCE } from '../../Define';
import LocalStorage from '../../modules/LocalStorage';
import { deepCopyObject, getStateForKeys } from '../../utils/Util';
import { AdapterManager } from '../adapter';
import { openWeatherManager } from '../open-weather';
import { weatherBitManager } from '../weather-bit';

export class MyServer {
  constructor(props) {
    this.instance = null;
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new MyServer();
    }
    return this.instance;
  };
  getKeyDataSource = async () => {
    return (
      (await LocalStorage.getItem(
        LocalStorage.DEFINE_KEY.SETTING_APP.WEATHER_PROVIDER,
      )) ||
      getStateForKeys(ConfigStore().store.getState(), ['Setting', 'dataSource'])
    );
  };
  getLocationByName = async ({ query = {} }) => {
    try {
      const keyDataSource = await this.getKeyDataSource();
      switch (keyDataSource) {
        case DEFINE_DATA_SOURCE.openWeather.key:
          return AdapterManager.getInstance().convertLocationData({
            data: await openWeatherManager
              .getInstance()
              .getLocationByName({ query }),
            source: keyDataSource,
          });
        case DEFINE_DATA_SOURCE.weatherBit.key:
          let queryWeatherBit = deepCopyObject(query);
          queryWeatherBit.city = query.q;
          delete queryWeatherBit.q;
          return AdapterManager.getInstance().convertLocationData({
            data: await weatherBitManager
              .getInstance()
              .getLocationByName({ query: queryWeatherBit }),
            source: keyDataSource,
          });
        default:
          break;
      }
    } catch (error) {
      myLog('--getLocationByName error---', error);
      throw error;
    }
  };
  getWeatherByCityId = async ({ query = {} }) => {
    try {
      const keyDataSource = await this.getKeyDataSource();
      myLog('getWeatherByCityId--->', query, keyDataSource);
      switch (keyDataSource) {
        case DEFINE_DATA_SOURCE.openWeather.key:
          return AdapterManager.getInstance().convertWeatherDetailData({
            data: await openWeatherManager
              .getInstance()
              .getWeatherByCityId({ query }),
            source: keyDataSource,
          });
        case DEFINE_DATA_SOURCE.weatherBit.key:
          let tmpQueryWeatherBit = deepCopyObject(query);
          tmpQueryWeatherBit.city_id = query.id;
          delete tmpQueryWeatherBit.id;
          return AdapterManager.getInstance().convertWeatherDetailData({
            data: await weatherBitManager
              .getInstance()
              .getWeatherByCityId({ query: tmpQueryWeatherBit }),
            source: keyDataSource,
          });
        default:
          break;
      }
    } catch (error) {
      myLog('--getWeatherByCityId error---', error);
      throw error;
    }
  };
}
