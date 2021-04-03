import Immutable from 'immutable';
import {size} from 'lodash';
import SVGIcon from '../../../assets/SVGIcon';
import {
  NORMAL_TYPE,
  REQUEST_SUBTYPE,
  REQUEST_TYPE,
} from '../../actions/ActionTypes';
import {myLog} from '../../Debug';
import {getValueFromObjectByKeys} from '../../utils/Util';

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
          const rain = getValueFromObjectByKeys(currentWeather, ['rain']);
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
              description: 'Feel Like',
            },
            {
              Icon: SVGIcon.humidity,
              value: humidity,
              unit: '%',
              description: 'Humidity',
            },
            {
              Icon: SVGIcon.rain_snow,
              value: rain,
              unit: 'mm',
              description: 'Rain/Snow',
            },
            {
              Icon: SVGIcon.wind,
              value: wind_speed,
              unit: 'km/h',
              description: 'Wind',
            },
            {
              Icon: SVGIcon.uv_index,
              value: uvi,
              unit: '',
              description: 'UV Index',
            },
            {
              Icon: SVGIcon.dew_point,
              value: dew_point,
              unit: '%',
              description: 'Dew Point',
            },
            {
              Icon: SVGIcon.pressure,
              value: pressure,
              unit: 'mb',
              description: 'Pressure',
            },
            {
              Icon: SVGIcon.visibility,
              value: visibility,
              unit: 'km',
              description: 'Visibility',
            },
          ];
          myLog('REQUEST_TYPE.GET_ALL_DATA', listGridInfo);

          return state
            .setIn(['weather'], data)
            .setIn(['listGridInfo'], listGridInfo)
            .setIn(['daily'], daily)
            .setIn(['current'], current)
            .setIn(['hourly'], hourly);
          break;
        default:
          return state;
      }

    case REQUEST_TYPE.GET_AIR_POLLUTION:
      switch (action.subType) {
        case REQUEST_SUBTYPE.SUCCESS:
          const data = getValueFromObjectByKeys(action, ['data', 'data']);
          const list = getValueFromObjectByKeys(data, ['list']);
          let listAirObj = {};
          let aqi = 0;
          if (size(list) > 0) {
            listAirObj = getValueFromObjectByKeys(list[0], ['components']);
            aqi = getValueFromObjectByKeys(list[0], ['main', 'aqi']);
          }
          myLog('REQUEST_TYPE.GET_AIR_POLLUTION', list);

          return state.setIn(['listAirObj'], listAirObj).setIn(['aqi'], aqi);
        default:
          return state;
          break;
      }
    default:
      return state;
  }
};
