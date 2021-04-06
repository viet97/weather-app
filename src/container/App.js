import * as React from 'react';
import {
  Linking,
  StatusBar,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import {Provider} from 'react-redux';
import ReactNativeAN from 'react-native-alarm-notification';
import AppNavigation from '../navigation/AppNavigation';
import ConfigStore from './ConfigStore';
import {Images} from '../themes/Images';
import {Colors} from '../themes/Colors';
import {EmitterManager} from '../modules/EmitterManager';
import {Loading, DialogGlobal} from '../components/element';
import {RootSiblingParent, setSiblingWrapper} from 'react-native-root-siblings';
import OrientationModule from '../modules/OrientationModule';
import RNAndroidUtils from '../modules/AndroidUtils';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import NavigationService from '../navigation/NavigationService';
import ManagerAPI from '../connection/ManagerAPI';
import LoadingManager from '../components/element/Loading/LoadingManager';
import ReloadDataManager from '../modules/ReloadDataManager';
import AppInfoManager from '../AppInfoManager';
import {myLog} from '../Debug';

const {RNAlarmNotification} = NativeModules;
const RNEmitter = new NativeEventEmitter(RNAlarmNotification);
const {store} = ConfigStore();

// const alarmNotifData = {
//   title: "My Notification Title",
//   message: "My Notification Message",
//   channel: "my_channel_id",
//   small_icon: "ic_launcher",

//   // You can add any additional data that is important for the notification
//   // It will be added to the PendingIntent along with the rest of the bundle.
//   // e.g.
//   data: { foo: "bar" },
// };
export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    AppInfoManager.getInstance(store);
    AppInfoManager.getInstance().setStore(store);
    setSiblingWrapper(sibling => <Provider store={store}>{sibling}</Provider>);
    Images.init();
  }

  async componentDidMount() {
    RNAndroidUtils.showAndroidNavigationBar();
    StatusBar.setHidden(false);
    OrientationModule.lockToPortrait();
    this._subscribeDismiss = RNEmitter.addListener(
      'OnNotificationDismissed',
      data => {
        const obj = JSON.parse(data);
        console.log(`notification id: ${obj.id} dismissed`);
      },
    );

    this._subscribeOpen = RNEmitter.addListener(
      'OnNotificationOpened',
      data => {
        console.log(data);
        const obj = JSON.parse(data);
        console.log(`app opened by notification: ${obj.id}`);
      },
    );
  }

  componentWillUnmount() {
    EmitterManager.clear();
    DialogGlobal.clear();
    ManagerAPI.clear();
    AppInfoManager.clear();
    NavigationService.clear();
    LoadingManager.clear();
    this._subscribeDismiss.remove();
    this._subscribeOpen.remove();
  }

  render() {
    return (
      <RootSiblingParent>
        <SafeAreaView edges={['right', 'left']} style={{flex: 1}}>
          <SafeAreaProvider>
            <Provider store={store}>
              <StatusBar
                barStyle={'light-content'}
                translucent={true}
                backgroundColor={Colors.STATUS_BAR_COLOR}
              />
              <AppNavigation />
              <Loading />
            </Provider>
          </SafeAreaProvider>
        </SafeAreaView>
      </RootSiblingParent>
    );
  }
}
