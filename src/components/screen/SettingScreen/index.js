import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import BaseScreen from '../BaseScreen';
import IconUnitSvg from '../../../../assets/SVGIcon/view-setting/icon_unit.svg';
import IconNotiSvg from '../../../../assets/SVGIcon/view-setting/icon_noti.svg';
import IconRightSvg from '../../../../assets/SVGIcon/view-setting/right.svg';
import IconProviderSvg from '../../../../assets/SVGIcon/view-setting/icon_provider.svg';
import IconWeatherSvg from '../../../../assets/SVGIcon/view-setting/icon_weather.svg';
import IconThemeSvg from '../../../../assets/SVGIcon/view-setting/icon_theme.svg';
import IconLanguageSvg from '../../../../assets/SVGIcon/view-setting/icon_language.svg';
import IconUpdateSvg from '../../../../assets/SVGIcon/view-setting/icon_update.svg';
import IconTimeSvg from '../../../../assets/SVGIcon/view-setting/icon_time.svg';
import IconCustomSvg from '../../../../assets/SVGIcon/view-setting/icon_custom.svg';
import IconPrivacySvg from '../../../../assets/SVGIcon/view-setting/icon_privacy.svg';
import IconInfoSvg from '../../../../assets/SVGIcon/view-setting/icon_info.svg';
import IconStarSvg from '../../../../assets/SVGIcon/view-setting/icon_star.svg';
import IconUpSvg from '../../../../assets/SVGIcon/view-setting/icon_up.svg';
import {STATUS_BAR_HEIGHT, widthDevice} from '../../../utils/DeviceUtil';
import CustomImage, {TYPE_IMAGE_RESIZE_MODE} from '../../common/Image';
import {Images} from '../../../themes/Images';
import CustomText from '../../common/Text';
import NavigationService from '../../../navigation/NavigationService';
import {ROUTER_NAME} from '../../../navigation/NavigationConst';
import {Header} from '../Header';

const paddingHorizontalItem = 15;
const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: paddingHorizontalItem,
  },
  wrapTouchItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#DADCE3',
    paddingVertical: 12,
  },
  touchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapLeftItem: {flexDirection: 'row', alignItems: 'center'},
  linearLeft: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  imageLeftItem: {width: 20, height: 20},
  wrapRightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wrapTextHeader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: widthDevice,
  },
});

class SettingScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {};
    this.listAction = [
      {
        label: 'Units',
        iconLeft: IconUnitSvg,
        txtRight: 'oC, mm, cm, km, m/s, hPa',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'units',
        isSvg: true,
      },
      {
        label: 'Notification',
        iconLeft: IconNotiSvg,
        txtRight: '',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'noti',
        isSvg: true,
      },
      {
        label: 'Weather Provider',
        iconLeft: IconProviderSvg,
        txtRight: 'TheWeatherChannel',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'provider',
        isSvg: true,
      },
      {
        label: 'Weather Iconset',
        iconLeft: IconWeatherSvg,
        txtRight: 'Colorful',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'weather',
        isSvg: true,
      },
      {
        label: 'Theme Color',
        iconLeft: IconThemeSvg,
        txtRight: 'Light mode',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'theme',
        isSvg: true,
      },
      {
        label: 'Language',
        iconLeft: IconLanguageSvg,
        txtRight: 'English',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'language',
        isSvg: true,
      },
      {
        label: 'Update Frequency',
        iconLeft: IconUpdateSvg,
        txtRight: '30 minutes',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'update',
        isSvg: true,
      },
      {
        label: 'Time Format',
        iconLeft: IconTimeSvg,
        txtRight: '24 hours',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'time',
        isSvg: true,
      },
      {
        label: 'Customize Layout',
        iconLeft: IconCustomSvg,
        txtRight: '',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'custom',
        isSvg: true,
      },
      {
        label: 'Privacy',
        iconLeft: IconPrivacySvg,
        txtRight: '',
        onClick: () => {},
        key: 'privacy',
        isSvg: true,
        isUp: true,
      },
      {
        label: 'About App',
        iconLeft: IconInfoSvg,
        txtRight: 'Version 1.2.3',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'units',
        isSvg: true,
      },
      {
        label: 'Rate Us',
        iconLeft: IconStarSvg,
        txtRight: '',
        onClick: () => {},
        key: 'rate',
        isSvg: true,
        isUp: true,
      },
    ];
  }
  onPressItem = item => {
    switch (item.key) {
      case 'update':
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.FREQUENCY.name,
        });
        break;
      case 'language':
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.LANGUAGE.name,
        });
        break;
      case 'provider':
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.WEATHER_PROVIDER.name,
        });
        break;
      case 'units':
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.UNIT.name,
        });
        break;
      default:
        break;
    }
  };
  renderItem = params => {
    const {item, index} = params;
    const IconLeft = item.iconLeft;
    const IconRight = item.iconRight;
    const labelStyle = {
      marginLeft: paddingHorizontalItem,
      marginRight: item.isUp ? paddingHorizontalItem : 0,
    };
    return (
      <View key={index} style={styles.containerItem}>
        <View style={styles.wrapTouchItem}>
          <TouchableOpacity
            onPress={() => {
              this.onPressItem(item);
            }}
            style={styles.touchItem}>
            <View style={styles.wrapLeftItem}>
              {item.iconLeft ? (
                item.isSvg ? (
                  <IconLeft width={56} height={56} />
                ) : (
                  <CustomImage source={IconLeft} style={styles.imageLeftItem} />
                )
              ) : null}
              {item.label ? (
                <CustomText
                  size={15}
                  numberOfLines={1}
                  style={labelStyle}
                  color="#404040">
                  {item.label}
                </CustomText>
              ) : null}
              {item.isUp ? <IconUpSvg width={16} height={16} /> : null}
            </View>
            <View style={styles.wrapRightItem}>
              {item.txtRight ? (
                <CustomText
                  size={14}
                  style={{marginRight: paddingHorizontalItem}}
                  numberOfLines={1}
                  color="#AAAAAA">
                  {item.txtRight}
                </CustomText>
              ) : null}
              {IconRight ? <IconRight /> : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderHeader = () => {
    const styleHeaderImage = {
      position: 'absolute',
      width: widthDevice,
      height: widthDevice * (1 / Images.assets.setting_header_image.ratio),
    };
    const styleHeaderBg = {
      width: widthDevice,
      height: widthDevice * (1 / Images.assets.setting_header_bg.ratio),
    };
    return (
      <View>
        <CustomImage
          source={Images.assets.setting_header_bg.source}
          style={styleHeaderBg}
          resizeMode={TYPE_IMAGE_RESIZE_MODE.COVER}
        />
        <CustomImage
          source={Images.assets.setting_header_image.source}
          style={styleHeaderImage}
          resizeMode={TYPE_IMAGE_RESIZE_MODE.COVER}
        />
        <View style={styles.wrapTextHeader}>
          <CustomText
            color="#fff"
            style={{
              marginTop:
                (widthDevice * (1 / Images.assets.setting_header_image.ratio)) /
                3,
            }}>
            Settings
          </CustomText>
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
          marginTop: STATUS_BAR_HEIGHT,
        }}>
        <FlatList
          stickyHeaderIndices={[0]}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={(item, index) => item.key + index}
          data={this.listAction}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default SettingScreen;
