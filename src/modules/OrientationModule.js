import Orientation from 'react-native-orientation-locker';
import {
  PORTRAIT,
  LANDSCAPE,
  LANDSCAPE_LEFT,
  LANDSCAPE_RIGHT,
} from 'react-native-orientation-locker/ScreenOrientation';
import {EmitterManager} from './EmitterManager';
import {StatusBar} from 'react-native';
import RNAndroidUtils from './AndroidUtils';

Orientation.addOrientationListener(orientation => {
  if (OrientationModule.orientation !== orientation) {
    OrientationModule.orientation = orientation;
    if (OrientationModule.isPortrait()) {
      StatusBar.setHidden(false);
      RNAndroidUtils.showAndroidNavigationBar();
    } else {
      StatusBar.setHidden(true);
      RNAndroidUtils.hideAndroidNavigationBar();
    }
    EmitterManager.getInstance().emit(
      EmitterManager.listEvent.ORIENTATION_DID_CHANGE,
      orientation,
    );
  }
});

Orientation.addDeviceOrientationListener(deviceOrientation => {
  return;
  if (OrientationModule.deviceOrientation !== deviceOrientation) {
    OrientationModule.deviceOrientation = deviceOrientation;
    EmitterManager.getInstance().emit(
      EmitterManager.listEvent.DEVICE_ORIENTATION_DID_CHANGE,
      deviceOrientation,
    );
  }
});

const OrientationModule = {
  PORTRAIT,
  LANDSCAPE,
  LANDSCAPE_LEFT,
  LANDSCAPE_RIGHT,
  orientation: PORTRAIT,
  deviceOrientation: PORTRAIT,
  lockToPortrait: () => {
    Orientation.lockToPortrait();
  },
  lockToLandscape: () => {
    Orientation.lockToLandscape();
  },
  lockToLandscapeLeft: () => {
    Orientation.lockToLandscapeLeft();
  },
  lockToLandscapeRight: () => {
    Orientation.lockToLandscapeRight();
  },
  getAutoRotate: cb => {
    Orientation.getAutoRotateState(isAuto => {
      cb && cb(isAuto);
    });
  },
  rotate: orientation => {
    if (orientation === OrientationModule.orientation || !orientation) return;

    switch (orientation) {
      case OrientationModule.PORTRAIT:
        OrientationModule.lockToPortrait();
        break;
      case OrientationModule.LANDSCAPE:
        OrientationModule.lockToLandscape();
        break;
      case OrientationModule.LANDSCAPE_LEFT:
        OrientationModule.lockToLandscapeLeft();
        break;
      case OrientationModule.LANDSCAPE_RIGHT:
        OrientationModule.lockToLandscapeRight();
        break;
      default:
        break;
    }
  },
  isPortrait: () => OrientationModule.orientation === PORTRAIT,
  isLandscape: () =>
    OrientationModule.orientation === LANDSCAPE ||
    OrientationModule.orientation === LANDSCAPE_LEFT ||
    OrientationModule.orientation === LANDSCAPE_RIGHT,
  isLandscapeLeft: () => {
    OrientationModule.orientation === LANDSCAPE_LEFT;
  },
  isLandscapeRight: () => {
    OrientationModule.orientation === LANDSCAPE_RIGHT;
  },
};

export default OrientationModule;
