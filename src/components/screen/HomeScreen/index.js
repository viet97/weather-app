import React from 'react';
import {ScrollView, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {color} from 'react-native-reanimated';
import {Colors} from '../../../themes/Colors';
import {widthDevice} from '../../../utils/DeviceUtil';
import {Text} from '../../common';
import {BarChart, LineChartCustom} from '../../element';
import BaseScreen from '../BaseScreen';

export default class HomeScreen extends BaseScreen {
  constructor (props) {
    super (props);
    this.state = {};
    this.displayName = 'HomeScreen';
    this.data = [21 / 30, 16 / 30, 15 / 30, 24 / 30, 22 / 30, 30 / 30, 30 / 30];
    this.aspectRatio = 0.375;
  }

  renderContent () {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <LineChartCustom />
        <BarChart/>
      </View>
    );
  }
}
