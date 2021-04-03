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
import {getStateForKeys, temperatureC} from '../../../utils/Util';
import {KEY_FONT} from '../../../themes/Fonts';
import {Colors} from '../../../themes/Colors';
import {myLog} from '../../../Debug';
import {MyServer} from '../../../data-source/server';
import {debounce, throttle} from '../../../modules/Lodash';
import {DEFINE_UNITS_TEMP, unitsQuery} from '../../../Define';
import {connect} from 'react-redux';
import withI18n from '../../../modules/i18n/HOC';

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
    flexWrap: 'wrap',
    flex: 1,
  },
  labelItem: {
    marginLeft: paddingHorizontalItem,
    // marginBottom: distanceVerticalTxtLeft,
    includeFontPadding: false,
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
      dataSearch: [],
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
    this.onChangeText = debounce(this.onChangeText, 500, {
      leading: false,
      trailing: true,
    });
  }
  onPressItem = item => {
    this.setState({
      value: item.value,
    });
  };
  renderItem = params => {
    const {item, index} = params;
    const {unitTemp} = this.props;
    return (
      <View key={index} style={styles.containerItem}>
        <View style={styles.wrapTouchItem}>
          <TouchableOpacity
            onPress={() => {
              this.onPressItem(item);
            }}
            style={styles.touchItem}>
            <View
              style={{
                flexDirection: 'row',
                flex: 3,
                // maxWidth:
                //   widthDevice -
                //   normalize(27) -
                //   normalize(9.75) -
                //   normalize(52.01) -
                //   normalize(56) -
                //   3 * paddingHorizontalItem -
                //   normalize(100),
              }}>
              <IconLocationSvg width={normalize(76)} height={normalize(76)} />
              <View style={{}}>
                <CustomText
                  medium
                  numberOfLines={1}
                  size={34}
                  style={styles.labelItem}
                  color={Colors.air_quality_text}>
                  {item.name}
                </CustomText>
                {item.sys && item.sys.country ? (
                  <CustomText
                    size={28}
                    style={styles.txtSub}
                    color={Colors.txtSub}>
                    {item.sys.country}
                  </CustomText>
                ) : null}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flex: 2,
              }}>
              <CustomText
                size={46}
                style={{
                  includeFontPadding: false,
                  marginTop: -normalize(7),
                }}
                thin
                color={Colors.air_quality_text}>
                {item.main.temp}
              </CustomText>
              <CustomText
                style={{
                  includeFontPadding: false,
                  marginRight: paddingHorizontalItem,
                }}
                size={27}
                light
                color={Colors.air_quality_text}>
                {DEFINE_UNITS_TEMP[unitTemp].label}
              </CustomText>
              <IconWeatherSvg width={normalize(52.01)} height={normalize(52)} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  onChangeText = async text => {
    const {unitTemp} = this.props;
    myLog('onchange search location--->', text, unitTemp);
    if (text.length > 2) {
      const resLocation = await MyServer.getInstance().getLocationByName({
        query: {q: text, units: unitsQuery.openWeather.temp[unitTemp]},
      });
      myLog('resLocation--->', resLocation);
      if (resLocation && resLocation.data && resLocation.data.count) {
        this.setState({
          dataSearch: resLocation.data.list,
        });
      } else {
        this.setState({
          dataSearch: [],
        });
      }
      // const resLocation = CityList.filter((x) => x.name.indexOf(text) !== -1);
      // myLog('resLocation--->', resLocation);
    } else {
      this.setState({
        dataSearch: [],
      });
    }
  };
  renderHeader = () => {
    return (
      <View
        style={{
          paddingVertical: normalize(20),
          paddingHorizontal: normalize(30),
          width: widthDevice,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          onChangeText={this.onChangeText}
          style={{
            backgroundColor: Colors.backgroundGray,
            borderRadius: normalize(60),
            paddingHorizontal: normalize(30),
            width: widthDevice - 2 * normalize(30),
            paddingLeft: normalize(34) + normalize(20) + normalize(30),
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: normalize(34) + normalize(30),
            zIndex: 999,
          }}>
          <IconSearchSvg width={normalize(34)} height={normalize(34)} />
        </View>
      </View>
    );
  };
  renderContent() {
    const {dataSearch} = this.state;
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
          keyExtractor={(item, index) => item.id + index}
          data={dataSearch}
          renderItem={this.renderItem}
          // ListHeaderComponent={this.renderHeader}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    unitTemp: getStateForKeys(state, ['Setting', 'unitTemp']),
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withI18n(AddLocationScreen));
