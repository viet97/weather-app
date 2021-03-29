import React from 'react';
import { Text, StyleSheet } from 'react-native';
import BaseCommon from '../BaseCommon';
import { normalize, IS_ANDROID } from '../../../utils/DeviceUtil';
import { KEY_FONT } from '../../../themes/Fonts';
import { Colors } from '../../../themes/Colors';

class CustomText extends BaseCommon {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayName = 'CustomText';
    this.fontFamily = this.getFontFamily()
  }
  getFontFamily = () => {
    const {
      semiBold,
      light,
      bold,
      medium
    } = this.props;
    if (light) {
      return KEY_FONT.light;
    }
    if (medium) {
      return KEY_FONT.medium;
    }
    if (semiBold) {
      return KEY_FONT.semiBold;
    }
    if (bold) {
      return KEY_FONT.bold;
    }
    return KEY_FONT.regular;
  }

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
          {
            fontSize: normalize(size),
            fontFamily: this.fontFamily
          },
          colorStyle,
        ]}
        {...otherProps}>
        {children}
      </Text>
    );
  }
}

CustomText.defaultProps = {
  size: 16,
};

const styles = StyleSheet.create({
  defaultText: {
    color: Colors.textDefault,
  },
});

export default CustomText;
