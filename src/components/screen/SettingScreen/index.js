import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
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
import IconChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_choice.svg';
import IconUnChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_nochoice.svg';
import {
  normalize,
  STATUS_BAR_HEIGHT,
  widthDevice,
} from '../../../utils/DeviceUtil';
import CustomImage, {TYPE_IMAGE_RESIZE_MODE} from '../../common/Image';
import {Images} from '../../../themes/Images';
import CustomText from '../../common/Text';
import NavigationService from '../../../navigation/NavigationService';
import {ROUTER_NAME} from '../../../navigation/NavigationConst';
import {Header} from '../Header';
import {temperatureC} from '../../../utils/Util';

const paddingHorizontalItem = normalize(30);
const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: paddingHorizontalItem,
  },
  wrapTouchItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(218, 220, 227, 0.6)',
    paddingVertical: normalize(35),
  },
  touchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapLeftItem: {flexDirection: 'row', alignItems: 'center'},
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
    this.state = {
      isVisibleModalTime: false,
      isVisibleModalTheme: false,
    };
    this.listAction = [
      {
        label: 'Units',
        iconLeft: IconUnitSvg,
        txtRight: temperatureC + ', mm, cm, km, m/s, hPa',
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
      case 'custom':
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.CUSTOM_LAYOUT.name,
        });
        break;
      case 'theme':
        this.setState({
          isVisibleModalTime: false,
          isVisibleModalTheme: true,
        });
        break;
      case 'time':
        this.setState({
          isVisibleModalTime: true,
          isVisibleModalTheme: false,
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
                  <IconLeft width={normalize(56)} height={normalize(56)} />
                ) : (
                  <CustomImage source={IconLeft} style={styles.imageLeftItem} />
                )
              ) : null}
              {item.label ? (
                <CustomText
                  size={32}
                  numberOfLines={1}
                  style={labelStyle}
                  color="#404040">
                  {item.label}
                </CustomText>
              ) : null}
              {item.isUp ? (
                <IconUpSvg width={normalize(16)} height={normalize(16)} />
              ) : null}
            </View>
            <View style={styles.wrapRightItem}>
              {item.txtRight ? (
                <CustomText
                  size={28}
                  style={{marginRight: normalize(33)}}
                  numberOfLines={1}
                  color="#AAAAAA">
                  {item.txtRight}
                </CustomText>
              ) : null}
              {IconRight ? (
                <IconRight width={normalize(9.88)} height={18.29} />
              ) : null}
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
            size={36}
            style={{
              marginTop: normalize(105),
            }}>
            Settings
          </CustomText>
        </View>
      </View>
    );
  };
  renderModalBottom = ({
    title = '',
    options = [],
    onCancel = () => {},
    onOk = () => {},
  }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: widthDevice - normalize(20),
            backgroundColor: '#fff',
            borderTopLeftRadius: normalize(40),
            borderTopRightRadius: normalize(40),
            borderBottomLeftRadius: normalize(10),
            borderBottomRightRadius: normalize(10),
            alignItems: 'center',
          }}>
          <View
            style={{
              paddingVertical: normalize(40),
              borderBottomWidth: 1,
              borderBottomColor: '#DADCE3',
              width: '100%',
              alignItems: 'center',
            }}>
            <CustomText semiBold size={36} color="#404040">
              {title}
            </CustomText>
          </View>
          {options.map((option, idx) => {
            const IconFinal = option.isActive ? IconChoiceSvg : IconUnChoiceSvg;
            return (
              <View
                key={idx}
                style={{
                  width: '100%',
                  paddingHorizontal: normalize(40),
                }}>
                <View
                  style={{
                    borderBottomColor: 'rgba(218, 220, 227, 0.6)',
                    borderBottomWidth: idx === options.length - 1 ? 0 : 1,
                    paddingVertical: normalize(40),
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <IconFinal width={normalize(40)} height={normalize(40)} />
                      <CustomText
                        size={32}
                        medium
                        style={{marginLeft: normalize(40)}}
                        color="#404040">
                        {option.label}
                      </CustomText>
                    </View>
                    <CustomText size={32} color="#404040">
                      {option.txtRight || ''}
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            width: widthDevice - normalize(20),
            // height: 80,
            backgroundColor: '#fff',
            marginTop: 10,
            borderTopLeftRadius: normalize(10),
            borderTopRightRadius: normalize(10),
            borderBottomLeftRadius: normalize(40),
            borderBottomRightRadius: normalize(40),
            flexDirection: 'row',
            // justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              onCancel && onCancel();
            }}
            style={{
              paddingVertical: 20,
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText size={36} color="#094FB9">
              Cancel
            </CustomText>
          </TouchableOpacity>
          <View style={{width: 1, height: 30, backgroundColor: '#E9EAEE'}} />
          <TouchableOpacity
            onOk={() => {
              onOk && onOk();
            }}
            style={{
              paddingVertical: 20,
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText size={36} color="#094FB9">
              Done
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderContent() {
    const {isVisibleModalTime, isVisibleModalTheme} = this.state;
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          flex: 1,
        }}>
        <FlatList
          stickyHeaderIndices={[0]}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={(item, index) => item.key + index}
          data={this.listAction}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
        <Modal
          isVisible={isVisibleModalTime}
          style={{justifyContent: 'flex-end'}}
          onBackdropPress={() => this.setState({isVisibleModalTime: false})}>
          {this.renderModalBottom({
            onCancel: () => this.setState({isVisibleModalTime: false}),
            onOk: () => {},
            title: 'Time Format',
            options: [
              {
                label: '24 hours',
                value: '24h',
                txtRight: '13:52',
                isActive: true,
              },
              {
                label: '12 hours',
                value: '12h',
                txtRight: '1:52 PM',
              },
            ],
          })}
        </Modal>
        <Modal
          isVisible={isVisibleModalTheme}
          style={{justifyContent: 'flex-end'}}
          onBackdropPress={() => this.setState({isVisibleModalTheme: false})}>
          {this.renderModalBottom({
            onCancel: () => this.setState({isVisibleModalTheme: false}),
            onOk: () => {},
            title: 'Theme Color',
            options: [
              {
                label: 'Light Mode',
                value: 'light',
                isActive: true,
              },
              {
                label: 'Dark Mode',
                value: 'dark',
              },
            ],
          })}
        </Modal>
      </View>
    );
  }
}

export default SettingScreen;
