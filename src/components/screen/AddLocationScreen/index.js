import React from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
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
import {
  getStateForKeys,
  getValueFromObjectByKeys,
  temperatureC,
} from '../../../utils/Util';
import {KEY_FONT} from '../../../themes/Fonts';
import {Colors} from '../../../themes/Colors';
import {myLog} from '../../../Debug';
import {MyServer} from '../../../data-source/server';
import {debounce, throttle} from '../../../modules/Lodash';
import {DEFINE_UNITS_TEMP, unitsQuery} from '../../../Define';
import {connect} from 'react-redux';
import withI18n, {typeStringAfterTranslation} from '../../../modules/i18n/HOC';
import {languagesKeys} from '../../../modules/i18n/defined';
import {LocationAction} from '../../../actions';
import Axios from 'axios';

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
      loadingData: false,
      isFirstRender: true,
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
    const {myLocations, changeLocation} = this.props;
    myLog('onPressItem--->', myLocations, item);
    const isChoiced = myLocations.find(
      x => x.googlePlaceId === item.googlePlaceId,
    );
    if (!isChoiced) {
      let tmpLocation = [...myLocations];
      tmpLocation.unshift({
        label: item.name,
        lat: item.lat,
        lon: item.lon,
        googlePlaceId: item.googlePlaceId,
      });
      myLog('---tmpLocation--->', tmpLocation);
      changeLocation(tmpLocation);
    }
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
      this.setState({loadingData: true});
      // const resLocation = await MyServer.getInstance().getLocationByName({
      //   query: {q: text},
      // });
      // const resPlace = await MyServer.getInstance().findPlaceFromText({
      //   name: text,
      // });
      const resPlaceLike = await MyServer.getInstance().findPlaceFromTextLike({
        name: text,
      });
      myLog('resPlaceLike--->', resPlaceLike);
      let arrDetailPlace = [];
      let {status, predictions} = getValueFromObjectByKeys(resPlaceLike, [
        'data',
      ]);
      predictions.splice(5, 1);
      if (predictions.length) {
        predictions.map(place => {
          if (place.place_id) {
            arrDetailPlace.push(
              MyServer.getInstance().getPlaceDetail({placeId: place.place_id}),
            );
          }
        });
        if (arrDetailPlace.length) {
          const resAllDetailPlace = await Axios.all(arrDetailPlace);
          myLog('---resAllDetailPlace--->', resAllDetailPlace);
          let arrDetailWeather = [];
          resAllDetailPlace.map(item => {
            const {lat, lng} = getValueFromObjectByKeys(item, [
              'data',
              'result',
              'geometry',
              'location',
            ]);
            if (lat && lng) {
              arrDetailWeather.push(
                MyServer.getInstance().getWeatherByGeometry({
                  query: {
                    lat,
                    lon: lng,
                  },
                }),
              );
            }
          });
          if (arrDetailPlace.length) {
            const resAllDetailWeatherPlace = await Axios.all(arrDetailWeather);
            myLog('resAllDetailWeatherPlace--->', resAllDetailWeatherPlace);
            let dataSearch = [];
            resAllDetailWeatherPlace.map((itemDetailWeather, index) => {
              const data = getValueFromObjectByKeys(itemDetailWeather, [
                'data',
              ]);
              if (data) {
                const nameFinal = getValueFromObjectByKeys(
                  resPlaceLike.data.predictions[index],
                  ['description'],
                  data.name,
                );
                dataSearch.push({
                  ...data,
                  name: nameFinal,
                  lat:
                    resAllDetailPlace[index].data.result.geometry.location.lat,
                  lon:
                    resAllDetailPlace[index].data.result.geometry.location.lng,
                  googlePlaceId: resPlaceLike.data.predictions[index].place_id,
                });
              }
            });
            if (dataSearch.length) {
              this.setState({
                dataSearch,
                loadingData: false,
                isFirstRender: false,
              });
            }
          }
        }
      } else {
        this.setState({
          dataSearch: [],
          loadingData: false,
          isFirstRender: false,
        });
      }
      // const resLocation = CityList.filter((x) => x.name.indexOf(text) !== -1);
      // myLog('resLocation--->', resLocation);
    } else {
      this.setState({
        dataSearch: [],
        loadingData: false,
        isFirstRender: true,
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
    const {dataSearch, loadingData, isFirstRender} = this.state;
    const {t} = this.props;
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
        {loadingData ? (
          <ActivityIndicator
            style={{marginTop: normalize(30)}}
            size="large"
            color={Colors.viewDetail}
          />
        ) : null}
        <FlatList
          keyExtractor={(item, index) => item.id + index}
          data={dataSearch}
          renderItem={this.renderItem}
          // ListHeaderComponent={this.renderHeader}
          ListEmptyComponent={() => {
            return !loadingData && !isFirstRender ? (
              <View
                style={{
                  flex: 1,
                  paddingVertical: normalize(30),
                  alignItems: 'center',
                }}>
                <CustomText color="#f00">
                  {t(languagesKeys.emptyData, {
                    type: typeStringAfterTranslation.capitalize,
                  })}
                </CustomText>
              </View>
            ) : null;
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    unitTemp: getStateForKeys(state, ['Setting', 'unitTemp']),
    myLocations: getStateForKeys(state, ['Location', 'myLocations']),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeLocation: data => {
      return dispatch(LocationAction.changeLocation(data));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withI18n(AddLocationScreen));
