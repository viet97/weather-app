import React from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {normalize, widthDevice} from '../../../../../utils/DeviceUtil';
import {ItemListSetting} from '../../../LanguageScreen';
import {Colors} from '../../../../../themes/Colors';
import IconInfoSvg from '../../../../../../assets/SVGIcon/weather-info/icon_info.svg';
import IconSettingSvg from '../../../../../../assets/SVGIcon/weather-info/icon_setting.svg';
import IconWeatherProviderSvg from '../../../../../../assets/SVGIcon/weather-info/icon_weather_provider.svg';
import IconWeatherHeaderSvg from '../../../../../../assets/SVGIcon/weather-info/header.svg';
import IconRightSvg from '../../../../../../assets/SVGIcon/view-setting/right.svg';
import CustomText from '../../../../common/Text';
import AppInfoManager from '../../../../../AppInfoManager';
import {Images} from '../../../../../themes/Images';
import {appCreatedBy} from '../../../../../Define';
import {ROUTER_NAME} from '../../../../../navigation/NavigationConst';
import NavigationService from '../../../../../navigation/NavigationService';

const iconFollowSize = {width: normalize(60), height: normalize(60)};
const paddingHorizontalItem = normalize(30);
const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: paddingHorizontalItem,
  },
  wrapTouchItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderRgb,
    paddingVertical: normalize(41),
  },
  touchItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelItem: {
    marginLeft: paddingHorizontalItem,
  },
  touchIconFollow: {marginRight: normalize(30)},
});

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '30p',
    };
    this.listAction = [
      {
        label: 'About this app',
        value: 'about',
        router: ROUTER_NAME.ABOUT.name,
        txtRight:
          'Version ' + AppInfoManager.getInstance().getAppInfo().buildVersion,
        iconLeft: IconInfoSvg,
      },
      {
        label: 'Settings',
        value: 'setting',
        router: ROUTER_NAME.SETTING.name,
        iconLeft: IconSettingSvg,
      },
      {
        label: 'Weather Provider',
        value: 'provider',
        router: ROUTER_NAME.WEATHER_PROVIDER.name,
        txtRight: 'TheWeatherChannel',
        iconLeft: IconWeatherProviderSvg,
      },
    ];
  }
  onPressItem = item => {
    if (item.router) {
      NavigationService.getInstance().navigate({
        routerName: item.router,
      });
    }
  };
  renderItem = params => {
    const {item, index} = params;
    const {value} = this.state;
    const IconLeft = item.iconLeft;
    return (
      <ItemListSetting
        customStyle={{width: widthDevice}}
        key={index}
        value={value}
        onPressItem={this.onPressItem}
        item={item}
        txtRight={
          <CustomText style={{marginRight: normalize(30)}} size={28}>
            {item.txtRight}
          </CustomText>
        }
        noBorder={index === this.listAction.length - 1}
        iconLeft={<IconLeft width={normalize(56)} height={normalize(56)} />}
        iconRight={
          <IconRightSvg width={normalize(11.88)} height={normalize(22)} />
        }
      />
    );
  };
  render() {
    return (
      <View
        style={{
          // backgroundColor: Colors.white,
          flex: 1,
          width: widthDevice,
          backgroundColor: '#F4F5F8',
        }}>
        <ImageBackground
          style={{
            width: widthDevice,
            height: widthDevice * (1 / Images.assets.bg_bottom_about.ratio),
            alignItems: 'center',
            backgroundColor: '#F4F5F8',
            paddingTop: normalize(32),
          }}
          source={Images.assets.bg_bottom_about.source}>
          <IconWeatherHeaderSvg
            width={normalize(254)}
            height={normalize(154)}
          />
          {this.listAction.map((item, index) => {
            return this.renderItem({item, index});
          })}
          <CustomText
            appC
            style={{position: 'absolute', bottom: normalize(26)}}
            color="#094FB9"
            size={28}>
            {`Version ${
              AppInfoManager.getInstance().getAppInfo().buildVersion
            } - ${appCreatedBy}`}
          </CustomText>
        </ImageBackground>
      </View>
    );
  }
}

export default WeatherInfo;
