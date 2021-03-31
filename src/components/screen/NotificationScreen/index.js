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
import {temperatureC} from '../../../utils/Util';

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
export const ItemListSetting = props => {
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
    this.state = {
      value: 'eng',
    };
    this.listTime = [
      {
        label: 'Daily Notification',
        value: 1,
        sub: 'On',
        key: 'daily',
      },
      {
        label: 'Severe Alerts',
        value: 0,
        sub: 'Off',
        key: 'severe',
      },
      {
        label: 'Rain & Snow Alarm',
        value: 1,
        sub: 'Alerts you when rain, snow is approaching',
        key: 'rain',
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
    switch (item.key) {
      case 'daily':
        return (
          <View key={index}>
            <ItemListSetting
              onPressItem={this.onPressItem}
              item={item}
              value={value}
              iconRight={
                <TouchablePlatform>
                  {item.value === 0 ? (
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
                          style={{marginLeft: normalize(20)}}
                          size={32}>
                          Receive Time
                        </CustomText>
                      </View>
                      <CustomText size={32}>7:00</CustomText>
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
                          backgroundColor: Colors.backgroundGray80,
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
                            style={{marginBottom: normalize(10)}}
                            size={30}>
                            Partly Cloudy
                          </CustomText>
                          <CustomText
                            style={{marginBottom: normalize(10)}}
                            size={30}>
                            26o / 24o Overcast
                          </CustomText>
                          <CustomText size={28}>
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
                          <CustomText size={68} thin>
                            {36}
                          </CustomText>
                          <CustomText
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
        return (
          <ItemListSetting
            onPressItem={this.onPressItem}
            key={index}
            item={item}
            value={value}
            iconRight={
              <TouchablePlatform>
                {item.value === 0 ? (
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
          data={this.listTime}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default NotificationScreen;
