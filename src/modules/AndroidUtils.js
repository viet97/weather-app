import {NativeModules} from 'react-native';
import {IS_ANDROID} from '../utils/DeviceUtil';

const isAndroidNavigationShown = () =>
  IS_ANDROID
    ? NativeModules.AndroidUtils.isAndroidNavigationBarShownSync()
    : false;
const getXdpi = () => (IS_ANDROID ? NativeModules.AndroidUtils.xdpi : 0);

const showAndroidNavigationBar = () => {
  if (IS_ANDROID) {
    NativeModules.AndroidUtils.showNavigationBar();
  }
};
const hideAndroidNavigationBar = () => {
  if (IS_ANDROID) {
    NativeModules.AndroidUtils.hideNavigationBar();
  }
};

const RNAndroidUtils = {
  isAndroidNavigationShown,
  showAndroidNavigationBar,
  hideAndroidNavigationBar,
  getXdpi,
};

export default RNAndroidUtils;
