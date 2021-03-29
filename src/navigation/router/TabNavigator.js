import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';

import {ROUTER_NAME} from '../NavigationConst';
import {withImmutablePropsToJS} from '../NavigationHOC';
import {Colors} from '../../themes/Colors';
import {Image, Text} from '../../components/common';
import {Images} from '../../themes/Images';
import {TYPE_FONT_SIZE} from '../../themes/Fonts';
import {TouchablePlatform} from '../../modules/TouchablePlatform';

import {
  TABBAR_HEIGHT,
  IS_ANDROID,
  isNewIpModel,
  HOME_INDICATOR_HEIGHT,
  iconTabSize,
  isHomeIndicatorIPad,
} from '../../utils/DeviceUtil';
import BaseElement from '../../components/element/BaseElement';

export const tabIconMarginTop = 6;
const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  contentStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    marginTop: tabIconMarginTop,
    width: iconTabSize,
    height: iconTabSize,
  },
});

const CustomTabBar = ({state, descriptors, navigation, isVisible}) => {
  let customTabBar = {
    flexDirection: 'row',
    backgroundColor: Colors.TAB_BACKGROUND_COLOR,
    height: TABBAR_HEIGHT,
  };
  if (!isVisible) {
    return null;
  }

  return (
    <View style={customTabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            switch (index) {
              case 0:
                break;
              case 1:
                break;
              case 2:
                break;
              default:
                break;
            }
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const textStyle = {
          color: isFocused ? Colors.ACTIVE_TAB_COLOR : Colors.gray,
        };

        const content = (
          <TouchablePlatform
            key={index}
            rippleColor={Colors.white}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPressIn={onPress}
            onLongPress={onLongPress}
            style={styles.contentStyle}>
            <Image
              source={isFocused ? options.iconFocus : options.icon}
              style={styles.iconStyle}
              resizeMode={Image.ResizeMode.CONTAIN}
            />

            <View style={styles.contentStyle}>
              <Text size={TYPE_FONT_SIZE.TITLE_TAB} style={textStyle}>
                {label}
              </Text>
            </View>
          </TouchablePlatform>
        );

        return content;
      })}
    </View>
  );
};

export class MainTab extends BaseElement {
  constructor(props) {
    super(props);
    this.state = {isVisible: false};
  }

  _componentDidMount() {}

  _componentWillUnmount() {}

  renderContent() {
    return (
      <Tab.Navigator
        tabBar={props => (
          <CustomTabBar isVisible={this.state.isVisible} {...props} />
        )}
        initialRouteName={ROUTER_NAME.HOME.name}>
        <Tab.Screen
          {...ROUTER_NAME.SPLASH}
          options={{
            tabBarLabel: ROUTER_NAME.SPLASH.name,
            icon: Images.assets.default.source,
            iconFocus: Images.assets.default.source,
          }}
        />
        <Tab.Screen
          {...ROUTER_NAME.HOME}
          options={{
            tabBarLabel: ROUTER_NAME.HOME.name,
            icon: Images.assets.default.source,
            iconFocus: Images.assets.default.source,
          }}
        />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export const AppTab = connect(mapStateToProps)(withImmutablePropsToJS(MainTab));
