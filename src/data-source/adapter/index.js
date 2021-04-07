import {myLog} from '../../Debug';
import {DEFINE_DATA_SOURCE} from '../../Define';
import {deepCopyObject, getValueFromObjectByKeys} from '../../utils/Util';

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
  convertLocationData = ({data, source}) => {
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
  convertWeatherDetailData = ({data, source}) => {
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
              main: {temp: dataDetailWeatherBit.temp},
              sys: {
                country: dataDetailWeatherBit.country_code,
              },
            };
          }
        }
        return {...data, data: dataDetailWeatherBitFormat};
      case DEFINE_DATA_SOURCE.foreca.key:
        let tmpDataForeca = deepCopyObject(data),
          dataDetailForecaFormat = {};
        if (getValueFromObjectByKeys(tmpDataForeca, ['data', 'current'])) {
          if (tmpDataForeca.data.current) {
            let dataDetailForeca = deepCopyObject(tmpDataForeca.data.current);
            dataDetailForecaFormat = {
              name: '',
              main: {temp: dataDetailForeca.temperature},
            };
          }
        }
        return {...data, data: dataDetailForecaFormat};
      default:
        return null;
    }
  };
}
