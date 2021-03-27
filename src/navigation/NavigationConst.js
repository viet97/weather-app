import {
  SplashScreen,
  HomeScreen,
  SettingScreen,
  FrequencyScreen,
  LanguageScreen,
} from '../components/screen';
import {AppTab} from './router/TabNavigator';

export const ROUTER_NAME = {
  SPLASH: {
    title: 'Khởi động',
    name: 'SplashScreen',
    component: SplashScreen,
  },
  APP_TAB: {
    title: 'Drawer',
    name: 'AppTab',
    component: AppTab,
  },
  HOME: {
    title: 'Tài khoản',
    name: 'HomeScreen',
    component: HomeScreen,
  },
  SETTING: {
    title: 'Setting',
    name: 'SettingScreen',
    component: SettingScreen,
  },
  FREQUENCY: {
    title: 'Frequency',
    name: 'FrequencyScreen',
    component: FrequencyScreen,
  },
  LANGUAGE: {
    title: 'Language',
    name: 'LanguageScreen',
    component: LanguageScreen,
  },
};
