import * as React from 'react';
import { Linking, StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import AppNavigation from '../navigation/AppNavigation';
import ConfigStore from './ConfigStore';

import { Images } from '../themes/Images';
import { Colors } from '../themes/Colors';
import { EmitterManager } from '../modules/EmitterManager';
import { Loading, DialogGlobal } from '../components/element';
import { RootSiblingParent, setSiblingWrapper } from 'react-native-root-siblings';
import OrientationModule from '../modules/OrientationModule';
import RNAndroidUtils from '../modules/AndroidUtils';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import NavigationService from '../navigation/NavigationService';
import ManagerAPI from '../connection/ManagerAPI';
import LoadingManager from '../components/element/Loading/LoadingManager';
import ReloadDataManager from '../modules/ReloadDataManager';
import AppInfoManager from '../AppInfoManager';
const { store } = ConfigStore();

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    AppInfoManager.getInstance(store);
    AppInfoManager.getInstance().setStore(store);
    setSiblingWrapper(sibling => <Provider store={store}>{sibling}</Provider>);
    Images.init();
  }


  componentDidMount() {
    RNAndroidUtils.showAndroidNavigationBar();
    StatusBar.setHidden(false);
    OrientationModule.lockToPortrait();
  }

  componentWillUnmount() {
    EmitterManager.clear();
    DialogGlobal.clear();
    ManagerAPI.clear();
    AppInfoManager.clear();
    NavigationService.clear();
    LoadingManager.clear();
  }

  render() {
    return (
      <RootSiblingParent>
        <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
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
