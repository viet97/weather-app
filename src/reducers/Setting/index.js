import Immutable, {mergeDeep, Map} from 'immutable';
import {NORMAL_TYPE} from '../../actions/ActionTypes';
import {
  DEFINE_DATA_SOURCE,
  DEFINE_LANGUAGE,
  DEFINE_LAYOUT,
  DEFINE_THEME_COLOR,
  DEFINE_TIME_FORMAT,
  DEFINE_UNITS_DISTANCE,
  DEFINE_UNITS_PRESSURE,
  DEFINE_UNITS_RAIN_SNOW,
  DEFINE_UNITS_TEMP,
  DEFINE_UNITS_WIND_SPEED,
  DEFINE_UNIT_FREQUENCY,
} from '../../Define';
import {locale} from '../../Config';
import {myLog} from '../../Debug';
import {AppSettingManager} from '../../modules/AppSettingManager';
import LocalStorage from '../../modules/LocalStorage';

const initState = Immutable.fromJS({
  dailyNotification: 0,
  severeAlert: 0,
  alarmRainAndSnow: 0,
  dataSource: DEFINE_DATA_SOURCE.openWeather.key,
  frequencyValue: DEFINE_UNIT_FREQUENCY['30m'].value,
  language: DEFINE_LANGUAGE.vi.value,
  layout: Object.values(DEFINE_LAYOUT)
    .sort((a, b) => a.active - b.active)
    .sort((a, b) => a.index - b.index),
  unitTemp: DEFINE_UNITS_TEMP.c.value,
  unitRainSnow: DEFINE_UNITS_RAIN_SNOW.mm.value,
  unitDistance: DEFINE_UNITS_DISTANCE.mi.value,
  unitWindSpeed: DEFINE_UNITS_WIND_SPEED.kph.value,
  unitPressure: DEFINE_UNITS_PRESSURE.mmHg.value,
  themeColor: DEFINE_THEME_COLOR.light.value,
  timeFormat: DEFINE_TIME_FORMAT['24h'].value,
});

export default (state = initState, action) => {
  switch (action.key) {
    case NORMAL_TYPE.CHANGE_MULTI_VALUE_SETTING:
      myLog('---CHANGE_MULTI_VALUE_SETTING--->', action, state);
      // return state;
      const {settings} = action.data;

      return state.merge(settings);
    case NORMAL_TYPE.CHANGE_VALUE_SETTING:
      myLog('---CHANGE_VALUE_SETTING---', action);
      switch (action.data.subKey) {
        case NORMAL_TYPE.CHANGE_VALUE_DAILY_NOTIFICATION:
          const {dailyNotification} = action.data;
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.DAILY_NOTIFICATION,
            dailyNotification,
          );
          return state.setIn(['dailyNotification'], dailyNotification);
        case NORMAL_TYPE.CHANGE_VALUE_SEVERE_ALERT:
          const {severeAlert} = action.data;
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.SEVERE_ALERT,
            severeAlert,
          );
          return state.setIn(['severeAlert'], severeAlert);
        case NORMAL_TYPE.CHANGE_VALUE_NOTI_RAIN_SNOW:
          const {alarmRainAndSnow} = action.data;
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.ALARM_RAIN_SNOW,
            alarmRainAndSnow,
          );
          return state.setIn(['alarmRainAndSnow'], alarmRainAndSnow);
        case NORMAL_TYPE.CHANGE_LAYOUT:
          myLog('---CHANGE_LAYOUT--->', action);
          const {layout} = action.data;
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.CUSTOM_LAYOUT,
            layout,
          );
          return state.setIn(['layout'], layout || []);
        case NORMAL_TYPE.CHANGE_LANGUAGE:
          return state.setIn(['language'], action.data.language);
        case NORMAL_TYPE.CHANGE_VALUE_FREQUENCY:
          const {frequencyValue} = action.data;
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.VALUE_FREQUENCY,
            frequencyValue,
          );
          return state.setIn(['frequencyValue'], frequencyValue);
        case NORMAL_TYPE.CHANGE_DATA_SOURCE:
          const {dataSource} = action.data;
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.WEATHER_PROVIDER,
            dataSource,
          );
          return state.setIn(['dataSource'], dataSource);
        case NORMAL_TYPE.CHANGE_VALUE_UNIT_RAIN:
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.UNIT_RAIN_SNOW,
            action.data.unit,
          );
          return state.setIn(['unitRainSnow'], action.data.unit);
        case NORMAL_TYPE.CHANGE_VALUE_UNIT_TEMP:
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.UNIT_TEMP,
            action.data.unit,
          );
          return state.setIn(['unitTemp'], action.data.unit);
        case NORMAL_TYPE.CHANGE_VALUE_UNIT_DISTANCE:
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.UNIT_DISTANCE,
            action.data.unit,
          );
          return state.setIn(['unitDistance'], action.data.unit);
        case NORMAL_TYPE.CHANGE_VALUE_UNIT_WIND:
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.UNIT_WIND_SPEED,
            action.data.unit,
          );
          return state.setIn(['unitWindSpeed'], action.data.unit);
        case NORMAL_TYPE.CHANGE_VALUE_UNIT_PRESSURE:
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.UNIT_PRESSURE,
            action.data.unit,
          );
          return state.setIn(['unitPressure'], action.data.unit);
        case NORMAL_TYPE.CHANGE_VALUE_THEME_COLOR:
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.THEME_COLOR,
            action.data.themeColor,
          );
          return state.setIn(['themeColor'], action.data.themeColor);
        case NORMAL_TYPE.CHANGE_VALUE_TIME_FORMAT:
          AppSettingManager.getInstance().changeDataSetting(
            LocalStorage.DEFINE_KEY.SETTING_APP.TIME_FORMAT,
            action.data.timeFormat,
          );
          return state.setIn(['timeFormat'], action.data.timeFormat);
        default:
          return state;
      }
    default:
      return state;
  }
};
