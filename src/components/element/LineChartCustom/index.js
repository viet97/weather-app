import {size, values} from 'lodash';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Colors} from '../../../themes/Colors';
import {widthDevice} from '../../../utils/DeviceUtil';
import BaseElement from '../BaseElement';

export default class LineChartCustom extends BaseElement {
  static defaultProps = {
    chartHeight: 150,
    chartWidth: widthDevice,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.displayName = 'LineChartCustom';
  }

  getDataAssets = () => {
    const {data} = this.props;
    if (size(data) === 0) return data;
    const maxValue = Math.max(...data);
    this._debugLog('getDataAssets', data);
    return data.map(it => (it * 100) / maxValue);
  };

  renderContent() {
    const {
      data,
      renderBottomLabel,
      chartWidth,
      chartHeight,
      dotColor,
      lineColor,
      style,
    } = this.props;

    return (
      <View style={{}}>
        <ScrollView
          bounces={false}
          showsHorizontalScrollIndicator={false}
          horizontal>
          <LineChart
            data={{
              datasets: [
                {
                  data: this.getDataAssets(),
                },
              ],
              dataValue: data,
            }}
            width={chartWidth} // from react-native
            height={chartHeight}
            chartConfig={{
              decimalPlaces: 2, // optional, defaults to 2dp
              color: () => lineColor,
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: 'white',
              },
            }}
            getDotColor={() => dotColor || Colors.BLUE}
            bezier
            fromZero
            style={style}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            renderBottomLabel={({values, percentage}) => {
              renderBottomLabel && renderBottomLabel({values, percentage});
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
