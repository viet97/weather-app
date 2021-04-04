import Connector from '../../connection/Connector';
import ConfigStore from '../../container/ConfigStore';
import {myLog} from '../../Debug';
import {DEFINE_DATA_SOURCE} from '../../Define';
import {getStateForKeys} from '../../utils/Util';
import {AdapterManager} from '../adapter';
import {openWeatherManager} from '../open-weather';

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
  getKeyDataSource = () => {
    return getStateForKeys(ConfigStore().store.getState(), [
      'Setting',
      'dataSource',
    ]);
  };
  getLocationByName = async ({query = {}}) => {
    try {
      const keyDataSource = this.getKeyDataSource();
      switch (keyDataSource) {
        case DEFINE_DATA_SOURCE.openWeather.key:
          return AdapterManager.getInstance().convertLocationData({
            data: await openWeatherManager
              .getInstance()
              .getLocationByName({query}),
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
  getWeatherByCityId = async ({query = {}}) => {
    try {
      myLog('getWeatherByCityId--->', query);
      const keyDataSource = this.getKeyDataSource();
      switch (keyDataSource) {
        case DEFINE_DATA_SOURCE.openWeather.key:
          return AdapterManager.getInstance().convertWeatherDetailData({
            data: await openWeatherManager
              .getInstance()
              .getWeatherByCityId({query}),
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
