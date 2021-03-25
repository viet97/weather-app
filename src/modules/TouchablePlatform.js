import * as React from 'react';
import PropTypes from 'prop-types';
import { Animated, Keyboard, TouchableOpacity } from 'react-native';
import Ripper from 'react-native-material-ripple';

import BaseCommon from '../components/common/BaseCommon';

class TouchablePlatform extends BaseCommon {
  static defaultProps = { timeDebounce: 300, useBounce: false };
  constructor(props) {
    super(props);
    this.scaleAnimation = new Animated.Value(1);
  }
  onPress = (...args) => {
    const { dismissKeyboard } = this.props;
    dismissKeyboard && Keyboard.dismiss();
    const { onPress } = this.props;
    onPress && onPress(...args);
  };
  onPressIn = () => {
    this.props.onPressIn && this.props.onPressIn();
    if (!this.props.useBounce) {
      return;
    }
    Animated.spring(this.scaleAnimation, {
      toValue: 0.95,
      tension: 150,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  onPressOut = () => {
    this.props.onPressOut && this.props.onPressOut();
    if (!this.props.useBounce) {
      return;
    }
    Animated.spring(this.scaleAnimation, {
      toValue: 1,
      tension: 150,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  renderContent() {
    const {
      useBounce,
      onPress,
      useRipple,
      style,
      disabled,
      useOverlay,
      ...allProps
    } = this.props;
    const buttonStyle = [
      {
        opacity: useOverlay && disabled ? 0.5 : 1,
      },
      style,
    ];
    if (!useRipple) {
      return (
        <TouchableOpacity
          {...allProps}
          disabled={disabled}
          style={buttonStyle}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          onPress={this.onPress}
        />
      );
    }

    if (!useBounce) {
      return (
        <Ripper
          {...allProps}
          disabled={disabled}
          style={buttonStyle}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          onPress={this.onPress}
        />
      );
    }
    return (
      <Animated.View style={[{ transform: [{ scale: this.scaleAnimation }] }]}>
        <Ripper
          {...allProps}
          disabled={disabled}
          style={buttonStyle}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          onPress={this.onPress}
        />
      </Animated.View>
    );
  }
}
TouchablePlatform.propTypes = {
  dismissKeyboard: PropTypes.bool,
  useRipple: PropTypes.bool,
};

TouchablePlatform.defaultProps = {
  dismissKeyboard: true,
  useRipple: true,
};

export { TouchablePlatform };
