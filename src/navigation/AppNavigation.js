import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './router/StackNavigator';
import RNExitApp from 'react-native-exit-app';

import NavigationService from './NavigationService';
import BaseElement from '../components/element/BaseElement';
import {ROUTER_NAME} from './NavigationConst';
import {EmitterManager} from '../modules/EmitterManager';
import {IS_ANDROID} from '../utils/DeviceUtil';
import LocalStorage from '../modules/LocalStorage';
import {AppDraw} from './router/DrawNavigator';

let isBack = false,
  timeoutVar = null;

export const checkDoublePress = () => {
  NavigationService.getInstance().showToast({
    message: '',
  });
  if (!isBack) {
    isBack = true;
    const backFunc = () => {
      isBack = false;
    };
    if (timeoutVar) {
      clearTimeout(timeoutVar);
      timeoutVar = null;
    }
    timeoutVar = setTimeout(backFunc, 2000);
    return true;
  }
  if (IS_ANDROID) {
    RNExitApp.exitApp();
  }
  return false;
};

class AppNavigator extends BaseElement {
  constructor(props) {
    super(props);
    this.displayName = 'AppNavigator';
  }
  _componentDidMount() {
    NavigationService.getInstance(this.navigation);
  }
  _componentWillUnmount() {
    NavigationService.clear();
  }

  getActiveRouteName = state => {
    const route = state.routes[state.index];

    if (route.state) {
      // Dive into nested navigators
      return this.getActiveRouteName(route.state);
    }

    return route.name;
  };

  _onStateChange = async state => {
    const previousRouteName = this.navigation.getCurrentRoute();
    this._debugLog('--_onStateChange---', state, previousRouteName);
    const currentRouteName = this.getActiveRouteName(state);
    NavigationService.getInstance().setCurrentScreen(currentRouteName);
    this._debugLog('currentScreen', currentRouteName);
  };

  renderContent() {
    return (
      <NavigationContainer
        ref={ref => (this.navigation = ref)}
        {...this.props}
        onStateChange={this._onStateChange}>
        <AppDraw />
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
