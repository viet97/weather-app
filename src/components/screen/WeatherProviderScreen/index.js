import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import BaseScreen from '../BaseScreen';
import IconChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_choice.svg';
import IconNoChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_nochoice.svg';
import IconUpSvg from '../../../../assets/SVGIcon/view-setting/icon_up.svg';
import IconCSvg from '../../../../assets/SVGIcon/weather-provider/icon_c.svg';
import IconFSvg from '../../../../assets/SVGIcon/weather-provider/icon_f.svg';
import IconSecureSvg from '../../../../assets/SVGIcon/weather-provider/icon_secure.svg';
import BgSecureSvg from '../../../../assets/SVGIcon/weather-provider/secure_bg.svg';
import IconWeatherSvg from '../../../../assets/SVGIcon/weather-provider/icon_weather.svg';
import {
  normalize,
  STATUS_BAR_HEIGHT,
  widthDevice,
} from '../../../utils/DeviceUtil';
import CustomText from '../../common/Text';
import {Header} from '../Header';
import {temperatureC} from '../../../utils/Util';
import {KEY_FONT} from '../../../themes/Fonts';

const paddingHorizontalItem = 15;
const distanceVerticalTxtLeft = normalize(14);
const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: paddingHorizontalItem,
  },
  wrapTouchItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(218, 220, 227, 0.6)',
    paddingVertical: normalize(40),
  },
  touchItem: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelItem: {
    marginLeft: paddingHorizontalItem,
    marginBottom: distanceVerticalTxtLeft,
    includeFontPadding: false,
    fontFamily: KEY_FONT.bold,
  },
  txtDataSource: {
    marginLeft: paddingHorizontalItem,
    marginRight: 10,
  },
  txtSub: {
    marginLeft: paddingHorizontalItem,
    marginBottom: distanceVerticalTxtLeft,
  },
});

class WeatherProviderScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      value: 'eng',
    };
    this.listProvider = [
      {
        label: 'TheWeatherChannel',
        sub: 'Scattered clouds',
        value: 'eng',
        temperatureValue: 37,
        temperatureSuffix: 'c',
      },
      {
        label: 'World Weather Online',
        value: 'vie',
        sub: 'Few clouds',
        isSecure: true,
        temperatureValue: 37,
        temperatureSuffix: 'f',
      },
    ];
  }
  onPressItem = item => {
    this.setState({
      value: item.value,
    });
  };
  renderItem = params => {
    const {item, index} = params;
    const {value} = this.state;
    return (
      <View key={index} style={styles.containerItem}>
        <View style={styles.wrapTouchItem}>
          <TouchableOpacity
            onPress={() => {
              this.onPressItem(item);
            }}
            style={styles.touchItem}>
            <View style={{flexDirection: 'row'}}>
              {value === item.value ? (
                <IconChoiceSvg width={normalize(44)} height={normalize(44)} />
              ) : item.isSecure ? (
                <IconSecureSvg width={normalize(44)} height={normalize(44)} />
              ) : (
                <IconNoChoiceSvg width={normalize(44)} height={normalize(44)} />
              )}
              <View style={{}}>
                <CustomText
                  medium
                  size={34}
                  style={styles.labelItem}
                  color="#404040">
                  {item.label}
                </CustomText>
                {item.sub ? (
                  <CustomText size={28} style={styles.txtSub} color="#808080">
                    {item.sub}
                  </CustomText>
                ) : null}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <CustomText
                    size={28}
                    style={styles.txtDataSource}
                    color="#094FB9">
                    Data Source
                  </CustomText>
                  <IconUpSvg width={normalize(14)} height={normalize(14)} />
                </View>
                {item.isSecure ? (
                  <View
                    style={{
                      marginLeft: paddingHorizontalItem,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <BgSecureSvg
                      width={normalize(129)}
                      height={normalize(39)}
                    />
                    <CustomText
                      style={{marginLeft: normalize(10)}}
                      size={28}
                      color="#F79814">
                      Upgrate to unlock
                    </CustomText>
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <CustomText
                size={56}
                style={{includeFontPadding: false, marginTop: -normalize(7)}}
                thin
                color="#404040">
                {item.temperatureValue}
              </CustomText>
              <CustomText
                style={{
                  includeFontPadding: false,
                  marginRight: normalize(9.75),
                }}
                size={27}
                light
                color="#404040">
                {temperatureC}
              </CustomText>
              {/* <View
                style={{
                  marginBottom: 6,
                  justifyContent: 'flex-start',
                }}>
                {item.temperatureSuffix === 'c' ? (
                  <IconCSvg width={15} height={(15 * 33) / 28} />
                ) : item.temperatureSuffix === 'f' ? (
                  <IconFSvg width={15} height={(15 * 33) / 28} />
                ) : null}
              </View> */}
              <IconWeatherSvg width={normalize(52.01)} height={normalize(52)} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderContent() {
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          flex: 1,
          width: widthDevice,
        }}>
        <Header title="Weather Provider" />
        <FlatList
          keyExtractor={(item, index) => item.value + index}
          data={this.listProvider}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default WeatherProviderScreen;
