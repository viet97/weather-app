import React from 'react';
import {Text, StyleSheet} from 'react-native';
import BaseCommon from '../BaseCommon';
import {normalize, IS_ANDROID} from '../../../utils/DeviceUtil';
import {KEY_FONT} from '../../../themes/Fonts';
import {Colors} from '../../../themes/Colors';

class CustomText extends BaseCommon {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayName = 'CustomText';
    this.fontFamily = this.getFontFamily();
  }

  getFontFamily = () => {
    const {light, semiBold, bold, thin, medium} = this.props;

    let fontFamily = KEY_FONT.regular;

    if (light) {
      fontFamily = KEY_FONT.light;
    }
    if (semiBold) {
      fontFamily = KEY_FONT.semiBold;
    }
    if (bold) {
      fontFamily = KEY_FONT.bold;
    }
    if (thin) {
      fontFamily = KEY_FONT.thin;
    }
    if (medium) {
      fontFamily = KEY_FONT.medium;
    }
    return fontFamily;
  };

  renderContent() {
    const {
      size,
      style,
      color,
      children,
      numberOfLines,
      ...otherProps
    } = this.props;
    const colorStyle = {};
    if (color) {
      colorStyle.color = color;
    }

    return (
      <Text
        numberOfLines={numberOfLines}
        style={[
          styles.defaultText,
          style,
          {fontSize: normalize(size), fontFamily: this.fontFamily},
          colorStyle,
        ]}
        {...otherProps}>
        {children}
      </Text>
    );
  }
}

CustomText.defaultProps = {
  size: 28,
};

const styles = StyleSheet.create({
  defaultText: {
    color: Colors.white,
  },
});

export default CustomText;
