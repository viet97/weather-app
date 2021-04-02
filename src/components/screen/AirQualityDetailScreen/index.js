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
        status: 'Good',
        color: 'green',
        value: 50,
        title: 'PM2.5',
      },
      {
        status: 'Normal',
        color: 'yellow',
        value: 100,
        title: 'PM2.5',
      },
      {
        status: 'Unsafe',
        color: 'red',
        value: 500,
        title: 'PM2.5',
      },
      {
        status: 'Good',
        color: 'green',
        value: 50,
        title: 'PM2.5',
      },
      {
        status: 'Normal',
        color: 'yellow',
        value: 100,
        title: 'PM2.5',
      },
      {
        status: 'Unsafe',
        color: 'red',
        value: 500,
        title: 'PM2.5',
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
    const {value, status, title, color} = item;
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
          percentage={30}
          radius={normalize(80)}
          color={color}
          innerCircleStyle={styles.innerCircleStyle}
          value={value}
        />
        <Text
          size={36}
          medium
          style={{color: Colors.air_quality_text, marginTop: 8}}>
          {title}
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
          Sulfur Dioxide
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
        numColumns={this.listQualityIndex.length / 2}
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
    return (
      <View style={styles.valueReferenceContainer}>
        {this.renderValueReferenceRow('good', 100, 'green')}
        {this.renderValueReferenceRow('good', 100, 'green', {marginTop: 8})}
        {this.renderValueReferenceRow('good', 100, 'green', {marginTop: 8})}
        {this.renderValueReferenceRow('good', 100, 'green', {marginTop: 8})}
        {this.renderValueReferenceRow('good', 100, 'green', {marginTop: 8})}
        {this.renderValueReferenceRow('good', 100, 'green', {marginTop: 8})}
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
            WAQI: Hà Nội/36A Phạm Văn Đồng, Vietnam
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

export default AirQualityDetailScreen;

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
