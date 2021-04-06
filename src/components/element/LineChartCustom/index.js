import {size, values} from 'lodash';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Colors} from '../../../themes/Colors';
import {widthDevice} from '../../../utils/DeviceUtil';
import BaseElement from '../BaseElement';

export const CHART_POINT_DISTANCE = 70;
export const DEFAULT_CHART_HEIGHT = 150;
export default class LineChartCustom extends BaseElement {
  static defaultProps = {
    chartHeight: DEFAULT_CHART_HEIGHT,
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
      onScroll,
      onChangeCurrentIndex,
      currentIndex,
    } = this.props;

    return (
      <View style={{}}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={onScroll}
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
            pointDistance={CHART_POINT_DISTANCE}
            width={size(data) * CHART_POINT_DISTANCE} // from react-native
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
            onChangeCurrentIndex={onChangeCurrentIndex}
            currentIndex={currentIndex}
            renderBottomLabel={({index, isFocus}) => {
              return renderBottomLabel && renderBottomLabel({index, isFocus});
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
