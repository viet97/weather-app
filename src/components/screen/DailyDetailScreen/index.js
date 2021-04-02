import React from 'react';
import {View, FlatList, ImageBackground} from 'react-native';

import BaseScreen from '../BaseScreen';
import {Header, HEADER_HEIGHT} from '../Header';
import {heightDevice, normalize, widthDevice} from '../../../utils/DeviceUtil';
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
import {WeatherIcon} from '../../element';

const ITEM_MARGIN = 16;
class DailyDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    const {daily} = props;
    let data = [];
    if (size(daily) > 0) {
      data = daily.map(it => {
        const weatherArray = getValueFromObjectByKeys(it, ['weather']);

        return {
          date: getDayMonth(it.dt * 1000),
          weatherStatus:
            size(weatherArray) > 0
              ? getValueFromObjectByKeys(weatherArray[0], ['main'])
              : '',
          IconWeather: () => (
            <WeatherIcon
              icon={
                size(weatherArray) > 0
                  ? getValueFromObjectByKeys(weatherArray[0], ['icon'])
                  : ''
              }
              style={{
                width: normalize(85),
                height: normalize(85),
              }}
            />
          ),
          gridInfo: [
            {
              Icon: SVGIcon.temp,
              value: getValueFromObjectByKeys(it, ['feels_like', 'day']),
              unit: 'oC',
              description: 'Feel Like',
            },
            {
              Icon: SVGIcon.humidity,
              value: it.humidity,
              unit: '%',
              description: 'Humidity',
            },
            {
              Icon: SVGIcon.rain_snow,
              value: it.rain,
              unit: 'mm',
              description: 'Rain/Snow',
            },
            {
              Icon: SVGIcon.wind,
              value: it.wind_speed,
              unit: 'km/h',
              description: 'Wind',
            },
            {
              Icon: SVGIcon.uv_index,
              value: it.uvi,
              unit: '',
              description: 'UV Index',
            },
            {
              Icon: SVGIcon.dew_point,
              value: it.dew_point,
              unit: '%',
              description: 'Dew Point',
            },
          ],
        };
      });
    }
    this._debugLog('DailtDetailConstructor', daily, data);

    this.state = {
      data,
    };
  }

  renderGridInfoItem = ({item, index}) => {
    const {description, value, unit, Icon} = item;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 12,
          marginLeft: index % 2 === 0 ? 16 : 0,
          marginRight: index % 2 !== 0 ? 16 : 0,
          borderBottomColor: Colors.border_color_3,
          borderBottomWidth: 1,
        }}>
        <Icon width={normalize(90)} height={normalize(90)} />
        <View style={{marginLeft: 6, flex: 1}}>
          <Text style={{color: Colors.text_color1}} size={44}>
            {value}{' '}
            <Text style={{color: Colors.text_color1}} size={34}>
              {unit}
            </Text>
          </Text>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Text style={{color: Colors.textTitle}}>{description}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderItemGridInfo = (gridInfo = []) => {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          marginTop: 12,
          borderTopRightRadius: normalize(40),
          borderTopLeftRadius: normalize(40),
          overflow: 'hidden',
        }}>
        <FlatList
          bounces={false}
          data={gridInfo}
          numColumns={gridInfo.length / 3}
          renderItem={this.renderGridInfoItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  renderItem = ({item, index}) => {
    const {date, weatherStatus, gridInfo, IconWeather} = item;
    this._debugLog('renderGridInfoItem', item);

    return (
      <View
        style={{
          width: widthDevice,
          height: (heightDevice - HEADER_HEIGHT - ITEM_MARGIN) / 2,
          backgroundColor: Colors.white,
          marginBottom: ITEM_MARGIN,
        }}>
        <ImageBackground
          imageStyle={{
            resizeMode: TYPE_IMAGE_RESIZE_MODE.COVER,
          }}
          source={Images.assets.home_background.source}
          style={{flex: 1}}>
          <Text
            style={{
              marginLeft: 16,
              marginTop: 16,
            }}
            medium
            size={48}>
            {date}
          </Text>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 16,
              }}>
              {IconWeather()}
              <Text
                size={40}
                medium
                style={{color: Colors.white, marginLeft: 8}}>
                {weatherStatus}
              </Text>
            </View>
            {this.renderItemGridInfo(gridInfo)}
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderContent() {
    const {data} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: Colors.backgroundHome}}>
        <Header title="Daily • Tan Binh, Ho Chi Minh" />
        <FlatList
          data={data}
          extraData={this.state}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    daily: getStateForKeys(state, ['Weather', 'daily']),
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
)(withImmutablePropsToJS(DailyDetailScreen));
