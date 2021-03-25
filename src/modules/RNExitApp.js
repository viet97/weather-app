import {NativeModules, Platform} from 'react-native';

const RNExitApp = {
  exitApp: function() {
    if (Platform.OS === 'android') {
      NativeModules.RNExitApp.exitApp();
    }
  },
};

export default RNExitApp;
