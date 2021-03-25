import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppTab} from './TabNavigator';
import {MenuScreen} from '../../components/screen';
import {DRAWER_WIDTH} from '../../utils/DeviceUtil';

const Drawer = createDrawerNavigator();

export const AppDraw = () => {
  const containerStyle = {backgroundColor: 'black'};
  return (
    <Drawer.Navigator
      initialRouteName="MyTabs"
      drawerType={'slide'}
      drawerStyle={{width: DRAWER_WIDTH}}
      sceneContainerStyle={containerStyle}
      edgeWidth={0}
      drawerContent={props => <MenuScreen {...props} />}>
      <Drawer.Screen name="MyTabs" component={AppTab} />
    </Drawer.Navigator>
  );
};
