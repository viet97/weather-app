import React from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BaseScreen from '../BaseScreen';
import IconChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_choice.svg';
import IconNoChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_nochoice.svg';
import IconUpSvg from '../../../../assets/SVGIcon/view-setting/icon_up.svg';
import IconSecureSvg from '../../../../assets/SVGIcon/weather-provider/icon_secure.svg';
import BgSecureSvg from '../../../../assets/SVGIcon/weather-provider/secure_bg.svg';
import IconWeatherSvg from '../../../../assets/SVGIcon/weather-provider/icon_weather.svg';
import IconRemoveSvg from '../../../../assets/SVGIcon/view-location/icon-remove.svg';
import IconLocationSvg from '../../../../assets/SVGIcon/view-location/icon_location.svg';
import IconSearchSvg from '../../../../assets/SVGIcon/view-location/icon_search.svg';
import {
  normalize,
  STATUS_BAR_HEIGHT,
  widthDevice,
} from '../../../utils/DeviceUtil';
import CustomText from '../../common/Text';
import {Header} from '../Header';
import {CityList} from '../../../utils/CityList';
import {temperatureC} from '../../../utils/Util';
import {KEY_FONT} from '../../../themes/Fonts';
import {Colors} from '../../../themes/Colors';
import {myLog} from '../../../Debug';
import {MyServer} from '../../../data-source/server';

const sizeIconLeft = {
  width: normalize(44),
  height: normalize(44),
};
const paddingHorizontalItem = normalize(30);
const distanceVerticalTxtLeft = normalize(14);
const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: paddingHorizontalItem,
    justifyContent: 'center',
  },
  wrapTouchItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderRgb,
    paddingVertical: normalize(30),
  },
  touchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelItem: {
    marginLeft: paddingHorizontalItem,
    // marginBottom: distanceVerticalTxtLeft,
    includeFontPadding: false,
    fontFamily: KEY_FONT.bold,
  },
  txtDataSource: {
    marginLeft: paddingHorizontalItem,
    marginRight: normalize(10),
  },
  txtSub: {
    marginLeft: paddingHorizontalItem,
    // marginBottom: distanceVerticalTxtLeft,
  },
});

class AddLocationScreen extends BaseScreen {
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
      {
        label: 'Accuweather.com',
        value: 'acc',
        sub: 'Parly sunny',
        temperatureValue: 33,
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
              <IconLocationSvg width={normalize(76)} height={normalize(76)} />
              <View style={{}}>
                <CustomText
                  medium
                  size={34}
                  style={styles.labelItem}
                  color={Colors.air_quality_text}>
                  {item.label}
                </CustomText>
                {item.sub ? (
                  <CustomText size={28} style={styles.txtSub} color="#808080">
                    {item.sub}
                  </CustomText>
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
                color={Colors.air_quality_text}>
                {item.temperatureValue}
              </CustomText>
              <CustomText
                style={{
                  includeFontPadding: false,
                  marginRight: normalize(9.75),
                }}
                size={27}
                light
                color={Colors.air_quality_text}>
                {temperatureC}
              </CustomText>
              <IconWeatherSvg width={normalize(52.01)} height={normalize(52)} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderHeader = () => {
    return (
      <View
        style={{
          paddingVertical: normalize(20),
          paddingHorizontal: normalize(30),
          backgroundColor: '#fff',
          width: widthDevice,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          onChangeText={async text => {
            myLog('onchange search location--->', text);
            if (text.length > 2) {
              const resLocation = await MyServer.getInstance().getLocationByName(
                {query: {q: text, type: 'like'}},
              );
              myLog('resLocation--->', resLocation);
							// const resLocation = CityList.filter((x) => x.name.indexOf(text) !== -1);
              // myLog('resLocation--->', resLocation);
            }
          }}
          style={{
            backgroundColor: '#F5F6FA',
            borderRadius: normalize(60),
            paddingHorizontal: normalize(30),
            width: widthDevice - 2 * normalize(30),
            paddingLeft: normalize(34) + normalize(20) + normalize(30),
          }}
        />
        <View
          style={{position: 'absolute', left: normalize(34) + normalize(30)}}>
          <IconSearchSvg width={normalize(34)} height={normalize(34)} />
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
        <Header
          iconBack={
            <IconRemoveSvg width={normalize(32)} height={normalize(32)} />
          }
          title="Add location"
          extraElement={this.renderHeader}
        />
        <FlatList
          keyExtractor={(item, index) => item.value + index}
          data={this.listProvider}
          renderItem={this.renderItem}
          // ListHeaderComponent={this.renderHeader}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default AddLocationScreen;
