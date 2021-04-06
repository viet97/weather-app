import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import BaseScreen from '../BaseScreen';
import {Header} from '../Header';
import {getBottomSpace, normalize} from '../../../utils/DeviceUtil';
import {Colors} from '../../../themes/Colors';
import SVGIcon from '../../../../assets/SVGIcon';
import {TYPE_IMAGE_RESIZE_MODE} from '../../common/Image';
import {Images} from '../../../themes/Images';
import Text from '../../common/Text';
import NavigationService from '../../../navigation/NavigationService';
import {AirQualityProgressCircle} from '../../element';
import {
  AIR_LIST,
  AIR_POLLUTION_LEVEL,
  MAX_AIR_QUALITY_INDEX,
} from '../../../Define';
import {connect} from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import {
  getAirPollutionLevel,
  getStateForKeys,
  getValueFromObjectByKeys,
} from '../../../utils/Util';
class AirQualityDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderAirSeekBar = NavigationService.getInstance().getDataParams(
      props,
      ['renderAirSeekBar'],
    );
    this.renderAirQualityStatus = NavigationService.getInstance().getDataParams(
      props,
      ['renderAirQualityStatus'],
    );
    this.listQualityIndex = [
      {
        ...AIR_LIST.PM2_5,
      },
      {
        ...AIR_LIST.PM10,
      },
      {
        ...AIR_LIST.NO2,
      },
      {
        ...AIR_LIST.SO2,
      },
      {
        ...AIR_LIST.CO,
      },
      {
        ...AIR_LIST.O3,
      },
    ];
  }

  renderStatus = () => {
    return (
      <View style={{backgroundColor: Colors.white}}>
        <View style={styles.statusContainer}>
          {this.renderAirQualityStatus()}
          <View style={{marginTop: 16}}>{this.renderAirSeekBar()}</View>
        </View>
      </View>
    );
  };

  renderCircle = ({item, index}) => {
    const {name, fullName, key} = item;
    const {aqi_data} = this.props;
    const iaqi = getValueFromObjectByKeys(aqi_data, ['iaqi']);

    if (!iaqi) return null;

    const value = getValueFromObjectByKeys(iaqi, [key, 'v']);
    const aqiLevel = getAirPollutionLevel(value);
    const color = getValueFromObjectByKeys(aqiLevel, ['color']);
    const percentage = value ? (value * 100) / MAX_AIR_QUALITY_INDEX : 0;
    return (
      <ImageBackground
        source={Images.assets.background_circle.source}
        imageStyle={{resizeMode: TYPE_IMAGE_RESIZE_MODE.CONTAIN}}
        style={{
          flex: 1,
          marginBottom: index < this.listQualityIndex.length / 2 ? 16 : 0,
          alignItems: 'center',
          height: normalize(360),
          justifyContent: 'center',
          ratio: Images.assets.background_circle.ratio,
        }}>
        <AirQualityProgressCircle
          percentage={percentage}
          radius={normalize(80)}
          color={color || Colors.white}
          innerCircleStyle={styles.innerCircleStyle}
          value={value && value.toFixed(2)}
        />
        <Text
          size={36}
          medium
          style={{color: Colors.air_quality_text, marginTop: 8}}>
          {name}
        </Text>
        <Text
          size={26}
          medium
          style={{
            color: Colors.textTitle,
            marginTop: 4,
            textAlign: 'center',
            width: normalize(354) * Images.assets.background_circle.ratio,
          }}>
          {fullName}
        </Text>
      </ImageBackground>
    );
  };

  renderListCircleAirQuality = () => {
    return (
      <FlatList
        data={this.listQualityIndex}
        showsVerticalScrollIndicator={false}
        style={styles.listCircle}
        numColumns={3}
        renderItem={this.renderCircle}
        bounces={false}
      />
    );
  };

  renderValueReferenceRow = (status, value, color, containerStyle) => {
    return (
      <View style={[styles.staticRowContainer, containerStyle]}>
        <View
          style={{
            flex: 2,
            height: normalize(10),
            backgroundColor: color,
            borderRadius: normalize(10),
          }}
        />
        <Text
          medium
          size={30}
          style={{flex: 2, marginLeft: 16, color: Colors.air_quality_text}}>
          {status}
        </Text>
        <Text
          size={30}
          style={{flex: 1, marginLeft: 16, color: Colors.textTitle}}>
          {value}
        </Text>
      </View>
    );
  };

  renderValueReference = () => {
    const {aqi_data} = this.props;
    const cityName = getValueFromObjectByKeys(aqi_data, ['city', 'name']);
    if (!cityName) return null;
    return (
      <View style={styles.valueReferenceContainer}>
        {Object.values(AIR_POLLUTION_LEVEL).map((it, index) => {
          return this.renderValueReferenceRow(
            it.name,
            it.rangeText,
            it.color,
            index > 0
              ? {
                  marginTop: 8,
                }
              : {},
          );
        })}
        <View
          style={{
            padding: 8,
            paddingHorizontal: 16,
            alignItems: 'center',
            backgroundColor: Colors.blue_15,
            marginTop: 16,
            borderRadius: normalize(60),
            flexDirection: 'row',
          }}>
          <SVGIcon.waqi width={normalize(20)} height={normalize(20)} />
          <Text
            style={{color: Colors.viewDetail, marginLeft: 16}}
            size={32}
            medium>
            WAQI: {cityName}
          </Text>
        </View>
      </View>
    );
  };

  renderContent() {
    return (
      <View style={{flex: 1, backgroundColor: Colors.backgroundGray}}>
        <Header title="Air Quality Index" />
        <ScrollView contentContainerStyle={{paddingBottom: getBottomSpace()}}>
          {this.renderStatus()}
          {this.renderListCircleAirQuality()}
          {this.renderValueReference()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    aqi_data: getStateForKeys(state, ['Weather', 'aqi_data']),
  };
};

export default connect(
  mapStateToProps,
  null,
)(withImmutablePropsToJS(AirQualityDetailScreen));

const styles = StyleSheet.create({
  valueReferenceContainer: {
    padding: 16,
    backgroundColor: Colors.backgroundGray,
    flex: 1,
  },
  staticRowContainer: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  listCircle: {paddingVertical: 24, backgroundColor: Colors.white},
  innerCircleStyle: {
    width: normalize(130),
    height: normalize(130),
    borderRadius: normalize(130) / 2,
    borderWidth: 1,
    borderColor: Colors.border_color,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomLeftRadius: normalize(40),
    borderBottomRightRadius: normalize(40),
    backgroundColor: Colors.weather_red_opacity,
  },
});
