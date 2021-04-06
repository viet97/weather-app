import React from 'react';
import {View, FlatList, Animated, ScrollView} from 'react-native';

import BaseScreen from '../BaseScreen';
import {Header, HEADER_HEIGHT} from '../Header';
import {
  getBottomSpace,
  heightDevice,
  normalize,
  widthDevice,
} from '../../../utils/DeviceUtil';
import {Colors} from '../../../themes/Colors';
import SVGIcon from '../../../../assets/SVGIcon';
import {TYPE_IMAGE_RESIZE_MODE} from '../../common/Image';
import {Images} from '../../../themes/Images';
import Text from '../../common/Text';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import {connect} from 'react-redux';
import WeatherAction from '../../../actions/WeatherAction';
import {
  getDayMonth,
  getHourString,
  getStateForKeys,
  getValueFromObjectByKeys,
} from '../../../utils/Util';
import {size} from 'lodash';
import {LineChartCustom} from '../../element';
import {
  CHART_POINT_DISTANCE,
  DEFAULT_CHART_HEIGHT,
} from '../../element/LineChartCustom';
import {INFINITY_NUMBER} from '../../../Define';

class HourlyScreen extends BaseScreen {
  constructor(props) {
    super(props);
    const {hourly} = props;
    let data = [];
    if (size(hourly) > 0) {
      data = [
        {
          title: 'Temperature',
          key: 'temp',
          unit: 'oC',
          dotColor: Colors.tempDotColor,
          lineColor: Colors.tempLineColor,
          TitleIcon: SVGIcon.temp_trans,
        },
        {
          title: 'Feel like',
          key: 'feels_like',
          unit: 'oC',
          dotColor: Colors.tempDotColor,
          lineColor: Colors.tempLineColor,
          TitleIcon: SVGIcon.temp_trans,
        },
        {
          title: 'Humidity',
          key: 'humidity',
          unit: '%',
          dotColor: Colors.rainDotColor,
          lineColor: Colors.rainLineColor,
          TitleIcon: SVGIcon.humidity_trans,
        },
        {
          title: 'Wind',
          key: 'wind_speed',
          unit: 'Km/h',
          dotColor: Colors.windDotColor,
          lineColor: Colors.windLineColor,
          TitleIcon: SVGIcon.wind_trans,
        },
        {
          title: 'Pressure',
          unit: 'mb',
          key: 'pressure',
          dotColor: Colors.pressureDotColor,
          lineColor: Colors.pressureLineColor,
          TitleIcon: SVGIcon.pressure_trans,
        },
        {
          title: 'Cloud cover',
          unit: '%',
          key: 'clouds',
          dotColor: Colors.rainDotColor,
          lineColor: Colors.rainLineColor,
          TitleIcon: SVGIcon.cloud_cover,
        },
        {
          title: 'Dew point',
          unit: '%',
          key: 'dew_point',
          dotColor: Colors.visibility_dot,
          lineColor: Colors.visibility_line,
          TitleIcon: SVGIcon.dew_point_trans,
        },
        {
          title: 'Visibility',
          unit: 'km',
          key: 'dew_point',
          dotColor: Colors.visibility_dot,
          lineColor: Colors.visibility_line,
          TitleIcon: SVGIcon.visibility_trans,
        },
        {
          title: 'UV Index',
          key: 'uvi',
          dotColor: Colors.tempDotColor,
          lineColor: Colors.tempLineColor,
          TitleIcon: SVGIcon.uvi_trans,
        },
      ];
    }
    this._debugLog('HourlytDetailConstructor', data, hourly);
    this.topLabelRef = React.createRef();
    this.itemHeaderHeight = normalize(70);
    this.itemHeaderTopMargin = 24;
    this.lineChartTopMargin = 24;
    this.state = {
      data,
      topLabelHeight: 0,
    };
    this.scrollX = new Animated.Value(0);
  }

  renderLineChart = currentLineChartProps => {
    const {hourly} = this.props;
    if (size(hourly) > 0) {
      const data = hourly.map(it => {
        if (currentLineChartProps.key === 'temp') {
          return Math.floor(it[currentLineChartProps.key]);
        }
        return it[currentLineChartProps.key];
      });
      this._debugLog('renderLineChart', data);

      return (
        <LineChartCustom
          style={{marginTop: this.lineChartTopMargin}}
          chartHeight={150}
          {...currentLineChartProps}
          data={data}
          currentIndex={this.state.currentIndex}
          onChangeCurrentIndex={currentIndex =>
            this.setStateSafe({currentIndex})
          }
        />
      );
    }
  };
  renderItemHeader = (item, index) => {
    const {TitleIcon, title, unit} = item;
    const {topLabelHeight} = this.state;
    if (!topLabelHeight) return null;
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateX: this.scrollX.interpolate({
                inputRange: [0, INFINITY_NUMBER],
                outputRange: [0, INFINITY_NUMBER],
              }),
            },
          ],
          flexDirection: 'row',
          paddingRight: 24,
          height: this.itemHeaderHeight,
          borderTopRightRadius: normalize(40),
          borderBottomRightRadius: normalize(40),
          backgroundColor: Colors.title_background,
          marginTop: this.itemHeaderTopMargin,
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '100%',
            width: normalize(10),
            backgroundColor: Colors.rainLineColor,
          }}
        />
        <TitleIcon
          style={{marginLeft: 16}}
          width={normalize(44)}
          height={normalize(44)}
        />
        <Text
          size={32}
          style={{marginLeft: 16, color: Colors.text_color1}}
          semiBold>
          {title}
        </Text>
        <Text
          size={32}
          style={{marginLeft: 4, color: Colors.text_color1}}
          light>
          {unit}
        </Text>
      </Animated.View>
    );
  };

  renderItem = ({item, index}) => {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          {this.renderItemHeader(item)}
        </View>
        {this.renderLineChart(item)}
      </View>
    );
  };

  renderTopLabelItem = ({item, index}) => {
    const isFocus = this.state.currentIndex === index;
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: CHART_POINT_DISTANCE - 8,
          marginHorizontal: 4,
          marginVertical: 8,
        }}>
        <SVGIcon.cloud_cover width={20} height={20} />
        <Text
          size={24}
          style={{
            marginTop: 4,
            color: isFocus ? Colors.text_color1 : Colors.textTitle,
          }}>
          {getHourString(item.dt)}
        </Text>
      </View>
    );
  };

  renderTopLabel = () => {
    const {hourly} = this.props;
    if (size(hourly) === 0) return null;
    return (
      <View
        onLayout={event => {
          const {topLabelHeight} = this.state;
          const height = event.nativeEvent.layout.height;
          if (topLabelHeight < height) {
            this.setStateSafe({topLabelHeight: height});
          }
        }}
        style={{flexDirection: 'row'}}>
        {hourly.map((item, index) => {
          return this.renderTopLabelItem({item, index});
        })}
      </View>
    );
  };

  renderListItemHeader = () => {
    if (size(this.props.hourly) === 0) return null;

    return (
      <View style={{position: 'absolute'}}>
        {this.state.data.map((it, index) => {
          return this.renderItemHeader(it, index);
        })}
      </View>
    );
  };

  renderContent() {
    const {data} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: Colors.backgroundHome}}>
        <Header title="Hourly • Tan Binh, Ho Chi Minh" />
        <View style={{flex: 1}}>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={event =>
              this.scrollX.setValue(event.nativeEvent.contentOffset.x)
            }
            horizontal>
            <View>
              {this.renderTopLabel()}
              <FlatList
                data={data}
                extraData={this.state}
                renderItem={this.renderItem}
                style={{backgroundColor: Colors.white}}
                contentContainerStyle={{paddingBottom: getBottomSpace()}}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    hourly: getStateForKeys(state, ['Weather', 'hourly']),
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    getAllData: () => dispatch(WeatherAction.getAllData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withImmutablePropsToJS(HourlyScreen));
