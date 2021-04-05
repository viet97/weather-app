import React from 'react';
import {View, FlatList, ImageBackground} from 'react-native';

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
  getStateForKeys,
  getValueFromObjectByKeys,
} from '../../../utils/Util';
import {size} from 'lodash';
import {LineChartCustom} from '../../element';

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

    this.state = {
      data,
    };
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
          style={{marginTop: 24}}
          chartHeight={150}
          {...currentLineChartProps}
          data={data}
        />
      );
    }
  };
  renderItemHeader = item => {
    const {TitleIcon, title, unit} = item;
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingRight: 24,
          height: normalize(70),
          borderTopRightRadius: normalize(40),
          borderBottomRightRadius: normalize(40),
          backgroundColor: Colors.title_background,
          marginTop: 24,
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
      </View>
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

  renderContent() {
    const {data} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: Colors.backgroundHome}}>
        <Header title="Hourly • Tan Binh, Ho Chi Minh" />
        <FlatList
          data={data}
          extraData={this.state}
          renderItem={this.renderItem}
          contentContainerStyle={{paddingBottom: getBottomSpace()}}
          showsVerticalScrollIndicator={false}
        />
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
