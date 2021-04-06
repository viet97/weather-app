import React from 'react';
import {FlatList, View, ActivityIndicator, RefreshControl} from 'react-native';
import BaseScreen from '../BaseScreen';
import IconWeatherSvg from '../../../../assets/SVGIcon/view-menu/icon_weather.svg';
import {Images} from '../../../themes/Images';
import CustomImage, {TYPE_IMAGE_RESIZE_MODE} from '../../common/Image';
import {
  normalize,
  STATUS_BAR_HEIGHT,
  widthDevice,
} from '../../../utils/DeviceUtil';
import IconBackSvg from '../../../../assets/SVGIcon/view-menu/icon_back.svg';
import IconAddSvg from '../../../../assets/SVGIcon/view-menu/icon_add.svg';
import IconSettingSvg from '../../../../assets/SVGIcon/view-menu/icon_setting.svg';
import IconMoreSvg from '../../../../assets/SVGIcon/view-menu/icon_more.svg';
import IconTempCSvg from '../../../../assets/SVGIcon/view-menu/icon_tempC.svg';
import CustomText from '../../common/Text';
import {TouchablePlatform} from '../../../modules/TouchablePlatform';
import NavigationService from '../../../navigation/NavigationService';
import {ROUTER_NAME} from '../../../navigation/NavigationConst';
import {Colors} from '../../../themes/Colors';
import {
  deepCopyObject,
  getStateForKeys,
  temperatureC,
  temperatureF,
  temperatureNone,
} from '../../../utils/Util';
import withI18n from '../../../modules/i18n/HOC';
import {connect} from 'react-redux';
import {myLog} from '../../../Debug';
import {MyServer} from '../../../data-source/server';
import {DEFINE_UNITS_TEMP, unitsQuery} from '../../../Define';
import Axios from 'axios';
import Modal from 'react-native-modal';
import {LocationAction} from '../../../actions';
import {AppSettingManager} from '../../../modules/AppSettingManager';

class MenuScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isShowModalRemove: false,
      locationSelected: null,
      loadingData: false,
    };
  }
  getWeatherDetail = async (props = this.props) => {
    try {
      myLog(
        '--AppSettingManager.getInstance().setFirstValueLocal---',
        AppSettingManager.getInstance().isSetFirstValueLocal(),
      );
      if (!AppSettingManager.getInstance().isSetFirstValueLocal()) return;
      myLog('getWeatherDetail--->', props);
      this.setState({loadingData: true});
      const {myLocations, unitTemp} = props;
      if (myLocations && myLocations.length) {
        let arrDetail = [],
          arrPhotoPlace = [];
        myLocations.map(item => {
          myLog('---myLocations-->', item);
          arrPhotoPlace.push(
            MyServer.getInstance().getPlaceDetail({
              placeId: item.googlePlaceId,
            }),
          );
          arrDetail.push(
            MyServer.getInstance().getWeatherByGeometry({
              query: {
                lat: item.lat,
                lon: item.lon,
              },
            }),
          );
        });
        if (arrDetail.length) {
          const resAllDetail = await Axios.all(arrDetail);
          const resAllPhotoPlace = await Axios.all(arrPhotoPlace);
          myLog('resAllDetail--->', resAllDetail, resAllPhotoPlace);
          let tmpDataLocation = [];
          resAllDetail.map((resDetail, index) => {
            const resDetailData =
              resDetail && resDetail.data && Object.keys(resDetail.data).length
                ? resDetail.data
                : null;
            if (resDetailData) {
              tmpDataLocation.push({
                label: myLocations[index].label || resDetailData.name,
                key: resDetailData.id,
                id: resDetailData.id,
                temperature: resDetailData.main.temp,
                photo: MyServer.getInstance().getPhotoPlaceGg(
                  resAllPhotoPlace[index].data.result.photos[0].photo_reference,
                ),
              });
            }
          });
          this.setState({
            data: tmpDataLocation,
            loadingData: false,
          });
        }
      } else {
        this.setState({
          loadingData: false,
        });
      }
    } catch (error) {
      myLog('getWeatherDetail--->', error);
      this.setState({
        loadingData: false,
      });
    }
  };
  componentDidMount() {
    this.getWeatherDetail();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    myLog(
      'componentWillReceiveProps--->',
      nextProps,
      JSON.stringify(nextProps.myLocations) !==
        JSON.stringify(this.props.myLocations) ||
        nextProps.unitTemp !== this.props.unitTemp ||
        nextProps.language !== this.props.language ||
        nextProps.dataSource !== this.props.dataSource,
    );
    if (
      JSON.stringify(nextProps.myLocations) !==
        JSON.stringify(this.props.myLocations) ||
      nextProps.unitTemp !== this.props.unitTemp ||
      nextProps.language !== this.props.language ||
      nextProps.dataSource !== this.props.dataSource
    ) {
      this.getWeatherDetail(nextProps);
    }
  }
  renderItem = params => {
    const {item, index} = params;
    const {unitTemp} = this.props;
    return (
      <View
        style={{
          paddingHorizontal: normalize(9),
          marginBottom: normalize(9),
        }}
        key={index}>
        <CustomImage
          source={{
            uri: item.photo,
          }}
          style={{width: normalize(544), height: normalize(271.5)}}
          resizeMode={TYPE_IMAGE_RESIZE_MODE.COVER}
        />
        <View
          style={{
            position: 'absolute',
            width: normalize(543),
            height: normalize(271.5),
            top: 0,
            left: normalize(9),
            backgroundColor: Colors.blackAlpha20,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: normalize(9),
            width: normalize(544),
            height: normalize(271.5),
            paddingHorizontal: normalize(30),
            justifyContent: 'space-between',
            paddingVertical: normalize(28),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                maxWidth:
                  normalize(544) -
                  normalize(44) -
                  2 * normalize(30) -
                  normalize(30),
              }}
              numberOfLines={1}
              color={Colors.white}
              size={36}>
              {item.label}
            </CustomText>
            <TouchablePlatform
              onPress={() => {
                this.setState({
                  locationSelected: item,
                  isShowModalRemove: true,
                });
              }}>
              <CustomImage
                source={Images.assets.icon_more_menu.source}
                style={{
                  width: normalize(44),
                  height: normalize(44),
                }}
              />
            </TouchablePlatform>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <CustomText
                style={{includeFontPadding: false, marginTop: 5}}
                thin
                color={Colors.white}
                size={80}>
                {parseFloat(item.temperature).toFixed(1) || 36}
              </CustomText>
              <CustomText
                style={{
                  includeFontPadding: false,
                  marginTop: 10,
                }}
                thin
                color={Colors.white}
                size={50}>
                {DEFINE_UNITS_TEMP[unitTemp].label || temperatureNone}
              </CustomText>
              {/* <IconTempCSvg width={normalize(42)} height={normalize(33)} /> */}
            </View>
            <View
              style={{
                height: normalize(58) + 6,
              }}>
              <IconWeatherSvg width={normalize(58)} height={normalize(58)} />
            </View>
          </View>
        </View>
      </View>
    );
  };
  renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: normalize(104) + STATUS_BAR_HEIGHT,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: normalize(30),
          paddingBottom: normalize(40),
          backgroundColor: Colors.white,
        }}>
        <TouchablePlatform
          onPress={() => {
            NavigationService.getInstance().closeDrawer();
          }}
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
          }}>
          <IconBackSvg width={normalize(19.44)} height={normalize(36)} />
        </TouchablePlatform>
        <View style={{flexDirection: 'row'}}>
          <TouchablePlatform
            onPress={() => {
              NavigationService.getInstance().navigate({
                routerName: ROUTER_NAME.ADD_LOCATION.name,
              });
            }}
            style={{marginRight: normalize(56)}}>
            <IconAddSvg width={normalize(64)} height={normalize(64)} />
          </TouchablePlatform>
          <TouchablePlatform
            onPress={() => {
              NavigationService.getInstance().navigate({
                routerName: ROUTER_NAME.SETTING.name,
              });
            }}>
            <IconSettingSvg width={normalize(64)} height={normalize(64)} />
          </TouchablePlatform>
        </View>
      </View>
    );
  };
  hideModalRemove = () => {
    this.setState({
      isShowModalRemove: false,
    });
  };
  removeLocation = () => {
    const {locationSelected, data} = this.state;
    const {myLocations, changeLocation} = this.props;
    const tmpMyLocations = deepCopyObject(myLocations);
    const indexRemove = tmpMyLocations.findIndex(
      x => x.id === locationSelected.id,
    );
    if (indexRemove !== -1) {
      tmpMyLocations.splice(indexRemove, 1);
      changeLocation(tmpMyLocations);
      this.setState({
        locationSelected: null,
        isShowModalRemove: false,
      });
    }
  };
  renderContent() {
    const {data, isShowModalRemove, loadingData} = this.state;
    const {myLocations} = this.props;
    myLog('--render menu---', data);
    return (
      <View style={{backgroundColor: Colors.white}}>
        <FlatList
          keyExtractor={(item, index) => item.key + index}
          data={data}
          renderItem={this.renderItem}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={this.renderHeader}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={this.getWeatherDetail}
            />
          }
          ListEmptyComponent={() => {
            return loadingData ? (
              <ActivityIndicator
                style={{marginTop: normalize(30)}}
                size="large"
                color={Colors.viewDetail}
              />
            ) : null;
          }}
        />
        <Modal
          onBackButtonPress={this.hideModalRemove}
          onBackdropPress={this.hideModalRemove}
          isVisible={isShowModalRemove}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: widthDevice - 2 * normalize(30),
              }}>
              <TouchablePlatform
                onPress={this.removeLocation}
                style={{
                  paddingVertical: normalize(35),
                  backgroundColor: Colors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: normalize(20),
                }}>
                <CustomText semiBold size={36} color={Colors.viewDetail}>
                  Remove this location
                </CustomText>
              </TouchablePlatform>
              <TouchablePlatform
                onPress={this.hideModalRemove}
                style={{
                  paddingVertical: normalize(35),
                  backgroundColor: Colors.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: normalize(20),
                  borderRadius: normalize(20),
                }}>
                <CustomText semiBold size={36} color={Colors.textTitle}>
                  Cancel
                </CustomText>
              </TouchablePlatform>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    myLocations: getStateForKeys(state, ['Location', 'myLocations']),
    unitTemp: getStateForKeys(state, ['Setting', 'unitTemp']),
    dataSource: getStateForKeys(state, ['Setting', 'dataSource']),
    language: getStateForKeys(state, ['Language', 'language']),
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
)(withI18n(MenuScreen));
