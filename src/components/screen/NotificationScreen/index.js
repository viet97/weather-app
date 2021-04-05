import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import BaseScreen from '../BaseScreen';
import IconChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_choice.svg';
import IconNoChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_nochoice.svg';
import IconSwitchDisableSvg from '../../../../assets/SVGIcon/view-notification/icon_switch_disabled.svg';
import IconSwitchEnableSvg from '../../../../assets/SVGIcon/view-notification/icon_switch_enable.svg';
import IconClockSvg from '../../../../assets/SVGIcon/view-notification/icon_clock';
import IconWeatherSvg from '../../../../assets/SVGIcon/view-notification/icon_weather.svg';
import {
  normalize,
  STATUS_BAR_HEIGHT,
  widthDevice,
} from '../../../utils/DeviceUtil';
import CustomText from '../../common/Text';
import {Header} from '../Header';
import {Colors} from '../../../themes/Colors';
import {TouchablePlatform} from '../../../modules/TouchablePlatform';
import {Images} from '../../../themes/Images';
import {getStateForKeys, temperatureC} from '../../../utils/Util';
import {DEFINE_NOTIFICATION} from '../../../Define';
import {connect} from 'react-redux';
import SettingAction from '../../../actions/SettingAction';
import {NORMAL_TYPE} from '../../../actions/ActionTypes';

const itemKey = {
  daily: 'daily',
  severe: 'severe',
  rain: 'rain',
};
const sizeOfIconRightItem = {
  width: normalize(68.57),
  height: normalize(40),
};
const paddingHorizontalItem = normalize(30);
const paddingVerticalItem = normalize(40);
const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: paddingHorizontalItem,
  },
  wrapTouchItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderRgb,
    paddingVertical: paddingVerticalItem,
  },
  touchItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelItem: {
    marginLeft: paddingHorizontalItem,
  },
});
const ItemListSetting = props => {
  const {
    onPressItem = () => {},
    item,
    value,
    iconLeft = null,
    iconRight = null,
    customStyle = {},
    renderExtraView,
  } = props;
  return (
    <View style={[styles.containerItem, customStyle]}>
      <View
        style={[
          styles.wrapTouchItem,
          renderExtraView ? {borderBottomWidth: 0} : {},
        ]}>
        <View
          onPress={() => {
            onPressItem(item);
          }}
          style={[
            styles.touchItem,
            iconRight ? {justifyContent: 'space-between'} : {},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {iconLeft || iconLeft === null ? (
              iconLeft
            ) : value === item.value ? (
              <IconChoiceSvg width={normalize(44)} height={normalize(44)} />
            ) : (
              <IconNoChoiceSvg width={normalize(44)} height={normalize(44)} />
            )}
            <View>
              <CustomText
                semiBold
                size={36}
                style={iconLeft ? styles.labelItem : {}}
                color={Colors.air_quality_text}>
                {item.label}
              </CustomText>
              {item.sub ? (
                <CustomText
                  size={28}
                  style={iconLeft ? [styles.labelItem] : {marginTop: 5}}
                  color={Colors.textTitle}>
                  {item.sub}
                </CustomText>
              ) : null}
            </View>
          </View>
          {iconRight ? iconRight : null}
        </View>
      </View>
      {renderExtraView ? renderExtraView() : null}
    </View>
  );
};
class NotificationScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {};
    this.listNotification = [
      {
        label: DEFINE_NOTIFICATION.daily.label,
        key: DEFINE_NOTIFICATION.daily.value,
        keyStore: 'dailyNotification',
      },
      {
        label: DEFINE_NOTIFICATION.severe.label,
        key: DEFINE_NOTIFICATION.severe.value,
        keyStore: 'severeAlert',
      },
      {
        label: DEFINE_NOTIFICATION.rain.label,
        key: DEFINE_NOTIFICATION.rain.value,
        keyStore: 'alarmRainAndSnow',
        sub: 'Alerts you when rain, snow is approaching',
      },
    ];
  }
  onPressItem = item => {
    const {
      changeValueDailyNotification,
      changeValueSevereAlert,
      changeValueNotiRainSnow,
      dailyNotification,
      severeAlert,
      alarmRainAndSnow,
    } = this.props;
    switch (item.key) {
      case DEFINE_NOTIFICATION.daily.value:
        changeValueDailyNotification(Number(dailyNotification) === 1 ? 0 : 1);
        break;
      case DEFINE_NOTIFICATION.severe.value:
        changeValueSevereAlert(Number(severeAlert) === 1 ? 0 : 1);
        break;
      case DEFINE_NOTIFICATION.rain.value:
        changeValueNotiRainSnow(Number(alarmRainAndSnow) === 1 ? 0 : 1);
        break;
      default:
        break;
    }
  };
  renderItem = params => {
    const {item, index} = params;
    const {value} = this.state;
    const {dailyNotification, severeAlert, alarmRainAndSnow} = this.props;
    switch (item.key) {
      case DEFINE_NOTIFICATION.daily.value:
        return (
          <View key={index}>
            <ItemListSetting
              onPressItem={() => this.onPressItem(item)}
              item={item}
              value={this.props[item.keyStore]}
              iconRight={
                <TouchablePlatform
                  onPress={() => {
                    this.onPressItem(item);
                  }}>
                  {Number(this.props[item.keyStore]) === 0 ||
                  !this.props[item.keyStore] ? (
                    <IconSwitchDisableSvg {...sizeOfIconRightItem} />
                  ) : (
                    <IconSwitchEnableSvg {...sizeOfIconRightItem} />
                  )}
                </TouchablePlatform>
              }
              iconLeft={null}
              renderExtraView={() => {
                return (
                  <View>
                    <TouchablePlatform
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: Colors.backgroundGray,
                        paddingVertical: normalize(28),
                        paddingHorizontal: normalize(30),
                        borderRadius: normalize(20),
                        marginBottom: normalize(30),
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <IconClockSvg
                          width={normalize(36)}
                          height={normalize(34.61)}
                        />
                        <CustomText
                          color={Colors.air_quality_text}
                          style={{marginLeft: normalize(20)}}
                          size={32}>
                          Receive Time
                        </CustomText>
                      </View>
                      <CustomText color={Colors.air_quality_text} size={32}>
                        7:00
                      </CustomText>
                    </TouchablePlatform>
                    <ImageBackground
                      source={Images.assets.bg_review_noti.source}
                      style={{
                        width: widthDevice,
                        marginLeft: -paddingHorizontalItem,
                        height:
                          widthDevice *
                          (1 / Images.assets.bg_review_noti.ratio),
                        paddingHorizontal: paddingHorizontalItem,
                        paddingVertical: paddingVerticalItem,
                      }}>
                      <View
                        style={{
                          borderRadius: normalize(26),
                          backgroundColor: Colors.backgroundGray85,
                          width: widthDevice - 2 * paddingHorizontalItem,
                          height:
                            widthDevice *
                              (1 / Images.assets.bg_review_noti.ratio) -
                            2 * paddingVerticalItem,
                          flexDirection: 'row',
                          //   alignItems: 'center',
                          paddingHorizontal: normalize(20),
                          paddingVertical: normalize(20),
                        }}>
                        <IconWeatherSvg
                          width={normalize(80)}
                          height={normalize(80)}
                        />
                        <View style={{marginLeft: normalize(20)}}>
                          <CustomText
                            color={Colors.text_color1}
                            style={{marginBottom: normalize(10)}}
                            size={30}>
                            Partly Cloudy
                          </CustomText>
                          <CustomText
                            color={Colors.text_color1}
                            style={{marginBottom: normalize(10)}}
                            size={30}>
                            26o / 24o Overcast
                          </CustomText>
                          <CustomText color={Colors.air_quality_text} size={28}>
                            Rain 0.1mm/d, sat 20, Tan Binh, HCMC
                          </CustomText>
                        </View>
                        <View
                          style={{
                            position: 'absolute',
                            right: normalize(20),
                            top: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <CustomText color={Colors.text_color1} size={68} thin>
                            {36}
                          </CustomText>
                          <CustomText
                            color={Colors.text_color1}
                            style={{
                              marginTop: -5,
                            }}
                            size={42}
                            light>
                            {temperatureC}
                          </CustomText>
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
                );
              }}
            />
          </View>
        );
      default:
        let itemFormat = {...item};
        if (!item.sub) {
          itemFormat.sub =
            Number(this.props[item.keyStore]) === 0 ? 'Off' : 'On';
        }
        return (
          <ItemListSetting
            onPressItem={this.onPressItem}
            key={index}
            item={itemFormat}
            value={this.props[item.keyStore]}
            iconRight={
              <TouchablePlatform
                onPress={() => {
                  this.onPressItem(item);
                }}>
                {Number(this.props[item.keyStore]) === 0 ? (
                  <IconSwitchDisableSvg {...sizeOfIconRightItem} />
                ) : (
                  <IconSwitchEnableSvg {...sizeOfIconRightItem} />
                )}
              </TouchablePlatform>
            }
            iconLeft={null}
          />
        );
    }
  };
  renderContent() {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          flex: 1,
          width: widthDevice,
        }}>
        <Header title="Notification" />
        <FlatList
          keyExtractor={(item, index) => item.key + index}
          data={this.listNotification}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dailyNotification: getStateForKeys(state, ['Setting', 'dailyNotification']),
    severeAlert: getStateForKeys(state, ['Setting', 'severeAlert']),
    alarmRainAndSnow: getStateForKeys(state, ['Setting', 'alarmRainAndSnow']),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeValueDailyNotification: value => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          dailyNotification: value,
          subKey: NORMAL_TYPE.CHANGE_VALUE_DAILY_NOTIFICATION,
        }),
      );
    },
    changeValueNotiRainSnow: value => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          alarmRainAndSnow: value,
          subKey: NORMAL_TYPE.CHANGE_VALUE_NOTI_RAIN_SNOW,
        }),
      );
    },
    changeValueSevereAlert: value => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          severeAlert: value,
          subKey: NORMAL_TYPE.CHANGE_VALUE_SEVERE_ALERT,
        }),
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
