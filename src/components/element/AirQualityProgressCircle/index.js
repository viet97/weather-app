import React from 'react';
import {View} from 'react-native';

import ProgressCircle from 'react-native-progress-circle';
import {Colors} from '../../../themes/Colors';
import {normalize} from '../../../utils/DeviceUtil';
import {Text} from '../../common';
import BaseElement from '../BaseElement';

export default class AirQualityProgressCircle extends BaseElement {
  renderContent() {
    const {
      value,
      percentage,
      outerCircleStyle,
      innerCircleStyle,
      radius,
      color,
    } = this.props;

    return (
      <ProgressCircle
        outerCircleStyle={outerCircleStyle}
        percent={percentage}
        radius={radius}
        borderWidth={normalize(8)}
        color={color}
        shadowColor={Colors.border_color}
        bgColor={Colors.white}>
        <View style={innerCircleStyle}>
          <Text style={{color: Colors.text_color1}} size={54} thin>
            {value}
          </Text>
        </View>
      </ProgressCircle>
    );
  }
}
