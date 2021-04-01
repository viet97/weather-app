import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppTab} from './TabNavigator';
import {MenuScreen} from '../../components/screen';
import {DRAWER_WIDTH} from '../../utils/DeviceUtil';
import {AppStack} from './StackNavigator';
import {ROUTER_NAME} from '../NavigationConst';
import {createStackNavigator} from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackScreen = () => (
  <Stack.Navigator
    headerMode={'none'}
    mode={'card'}
    screenOptions={{
      header: null,
      cardOverlayEnabled: true,
      cardShadowEnabled: false,
      animationEnabled: true,
      gestureDirection: 'horizontal',
    }}
    initialRouteName={ROUTER_NAME.HOME.name}>
    {Object.values(ROUTER_NAME).map(screen => {
      return <Stack.Screen key={screen.name} {...screen} />;
    })}
  </Stack.Navigator>
);
export const AppDraw = () => {
  const containerStyle = {backgroundColor: 'black'};
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType={'slide'}
      drawerStyle={{width: DRAWER_WIDTH}}
      sceneContainerStyle={containerStyle}
      edgeWidth={0}
      drawerContent={props => <MenuScreen {...props} />}>
      <Drawer.Screen name="DrawScreen" component={StackScreen} />
    </Drawer.Navigator>
  );
};
