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
import IconHeaderBackSvg from '../../../../assets/SVGIcon/view-setting/icon_header_back.svg';
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
import {getStateForKeys, temperatureC} from '../../../utils/Util';
import {Colors} from '../../../themes/Colors';
import {TouchablePlatform} from '../../../modules/TouchablePlatform';
import {
  DEFINE_DATA_SOURCE,
  DEFINE_THEME_COLOR,
  DEFINE_TIME_FORMAT,
  DEFINE_UNITS_DISTANCE,
  DEFINE_UNITS_PRESSURE,
  DEFINE_UNITS_RAIN_SNOW,
  DEFINE_UNITS_TEMP,
  DEFINE_UNITS_WIND_SPEED,
  DEFINE_UNIT_FREQUENCY,
} from '../../../Define';
import {connect} from 'react-redux';
import SettingAction from '../../../actions/SettingAction';
import {NORMAL_TYPE} from '../../../actions/ActionTypes';
import {myLog} from '../../../Debug';
import AppInfoManager from '../../../AppInfoManager';
import {languagesKeys} from '../../../modules/i18n/defined';
import withI18n from '../../../modules/i18n/HOC';

const modalKey = {
  time: 'time',
  theme: 'theme',
};
const borderRadiusBig = normalize(40);
const borderRadiusSmall = normalize(10);
const paddingHorizontalItem = normalize(30);
const paddingTopHeader = normalize(105);
const textSizeBottom = 36;
const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: paddingHorizontalItem,
  },
  wrapTouchItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderRgb,
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
    justifyContent: 'space-between',
    width: widthDevice,
    flexDirection: 'row',
    paddingTop: paddingTopHeader,
    // paddingLeft: normalize(30),
  },
  touchBottom: {
    paddingVertical: normalize(36),
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapContentModal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  wrapTouch: {
    width: widthDevice - normalize(20),
    backgroundColor: Colors.white,
    marginTop: normalize(10),
    borderTopLeftRadius: borderRadiusSmall,
    borderTopRightRadius: borderRadiusSmall,
    borderBottomLeftRadius: borderRadiusBig,
    borderBottomRightRadius: borderRadiusBig,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapTopModal: {
    width: widthDevice - normalize(20),
    backgroundColor: '#fff',
    borderTopLeftRadius: borderRadiusBig,
    borderTopRightRadius: borderRadiusBig,
    borderBottomLeftRadius: borderRadiusSmall,
    borderBottomRightRadius: borderRadiusSmall,
    alignItems: 'center',
  },
  wrapTitleModal: {
    paddingVertical: normalize(40),
    borderBottomWidth: 1,
    borderBottomColor: Colors.bgHeaderBottomModal,
    width: '100%',
    alignItems: 'center',
  },
  wrapOption: {
    width: '100%',
    paddingHorizontal: normalize(40),
  },
});
const itemKey = {
  unit: 'unit',
  noti: 'noti',
  provider: 'provider',
  iconSet: 'iconSet',
  theme: 'theme',
  time: 'time',
  language: 'language',
  frequency: 'frequency',
  layout: 'layout',
  privacy: 'privacy',
  about: 'about',
  rate: 'rate',
};
class SettingScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      isVisibleModalTime: false,
      isVisibleModalTheme: false,
      valueThemeColor: this.props.themeColor,
      valueTimeFormat: this.props.timeFormat,
    };
    this.listAction = [
      {
        label: 'Units',
        iconLeft: IconUnitSvg,
        iconRight: IconRightSvg,
        onClick: () => {},
        key: itemKey.unit,
        isSvg: true,
        languageKey: languagesKeys.unit,
      },
      {
        label: 'Notification',
        iconLeft: IconNotiSvg,
        txtRight: '',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: itemKey.noti,
        isSvg: true,
        languageKey: languagesKeys.notice,
      },
      {
        label: 'Weather Provider',
        iconLeft: IconProviderSvg,
        iconRight: IconRightSvg,
        onClick: () => {},
        key: itemKey.provider,
        isSvg: true,
        languageKey: languagesKeys.weatherProvider,
      },
      {
        label: 'Weather Iconset',
        iconLeft: IconWeatherSvg,
        txtRight: 'Colorful',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: itemKey.iconSet,
        isSvg: true,
      },
      {
        label: 'Theme Color',
        iconLeft: IconThemeSvg,
        iconRight: IconRightSvg,
        onClick: () => {},
        key: itemKey.theme,
        isSvg: true,
        languageKey: languagesKeys.themeColor,
      },
      {
        label: 'Language',
        iconLeft: IconLanguageSvg,
        txtRight: 'English',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: itemKey.language,
        isSvg: true,
        languageKey: languagesKeys.language,
      },
      {
        label: 'Update Frequency',
        iconLeft: IconUpdateSvg,
        iconRight: IconRightSvg,
        onClick: () => {},
        key: itemKey.frequency,
        isSvg: true,
        languageKey: languagesKeys.updateFrequency,
      },
      {
        label: 'Time Format',
        iconLeft: IconTimeSvg,
        iconRight: IconRightSvg,
        onClick: () => {},
        key: itemKey.time,
        isSvg: true,
        languageKey: languagesKeys.timeFormat,
      },
      {
        label: 'Customize Layout',
        iconLeft: IconCustomSvg,
        txtRight: '',
        iconRight: IconRightSvg,
        onClick: () => {},
        key: itemKey.layout,
        isSvg: true,
        languageKey: languagesKeys.customizeLayout,
      },
      {
        label: 'Privacy',
        iconLeft: IconPrivacySvg,
        txtRight: '',
        onClick: () => {},
        key: itemKey.privacy,
        isSvg: true,
        isUp: true,
        languageKey: languagesKeys.privacy,
      },
      {
        label: 'About App',
        iconLeft: IconInfoSvg,
        txtRight:
          'Version ' + AppInfoManager.getInstance().getAppInfo().buildVersion,
        iconRight: IconRightSvg,
        onClick: () => {},
        key: itemKey.about,
        isSvg: true,
        languageKey: languagesKeys.aboutApp,
      },
      {
        label: 'Rate Us',
        iconLeft: IconStarSvg,
        txtRight: '',
        onClick: () => {},
        key: itemKey.rate,
        isSvg: true,
        isUp: true,
        languageKey: languagesKeys.rateUs,
      },
    ];
  }
  onPressItem = item => {
    switch (item.key) {
      case itemKey.frequency:
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.FREQUENCY.name,
        });
        break;
      case itemKey.language:
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.LANGUAGE.name,
        });
        break;
      case itemKey.provider:
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.WEATHER_PROVIDER.name,
        });
        break;
      case itemKey.unit:
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.UNIT.name,
        });
        break;
      case itemKey.layout:
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.CUSTOM_LAYOUT.name,
        });
        break;
      case itemKey.theme:
        this.setState({
          isVisibleModalTime: false,
          isVisibleModalTheme: true,
        });
        break;
      case itemKey.time:
        this.setState({
          isVisibleModalTime: true,
          isVisibleModalTheme: false,
        });
        break;
      case itemKey.about:
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.ABOUT.name,
        });
        break;
      case itemKey.noti:
        NavigationService.getInstance().navigate({
          routerName: ROUTER_NAME.Notification.name,
        });
        break;
      default:
        break;
    }
  };
  renderItem = params => {
    myLog('---renderItem--->', this.props);
    const {item, index} = params;
    const {
      timeFormat,
      themeColor,
      frequencyValue,
      dataSource,
      unitTemp,
      unitDistance,
      unitPressure,
      unitRainSnow,
      unitWindSpeed,
      t,
    } = this.props;
    let txtRight = item.txtRight || '';
    if (!item.txtRight) {
      switch (item.key) {
        case itemKey.frequency:
          txtRight = DEFINE_UNIT_FREQUENCY[frequencyValue]
            ? DEFINE_UNIT_FREQUENCY[frequencyValue].label
            : '';
          break;
        case itemKey.provider:
          txtRight = DEFINE_DATA_SOURCE[dataSource]
            ? DEFINE_DATA_SOURCE[dataSource].label
            : '';
          break;
        case itemKey.time:
          txtRight = DEFINE_TIME_FORMAT[timeFormat]
            ? DEFINE_TIME_FORMAT[timeFormat].label
            : '';
          break;
        case itemKey.theme:
          txtRight = DEFINE_THEME_COLOR[themeColor]
            ? DEFINE_THEME_COLOR[themeColor].label
            : '';
          break;
        case itemKey.unit:
          const labelTemp = DEFINE_UNITS_TEMP[unitTemp]
            ? DEFINE_UNITS_TEMP[unitTemp].label
            : '';
          const labelRain = DEFINE_UNITS_RAIN_SNOW[unitRainSnow]
            ? DEFINE_UNITS_RAIN_SNOW[unitRainSnow].label
            : '';
          const labelDistance = DEFINE_UNITS_DISTANCE[unitDistance]
            ? DEFINE_UNITS_DISTANCE[unitDistance].label
            : '';
          const labelWindSpeed = DEFINE_UNITS_WIND_SPEED[unitWindSpeed]
            ? DEFINE_UNITS_WIND_SPEED[unitWindSpeed].label
            : '';
          const labelPressure = DEFINE_UNITS_PRESSURE[unitPressure]
            ? DEFINE_UNITS_PRESSURE[unitPressure].label
            : '';
          txtRight = [
            labelTemp,
            labelRain,
            labelDistance,
            labelWindSpeed,
            labelPressure,
          ].join(', ');
          break;
        default:
          break;
      }
    }
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
              {item.languageKey ? (
                <CustomText
                  size={32}
                  numberOfLines={1}
                  style={labelStyle}
                  color={Colors.air_quality_text}>
                  {t(item.languageKey)}
                </CustomText>
              ) : item.label ? (
                <CustomText
                  size={32}
                  numberOfLines={1}
                  style={labelStyle}
                  color={Colors.air_quality_text}>
                  {item.label}
                </CustomText>
              ) : null}
              {item.isUp ? (
                <IconUpSvg width={normalize(16)} height={normalize(16)} />
              ) : null}
            </View>
            <View style={styles.wrapRightItem}>
              {txtRight ? (
                <CustomText
                  size={28}
                  style={{marginRight: normalize(33)}}
                  numberOfLines={1}
                  color="#AAAAAA">
                  {txtRight}
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
          <TouchablePlatform
            style={{marginLeft: normalize(30)}}
            onPress={() => {
              NavigationService.getInstance().goBack();
            }}>
            <IconHeaderBackSvg
              width={normalize(18.36)}
              height={normalize(34)}
            />
          </TouchablePlatform>
          <View
            style={{
              width: widthDevice,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: paddingTopHeader,
            }}>
            <CustomText
              style={
                {
                  // marginLeft: -normalize(60),
                }
              }
              color="#fff"
              semiBold
              size={36}>
              Settings
            </CustomText>
          </View>
          <View />
        </View>
      </View>
    );
  };
  changeValueOption = ({key, option}) => {
    switch (key) {
      case modalKey.theme:
        this.setState({
          valueThemeColor: option.value,
        });
        break;
      case modalKey.time:
        this.setState({
          valueTimeFormat: option.value,
        });
        break;
      default:
        break;
    }
  };
  renderModalBottom = ({
    title = '',
    options = [],
    onCancel = () => {},
    onOk = () => {},
    key = null,
  }) => {
    return (
      <View style={styles.wrapContentModal}>
        <View style={styles.wrapTopModal}>
          <View style={styles.wrapTitleModal}>
            <CustomText semiBold size={36} color={Colors.air_quality_text}>
              {title}
            </CustomText>
          </View>
          {options.map((option, idx) => {
            const {valueThemeColor, valueTimeFormat} = this.state;
            let IconFinal = IconUnChoiceSvg;
            switch (key) {
              case modalKey.theme:
                IconFinal =
                  valueThemeColor === option.value
                    ? IconChoiceSvg
                    : IconUnChoiceSvg;
                break;
              case modalKey.time:
                IconFinal =
                  valueTimeFormat === option.value
                    ? IconChoiceSvg
                    : IconUnChoiceSvg;
                break;
              default:
                break;
            }
            const styleWrapTouch = {
              borderBottomColor: Colors.borderRgb,
              borderBottomWidth: idx === options.length - 1 ? 0 : 1,
            };
            return (
              <View key={idx} style={styles.wrapOption}>
                <View style={styleWrapTouch}>
                  <TouchablePlatform
                    onPress={() => {
                      this.changeValueOption({key, option});
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingVertical: normalize(40),
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <IconFinal width={normalize(40)} height={normalize(40)} />
                      <CustomText
                        size={32}
                        medium
                        style={{marginLeft: normalize(40)}}
                        color={Colors.air_quality_text}>
                        {option.label}
                      </CustomText>
                    </View>
                    <CustomText size={32} color={Colors.air_quality_text}>
                      {option.txtRight || ''}
                    </CustomText>
                  </TouchablePlatform>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.wrapTouch}>
          <TouchablePlatform
            onPress={() => {
              onCancel && onCancel();
            }}
            style={styles.touchBottom}>
            <CustomText
              semiBold
              size={textSizeBottom}
              color={Colors.viewDetail}>
              Cancel
            </CustomText>
          </TouchablePlatform>
          <View
            style={{
              width: 1,
              height: normalize(53),
              backgroundColor: '#E9EAEE',
            }}
          />
          <TouchablePlatform
            onPress={() => {
              onOk && onOk();
            }}
            style={styles.touchBottom}>
            <CustomText
              semiBold
              size={textSizeBottom}
              color={Colors.viewDetail}>
              Done
            </CustomText>
          </TouchablePlatform>
        </View>
      </View>
    );
  };
  onPressOk = ({key}) => {
    const {valueThemeColor, valueTimeFormat} = this.state;
    const {
      themeColor,
      timeFormat,
      changeValueThemeColor,
      changeValueTimeFormat,
    } = this.props;
    switch (key) {
      case modalKey.theme:
        if (themeColor !== valueThemeColor) {
          changeValueThemeColor(valueThemeColor);
          this.setState({
            isVisibleModalTheme: false,
          });
        }
        break;
      case modalKey.time:
        if (timeFormat !== valueTimeFormat) {
          changeValueTimeFormat(valueTimeFormat);
          this.setState({
            isVisibleModalTime: false,
          });
        }
        break;
      default:
        break;
    }
  };
  renderContent() {
    const {isVisibleModalTime, isVisibleModalTheme} = this.state;
    myLog('---renderContent--->', this.props);
    const {timeFormat, themeColor} = this.props;
    return (
      <View
        style={{
          backgroundColor: Colors.white,
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
            onCancel: () =>
              this.setState({
                isVisibleModalTime: false,
                valueTimeFormat: timeFormat,
              }),
            onOk: () => {
              this.onPressOk({key: modalKey.time});
            },
            title: 'Time Format',
            options: Object.values(DEFINE_TIME_FORMAT),
            key: modalKey.time,
          })}
        </Modal>
        <Modal
          isVisible={isVisibleModalTheme}
          style={{justifyContent: 'flex-end'}}
          onBackdropPress={() => this.setState({isVisibleModalTheme: false})}>
          {this.renderModalBottom({
            onCancel: () =>
              this.setState({
                isVisibleModalTheme: false,
                valueThemeColor: themeColor,
              }),
            onOk: () => {
              this.onPressOk({key: modalKey.theme});
            },
            title: 'Theme Color',
            options: Object.values(DEFINE_THEME_COLOR),
            key: modalKey.theme,
          })}
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    frequencyValue: getStateForKeys(state, ['Setting', 'frequencyValue']),
    unitTemp: getStateForKeys(state, ['Setting', 'unitTemp']),
    unitRainSnow: getStateForKeys(state, ['Setting', 'unitRainSnow']),
    unitDistance: getStateForKeys(state, ['Setting', 'unitDistance']),
    unitWindSpeed: getStateForKeys(state, ['Setting', 'unitWindSpeed']),
    unitPressure: getStateForKeys(state, ['Setting', 'unitPressure']),
    timeFormat: getStateForKeys(state, ['Setting', 'timeFormat']),
    themeColor: getStateForKeys(state, ['Setting', 'themeColor']),
    dataSource: getStateForKeys(state, ['Setting', 'dataSource']),
    layout: getStateForKeys(state, ['Setting', 'layout']),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeValueTimeFormat: value => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          timeFormat: value,
          subKey: NORMAL_TYPE.CHANGE_VALUE_TIME_FORMAT,
        }),
      );
    },
    changeValueThemeColor: value => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          themeColor: value,
          subKey: NORMAL_TYPE.CHANGE_VALUE_THEME_COLOR,
        }),
      );
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withI18n(SettingScreen));
