/**
 * @format
 */
import { AppRegistry, UIManager, } from 'react-native';
import App from './src/container/App';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
import { IS_ANDROID } from './src/utils/DeviceUtil';

enableScreens();

if (IS_ANDROID) {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}


AppRegistry.registerComponent(appName, () => App);
