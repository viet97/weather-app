import {SplashScreen, HomeScreen} from '../components/screen';
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
};
