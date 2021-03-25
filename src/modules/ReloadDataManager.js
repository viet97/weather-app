import {nowCustom, getValueFromObjectByKeys} from '../utils/Util';
import NavigationService from '../navigation/NavigationService';
import {EmitterManager} from './EmitterManager';

const LIST_KEY = {
  HOME: '@Home',
  CHANNEL: '@Channel',
};

export class ReloadDataManager {
  static getInstance() {
    if (!this._instance) {
      this._instance = new ReloadDataManager();
    }
    return this._instance;
  }

  static clear() {
    if (this._instance) {
      delete this._instance;
    }
  }

  static listKey = LIST_KEY;

  constructor() {
    this.displayName = 'ReloadDataManager';
    this.init();
  }

  init() {
    Object.keys(LIST_KEY).map((row, i) => {
      this[row] = undefined;
      return;
    });
  }

  setLastTime({key} = {}) {
    this[key] = nowCustom();
  }

  getLastTime({key} = {}) {
    return this[key] || undefined;
  }

  checkAndReloadChannel() {
    const channelRefreshTime = getValueFromObjectByKeys(
      NavigationService.getInstance().getStateRedux(['Config', 'config']),
      ['channelRefreshTime'],
    );
    const timeLoadChannel = ReloadDataManager.getInstance().getLastTime({
      key: ReloadDataManager.listKey.CHANNEL,
    });
    if (
      !timeLoadChannel ||
      (channelRefreshTime &&
        channelRefreshTime > 0 &&
        nowCustom() - timeLoadChannel > channelRefreshTime * 1000)
    ) {
      EmitterManager.getInstance().emit(
        EmitterManager.listEvent.GET_LIST_CHANNNEL,
      );
    }
  }

  reloadVODTab = () => {
    EmitterManager.getInstance().emit(EmitterManager.listEvent.GET_DATA_VOD);
  };

  onNeedReloadVodTab = cb => {
    EmitterManager.getInstance().on(EmitterManager.listEvent.GET_DATA_VOD, cb);
  };

  removeNeedReloadVodTab = cb => {
    EmitterManager.getInstance().off(EmitterManager.listEvent.GET_DATA_VOD, cb);
  };

  checkAndReloadHome() {
    const homeRefreshTime = getValueFromObjectByKeys(
      NavigationService.getInstance().getStateRedux(['Config', 'config']),
      ['homeRefreshTime'],
    );
    const timeLoadHome = ReloadDataManager.getInstance().getLastTime({
      key: ReloadDataManager.listKey.HOME,
    });
    if (
      !timeLoadHome ||
      (homeRefreshTime &&
        homeRefreshTime > 0 &&
        nowCustom() - timeLoadHome > homeRefreshTime * 1000)
    ) {
      EmitterManager.getInstance().emit(
        EmitterManager.listEvent.GET_HOME,
        true,
      );
    }
  }
}
