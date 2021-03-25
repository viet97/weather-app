import {EmitterManager} from './EmitterManager';
import {AppState} from 'react-native';
import {myLog} from '../Debug';

const APP_STATE_TYPE = {
  ACTIVE: 'active',
  IN_ACTIVE: 'inactive',
  BACK_GROUND: 'background',
};

const AppStateModule = {
  previousAppState: AppState.currentState,
  appState: AppState.currentState,
  isActive: () => AppStateModule.appState === APP_STATE_TYPE.ACTIVE,
  isInActive: () => AppStateModule.appState === APP_STATE_TYPE.IN_ACTIVE,
  isBackground: () => AppStateModule.appState === APP_STATE_TYPE.BACK_GROUND,
  isComeForegroundFromBackground: () =>
    AppStateModule.previousAppState === APP_STATE_TYPE.BACK_GROUND &&
    AppStateModule.isActive(),
};

AppState.addEventListener('change', state => {
  if (state !== AppStateModule.appState) {
    AppStateModule.previousAppState = AppStateModule.appState;
    AppStateModule.appState = state;
    EmitterManager.getInstance().emit(
      EmitterManager.listEvent.APP_STATE_CHANGE,
      state,
    );
  }
});

export default AppStateModule;
