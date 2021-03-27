import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
import {widthDevice} from '../../../utils/DeviceUtil';
import CustomImage, {TYPE_IMAGE_RESIZE_MODE} from '../../common/Image';
import {Images} from '../../../themes/Images';
import CustomText from '../../common/Text';

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
        iconSize: {
          width: 19.8,
          height: 36,
        },
        iconLeftBackgroundColor: '#29B6F6',
        linearColor: ['rgba(41, 182, 246, 0.7)', 'rgba(41, 182, 246, 1)'],
        txtRight: 'oC, mm, cm, km, m/s, hPa',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'units',
        isSvg: true,
      },
      {
        label: 'Notification',
        iconLeft: IconNotiSvg,
        iconSize: {
          width: 32.17,
          height: 35,
        },
        iconLeftBackgroundColor: '#FF4E4E',
        linearColor: ['rgba(255, 78, 78, 0.7)', 'rgba(255, 78, 78, 1)'],
        txtRight: '',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'noti',
        isSvg: true,
      },
      {
        label: 'Weather Provider',
        iconLeft: IconProviderSvg,
        iconSize: {
          width: 31.62,
          height: 36,
        },
        iconLeftBackgroundColor: '#00A6F9',
        linearColor: ['rgba(0, 166, 249, 1)', 'rgba(0, 113, 226, 1)'],
        txtRight: 'TheWeatherChannel',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'provider',
        isSvg: true,
      },
      {
        label: 'Weather Iconset',
        iconLeft: IconWeatherSvg,
        iconSize: {
          width: 37.06,
          height: 32,
        },
        iconLeftBackgroundColor: '#FAAE20',
        linearColor: ['rgba(250, 174, 32, 0.7)', 'rgba(250, 174, 32, 1)'],
        txtRight: 'Colorful',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'weather',
        isSvg: true,
      },
      {
        label: 'Theme Color',
        iconLeft: IconThemeSvg,
        iconSize: {
          width: 38,
          height: 38,
        },
        iconLeftBackgroundColor: '#00A6F9',
        linearColor: ['rgba(187, 196, 226, 1)', 'rgba(106, 128, 170, 1)'],
        txtRight: 'Light mode',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'theme',
        isSvg: true,
      },
      {
        label: 'Language',
        iconLeft: IconLanguageSvg,
        iconSize: {
          width: 32,
          height: 32,
        },
        linearColor: ['rgba(48, 131, 255, 0.7)', 'rgba(48, 131, 255, 1)'],
        iconLeftBackgroundColor: '#29B6F6',
        txtRight: 'English',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'language',
        isSvg: true,
      },
      {
        label: 'Update Frequency',
        iconLeft: IconUpdateSvg,
        iconSize: {
          width: 34.01,
          height: 34,
        },
        linearColor: ['rgba(255, 146, 72, 0.7)', 'rgba(255, 146, 72, 1)'],
        iconLeftBackgroundColor: '#29B6F6',
        txtRight: '30 minutes',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'update',
        isSvg: true,
      },
      {
        label: 'Time Format',
        iconLeft: IconTimeSvg,
        iconSize: {
          width: 34,
          height: 34,
        },
        linearColor: ['rgba(94, 91, 230, 0.7)', 'rgba(94, 91, 230, 1)'],
        iconLeftBackgroundColor: '#29B6F6',
        txtRight: '24 hours',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'time',
        isSvg: true,
      },
      {
        label: 'Customize Layout',
        iconLeft: IconCustomSvg,
        iconSize: {
          width: 30,
          height: 30,
        },
        linearColor: ['rgba(187, 196, 226, 1)', 'rgba(106, 128, 170, 1)'],
        iconLeftBackgroundColor: '#29B6F6',
        txtRight: '',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'custom',
        isSvg: true,
      },
      {
        label: 'Privacy',
        iconSize: {
          width: 27.15,
          height: 38.17,
        },
        iconLeft: IconPrivacySvg,
        linearColor: ['rgba(29, 160, 47, 1)', 'rgba(93, 195, 69, 1)'],
        iconLeftBackgroundColor: '#29B6F6',
        txtRight: '',
        onClick: () => {},
        key: 'privacy',
        isSvg: true,
        isUp: true,
      },
      {
        label: 'About App',
        iconLeft: IconInfoSvg,
        iconSize: {
          width: 34.02,
          height: 34,
        },
        linearColor: ['rgba(0, 166, 249, 1)', 'rgba(0, 113, 226, 1)'],
        iconLeftBackgroundColor: '#29B6F6',
        txtRight: 'Version 1.2.3',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: 'units',
        isSvg: true,
      },
      {
        label: 'Rate Us',
        iconLeft: IconStarSvg,
        iconSize: {
          width: 33.39,
          height: 32,
        },
        linearColor: ['rgba(255, 210, 77, 1)', 'rgba(253, 175, 0, 1)'],
        iconLeftBackgroundColor: '#29B6F6',
        txtRight: '',
        onClick: () => {},
        key: 'rate',
        isSvg: true,
        isUp: true,
      },
    ];
  }
  onPressItem = item => {};
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
                  <LinearGradient
                    colors={
                      item.linearColor || [
                        'rgba(41, 182, 246, 0.7)',
                        'rgba(41, 182, 246, 1)',
                      ]
                    }
                    style={styles.linearLeft}>
                    <IconLeft
                      width={item.iconSize ? item.iconSize.width : 19.8}
                      height={item.iconSize ? item.iconSize.height : 36}
                    />
                  </LinearGradient>
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
      <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
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
