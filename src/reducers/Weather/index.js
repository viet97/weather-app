import Immutable from 'immutable';
import { size } from 'lodash';
import SVGIcon from '../../../assets/SVGIcon';
import {
  NORMAL_TYPE,
  REQUEST_SUBTYPE,
  REQUEST_TYPE,
} from '../../actions/ActionTypes';
import { myLog } from '../../Debug';
import { languagesKeys } from '../../modules/i18n/defined';
import { getValueFromObjectByKeys } from '../../utils/Util';

const initState = Immutable.fromJS({
  weather: {},
  listGridInfo: [],
});

export default (state = initState, action) => {
  switch (action.key) {
    case REQUEST_TYPE.GET_ALL_DATA:
      switch (action.subType) {
        case REQUEST_SUBTYPE.SUCCESS:
          const data = getValueFromObjectByKeys(action, ['data', 'data']);
          const currentWeather = getValueFromObjectByKeys(data, ['current']);
          const hourly = getValueFromObjectByKeys(data, ['hourly']);
          const current = getValueFromObjectByKeys(data, ['current']);
          const daily = getValueFromObjectByKeys(data, ['daily']);
          const temp = getValueFromObjectByKeys(currentWeather, ['temp']);
          const humidity = getValueFromObjectByKeys(currentWeather, [
            'humidity',
          ]);
          const rain = getValueFromObjectByKeys(currentWeather, ['rain', '1h']);
          const wind_speed = getValueFromObjectByKeys(currentWeather, [
            'wind_speed',
          ]);
          const uvi = getValueFromObjectByKeys(currentWeather, ['uvi']);
          const dew_point = getValueFromObjectByKeys(currentWeather, [
            'dew_point',
          ]);
          const pressure = getValueFromObjectByKeys(currentWeather, [
            'pressure',
          ]);
          const visibility = getValueFromObjectByKeys(currentWeather, [
            'visibility',
          ]);
          const listGridInfo = [
            {
              Icon: SVGIcon.temp,
              value: temp,
              unit: 'oC',
              description: languagesKeys.feelsLike,
            },
            {
              Icon: SVGIcon.humidity,
              value: humidity,
              unit: '%',
              description: languagesKeys.humidity,
            },
            {
              Icon: SVGIcon.rain_snow,
              value: rain,
              unit: 'mm',
              description: languagesKeys.rainSnow,
            },
            {
              Icon: SVGIcon.wind,
              value: wind_speed,
              unit: 'km/h',
              description: languagesKeys.wind,
            },
            {
              Icon: SVGIcon.uv_index,
              value: uvi,
              unit: '',
              description: languagesKeys.uvIndex,
            },
            {
              Icon: SVGIcon.dew_point,
              value: dew_point,
              unit: '%',
              description: languagesKeys.dewPoint,
            },
            {
              Icon: SVGIcon.pressure,
              value: pressure,
              unit: 'mb',
              description: languagesKeys.pressure,
            },
            {
              Icon: SVGIcon.visibility,
              value: visibility,
              unit: 'km',
              description: languagesKeys.visibility,
            },
          ];
          myLog('REQUEST_TYPE.GET_ALL_DATA', listGridInfo);

          return state
            .setIn(['weather'], data)
            .setIn(['listGridInfo'], listGridInfo)
            .setIn(['daily'], daily)
            .setIn(['current'], current)
            .setIn(['hourly'], hourly);
        default:
          return state;
      }

    case REQUEST_TYPE.GET_AIR_POLLUTION:
      switch (action.subType) {
        case REQUEST_SUBTYPE.SUCCESS:
          const data = getValueFromObjectByKeys(action, [
            'data',
            'data',
            'data',
          ]);
          myLog('REQUEST_TYPE.GET_AIR_POLLUTION', data);

          return state.setIn(['aqi_data'], data);
        default:
          return state;
      }
    default:
      return state;
  }
};
