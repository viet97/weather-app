/**
 * @format
 */
import {AppRegistry, UIManager} from 'react-native';
import App from './src/container/App';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens';
import {IS_ANDROID} from './src/utils/DeviceUtil';

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.capitalizeInEachWord = function () {
  return this.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
enableScreens();

if (IS_ANDROID) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

AppRegistry.registerComponent(appName, () => App);
