import {
  SplashScreen,
  HomeScreen,
  SettingScreen,
  FrequencyScreen,
  LanguageScreen,
  WeatherProviderScreen,
  UnitScreen,
  CustomLayoutScreen,
  MenuScreen,
  AboutScreen,
  NotificationScreen,
  AddLocationScreen,
  DailyDetailScreen,
  AirQualityDetailScreen,
  HourlyDetailScreen,
} from '../components/screen';
import {AppDraw} from './router/DrawNavigator';
import {AppTab} from './router/TabNavigator';

export const ROUTER_NAME = {
  SPLASH: {
    title: 'Khởi động',
    name: 'SplashScreen',
    component: SplashScreen,
  },
  APP_TAB: {
    title: 'Drawer',
    name: 'AppDraw',
    component: AppDraw,
    isNoStack: true,
  },
  HOME: {
    title: 'Tài khoản',
    name: 'HomeScreen',
    component: HomeScreen,
    isNoStack: true,
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
  WEATHER_PROVIDER: {
    title: 'Weather Provider',
    name: 'WeatherProviderScreen',
    component: WeatherProviderScreen,
  },
  UNIT: {
    title: 'Units',
    name: 'UnitScreen',
    component: UnitScreen,
  },
  CUSTOM_LAYOUT: {
    title: 'Custom Layout',
    name: 'CustomLayoutScreen',
    component: CustomLayoutScreen,
  },
  MENU: {
    title: 'Menu',
    name: 'MenuScreen',
    component: MenuScreen,
  },
  ABOUT: {
    title: 'About',
    name: 'AboutScreen',
    component: AboutScreen,
  },
  Notification: {
    title: 'Notification',
    name: 'NotificationScreen',
    component: NotificationScreen,
  },
  ADD_LOCATION: {
    title: 'AddLocation',
    name: 'AddLocationScreen',
    component: AddLocationScreen,
  },
  DAILY_DETAIL: {
    title: 'DailyDetail',
    name: 'DailyDetailScreen',
    component: DailyDetailScreen,
  },
  AIR_QUALITY_DETAIL: {
    title: 'AirQualityDetail',
    name: 'AirQualityDetailScreen',
    component: AirQualityDetailScreen,
  },
  HOURLY_DETAIL: {
    title: 'HourlyDetail',
    name: 'HourlyDetailScreen',
    component: HourlyDetailScreen,
  },
};
