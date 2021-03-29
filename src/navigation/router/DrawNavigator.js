import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppTab} from './TabNavigator';
import {MenuScreen} from '../../components/screen';
import {DRAWER_WIDTH} from '../../utils/DeviceUtil';
import {AppStack} from './StackNavigator';
import {ROUTER_NAME} from '../NavigationConst';

const Drawer = createDrawerNavigator();

export const AppDraw = () => {
  const containerStyle = {backgroundColor: 'black'};
  return (
    <Drawer.Navigator
      drawerPosition="right"
      initialRouteName="MyTabs"
      drawerType={'slide'}
      drawerStyle={{width: DRAWER_WIDTH}}
      sceneContainerStyle={containerStyle}
      edgeWidth={0}
      drawerContent={props => <MenuScreen {...props} />}>
      <Drawer.Screen name="MyTabs" component={AppTab} />
      <Drawer.Screen name="Stack" component={AppStack} />
      {/* {Object.values(ROUTER_NAME).map(screen => {
        if (screen.isNoStack) return;
        return <Drawer.Screen key={screen.name} {...screen} />;
      })} */}
    </Drawer.Navigator>
  );
};
