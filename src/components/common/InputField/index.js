import { isEqual, isNaN, trim } from 'lodash';
import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import { KEYBOARD_TYPE } from '../../../Define';
import { Colors } from '../../../themes/Colors';
import { getValueFromObjectByKeys } from '../../../utils/Util';

import BaseCommon from '../BaseCommon';

export default class InputField extends BaseCommon {
  static defaultProps = {
    useUnderLine: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      str: props.value,
      isFocus: false,
    };
    this.initialValue = props.value;
    this.displayName = 'InputField';
  }

  onChangeText = (str) => {
    const { onChange, keyboardType } = this.props;
    let finalStr = str;
    if (
      keyboardType === KEYBOARD_TYPE.NUMERIC ||
      keyboardType === KEYBOARD_TYPE.NUMBER_PAD ||
      keyboardType === KEYBOARD_TYPE.PHONE_PAD ||
      keyboardType === KEYBOARD_TYPE.DECIMAL
    ) {
      if (isNaN(Number(str))) {
        finalStr = '0';
      }
    }
    this._debugLog('onChangeText', finalStr);
    onChange && onChange(finalStr);
    this.setStateSafe({ finalStr });
  };

  onFocus = () => {
    this.setStateSafe({ isFocus: true });
    this.props.onFocus && this.props.onFocus();
    if (this.props.clearOnFocus) {
      this.onChangeText('');
    }
  };

  onBlur = () => {
    this.setStateSafe({ isFocus: false });
    const { str } = this.state;
    if (!str && this.initialValue) {
      this.onChangeText(this.initialValue);
    }
  };

  renderUnderLine = () => {
    const { isFocus } = this.state;
    if (!this.props.useUnderLine) {
      return null;
    }
    return (
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: isFocus
            ? Colors.activeUnderlineInput
            : Colors.inActiveUnderlineInput,
        }}
      />
    );
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const newValue = trim(getValueFromObjectByKeys(nextProps, ['value']));
    const oldValue = trim(getValueFromObjectByKeys(this.state, ['str']));
    this._debugLog('InputField ReceveiProps', oldValue, newValue, this.initialValue);
    if (!isEqual(newValue, oldValue)) {
      this.setStateSafe({ str: newValue });
    }
  }

  renderContent() {
    const {
      containerStyle,
      style,
      text,
      value,
      bold,
      ...otherProps
    } = this.props;
    const { str } = this.state;
    const fontFamily = bold ? 'Manrope-ExtraBold' : 'Manrope-Medium';
    return (
      <View style={containerStyle}>
        <TextInput
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          style={[styles.staticStyle, style, { fontFamily }]}
          onChangeText={this.onChangeText}
          underlineColorAndroid="transparent"
          {...otherProps}
          value={str}
          placeholderTextColor={Colors.placeholder_input}
        />
        {this.renderUnderLine()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  staticStyle: {
    paddingVertical: 8,
  },
});
