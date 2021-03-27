import React from 'react';
import {ScrollView, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Colors} from '../../../themes/Colors';
import {widthDevice} from '../../../utils/DeviceUtil';
import BaseElement from '../BaseElement';

export default class LineChartCustom extends BaseElement {
  constructor (props) {
    super (props);
    this.state = {};
    this.displayName = 'LineChartCustom';
  }

  renderContent () {
    const {
      data,
      renderBottomLabel,
      backgroundGradientFrom,
      backgroundGradientTo,
      chartWidth,
      chartHeight,
      dotColor,
      lineColor,
      verticalLineColor,
      style
    } = this.props;

    return (
        <ScrollView 
          bounces={false}
          showsHorizontalScrollIndicator={false}
          horizontal>
          <View>
            <LineChart
              data={{
                datasets: [
                  {
                    data: [
                      21 / 30 * 100,
                      16 / 30 * 100,
                      15 / 30 * 100,
                      30 / 30 * 100,
                      22 / 30 * 100,
                      30 / 30 * 100,
                    ],
                  },
                ],
              }}
              width={widthDevice} // from react-native
              height={150}
              chartConfig={{
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: () => `#e26a00`,
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: "white"
                },
              }}
              getDotColor={() => Colors.BLUE}
              bezier
              fromZero
              style={style}
              withHorizontalLabels={false}
              withVerticalLabels={false}
            />
          </View>
        </ScrollView>
    );
  }
}
