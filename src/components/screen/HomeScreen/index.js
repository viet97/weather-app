import React from 'react';
import { ScrollView, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { color } from 'react-native-reanimated';
import { Colors } from '../../../themes/Colors';
import { widthDevice } from '../../../utils/DeviceUtil';
import { Text } from '../../common';
import { LineChartCustom } from '../../element';
import BaseScreen from '../BaseScreen';

export default class HomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayName = 'HomeScreen';
  }

  renderContent() {
    return (
      <View
        style={{ flex: 1,backgroundColor:'white' }}>
          <LineChartCustom/>
      </View>
    )
  }
}
