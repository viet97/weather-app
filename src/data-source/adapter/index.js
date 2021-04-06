import { myLog } from '../../Debug';
import { DEFINE_DATA_SOURCE } from '../../Define';
import { deepCopyObject, getValueFromObjectByKeys } from '../../utils/Util';

export class AdapterManager {
  constructor() {
    this.instance = null;
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new AdapterManager();
    }
    return this.instance;
  };
  convertLocationData = ({ data, source }) => {
    myLog('---convertLocationData--->', data, source);
    switch (source) {
      case DEFINE_DATA_SOURCE.openWeather.key:
        return data;
      case DEFINE_DATA_SOURCE.weatherBit.key:
        return data;
      default:
        return null;
    }
  };
  convertWeatherDetailData = ({ data, source }) => {
    myLog('---convertLocationData--->', data, source);
    switch (source) {
      case DEFINE_DATA_SOURCE.openWeather.key:
        return data;
      case DEFINE_DATA_SOURCE.weatherBit.key:
        let tmpDataWeatherBit = deepCopyObject(data),
          dataDetailWeatherBitFormat = {};
        if (getValueFromObjectByKeys(tmpDataWeatherBit, ['data', 'data'])) {
          if (tmpDataWeatherBit.data.data[0]) {
            let dataDetailWeatherBit = deepCopyObject(
              tmpDataWeatherBit.data.data[0],
            );
            dataDetailWeatherBitFormat = {
              name: dataDetailWeatherBit.city_name,
              id: data.arg.query.city_id,
              key: data.arg.query.city_id,
              main: { temp: dataDetailWeatherBit.temp },
            };
          }
        }
        return { ...data, data: dataDetailWeatherBitFormat };
      default:
        return null;
    }
  };
}
