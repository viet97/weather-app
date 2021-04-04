import {LocationAction} from '../../actions';
import SettingAction from '../../actions/SettingAction';
import ConfigStore from '../../container/ConfigStore';
import {myLog} from '../../Debug';
import {getStateForKeys, getStateStore} from '../../utils/Util';
import LocalStorage from '../LocalStorage';

export class AppSettingManager {
  constructor(store) {
    this.instance = null;
    this.stateSettingApp = ConfigStore().store.getState();
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new AppSettingManager();
    }
    return this.instance;
  };
  getValueFrequency = () => {
    return getStateForKeys(this.stateSettingApp, [
      'Frequency',
      'frequencyValue',
    ]);
  };
  changeDataSetting = async (key, value) => {
    let finalValue = '';
    if (value && typeof value !== 'object' && value.toString()) {
      finalValue = value.toString();
    } else if (typeof value === 'object') {
      finalValue = JSON.stringify(value);
    }
    await LocalStorage.setItem(key, finalValue);
  };
  setDataLocationFromLocal = async () => {
    const dataLocation = await LocalStorage.getItem(
      LocalStorage.DEFINE_KEY.LOCATION,
    );
    myLog('---setDataLocationFromLocal---', dataLocation);
    if (dataLocation) {
      ConfigStore().store.dispatch(
        LocationAction.changeLocation(JSON.parse(dataLocation)),
      );
    }
  };
  setDataSettingFromLocal = async () => {
    this.setDataLocationFromLocal();
    const dataSetting = await LocalStorage.getMultiItem(
      Object.values(LocalStorage.DEFINE_KEY.SETTING_APP),
    );
    myLog(
      '---setDataSettingFromLocal--->',
      dataSetting,
      this.stateSettingApp,
      ConfigStore().store.getState(),
    );
    const SettingReducer = getStateForKeys(ConfigStore().store.getState(), [
      'Setting',
    ]);
    myLog('---SettingReducer--->', SettingReducer);
    let settingAppFromLocalStorage = {};
    dataSetting &&
      dataSetting.map(item => {
        switch (item[0]) {
          case LocalStorage.DEFINE_KEY.SETTING_APP.DAILY_NOTIFICATION:
            if (item[1]) settingAppFromLocalStorage.dailyNotification = item[1];
            break;
          case LocalStorage.DEFINE_KEY.SETTING_APP.SEVERE_ALERT:
            if (item[1]) settingAppFromLocalStorage.severeAlert = item[1];
            break;
          case LocalStorage.DEFINE_KEY.SETTING_APP.ALARM_RAIN_SNOW:
            if (item[1]) settingAppFromLocalStorage.rainAndSnow = item[1];
            break;
          case LocalStorage.DEFINE_KEY.SETTING_APP.WEATHER_PROVIDER:
            if (item[1]) settingAppFromLocalStorage.dataSource = item[1];
            break;
          case LocalStorage.DEFINE_KEY.SETTING_APP.DAILY_NOTIFICATION:
            if (item[1]) settingAppFromLocalStorage.frequencyValue = item[1];
            break;
          case LocalStorage.DEFINE_KEY.SETTING_APP.CUSTOM_LAYOUT:
            if (item[1])
              settingAppFromLocalStorage.layout = item[1]
                ? JSON.parse(item[1])
                : '';
            break;
          case LocalStorage.DEFINE_KEY.SETTING_APP.UNIT_TEMP:
            if (item[1]) settingAppFromLocalStorage.unitTemp = item[1];
            break;
          case LocalStorage.DEFINE_KEY.SETTING_APP.UNIT_DISTANCE:
            if (item[1]) settingAppFromLocalStorage.unitDistance = item[1];
            break;
          case LocalStorage.DEFINE_KEY.SETTING_APP.UNIT_RAIN_SNOW:
            if (item[1]) settingAppFromLocalStorage.unitRainSnow = item[1];
            break;
          case LocalStorage.DEFINE_KEY.SETTING_APP.UNIT_DISTANCE:
            if (item[1]) settingAppFromLocalStorage.unitDistance = item[1];
            break;
          case LocalStorage.DEFINE_KEY.SETTING_APP.UNIT_WIND_SPEED:
            if (item[1]) settingAppFromLocalStorage.unitWindSpeed = item[1];
            break;
          case LocalStorage.DEFINE_KEY.SETTING_APP.UNIT_PRESSURE:
            if (item[1]) settingAppFromLocalStorage.unitPressure = item[1];
            break;
          default:
            break;
        }
      });
    if (Object.keys(settingAppFromLocalStorage).length) {
      myLog('---settingAppFromLocalStorage---', settingAppFromLocalStorage);
      ConfigStore().store.dispatch(
        SettingAction.changeMultiValueSetting({
          settings: settingAppFromLocalStorage,
        }),
      );
    }
  };
}
