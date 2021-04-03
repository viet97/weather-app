import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import BaseScreen from '../BaseScreen';
import IconChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_choice.svg';
import IconNoChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_nochoice.svg';
import IconTempSvg from '../../../../assets/SVGIcon/view-unit/icon_temp.svg';
import IconRainSvg from '../../../../assets/SVGIcon/view-unit/icon_rain.svg';
import IconDistanceSvg from '../../../../assets/SVGIcon/view-unit/icon_distance.svg';
import IconWindSvg from '../../../../assets/SVGIcon/view-unit/icon_wind.svg';
import IconPressureSvg from '../../../../assets/SVGIcon/view-unit/icon_pressure.svg';
import IconCSvg from '../../../../assets/SVGIcon/view-unit/icon_c.svg';
import IconFSvg from '../../../../assets/SVGIcon/view-unit/icon_f.svg';
import {
  normalize,
  STATUS_BAR_HEIGHT,
  widthDevice,
} from '../../../utils/DeviceUtil';
import CustomText from '../../common/Text';
import {Header} from '../Header';
import {getStateForKeys, temperatureC, temperatureF} from '../../../utils/Util';
import {Colors} from '../../../themes/Colors';
import {NORMAL_TYPE} from '../../../actions/ActionTypes';
import {connect} from 'react-redux';
import {
  DEFINE_UNITS_DISTANCE,
  DEFINE_UNITS_PRESSURE,
  DEFINE_UNITS_RAIN_SNOW,
  DEFINE_UNITS_TEMP,
  DEFINE_UNITS_WIND_SPEED,
} from '../../../Define';
import SettingAction from '../../../actions/SettingAction';

const borderRadiusBtn = normalize(16);
const paddingHorizontalItem = normalize(30);
const styles = StyleSheet.create({
  containerItem: {
    paddingLeft: paddingHorizontalItem,
  },
  wrapTouchItem: {
    paddingTop: normalize(45),
    flexDirection: 'row',
  },
  touchItem: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  labelItem: {
    marginBottom: normalize(24),
  },
});

const itemKey = {
  temp: 'temp',
  rain: 'rain',
  distance: 'distance',
  windSpeed: 'windSpeed',
  pressure: 'pressure',
};
class UnitScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      value: 'eng',
      dataChoice: {
        temp: 'c',
        rain: 'mm',
        distance: 'mi',
        windSpeed: 'm/s',
        pressure: 'mmHg',
      },
    };
    this.listItem = [
      {
        label: 'Temperature',
        icon: IconTempSvg,
        key: itemKey.temp,
        iconSize: {
          width: normalize(29.28),
          height: normalize(57),
        },
        buttons: [
          {
            label: DEFINE_UNITS_TEMP.c.label,
            icon: IconCSvg,
            value: DEFINE_UNITS_TEMP.c.value,
          },
          {
            label: DEFINE_UNITS_TEMP.f.label,
            icon: IconFSvg,
            value: DEFINE_UNITS_TEMP.f.value,
          },
        ],
      },
      {
        label: 'Rain, Snow',
        icon: IconRainSvg,
        key: itemKey.rain,
        iconSize: {
          width: normalize(47.22),
          height: normalize(57.43),
        },
        buttons: [
          {
            label: DEFINE_UNITS_RAIN_SNOW.mm.label,
            value: DEFINE_UNITS_RAIN_SNOW.mm.value,
          },
          {
            label: DEFINE_UNITS_RAIN_SNOW.in.label,
            value: DEFINE_UNITS_RAIN_SNOW.in.value,
          },
        ],
      },
      {
        label: 'Distance',
        icon: IconDistanceSvg,
        key: itemKey.distance,
        iconSize: {
          width: normalize(56.04),
          height: normalize(40.57),
        },
        buttons: [
          {
            label: DEFINE_UNITS_DISTANCE.mi.label,
            value: DEFINE_UNITS_DISTANCE.mi.value,
          },
          {
            label: DEFINE_UNITS_DISTANCE.km.label,
            value: DEFINE_UNITS_DISTANCE.km.value,
          },
        ],
      },
      {
        label: 'Wind speed',
        icon: IconWindSvg,
        key: itemKey.windSpeed,
        iconSize: {
          width: normalize(52),
          height: normalize(52),
        },
        buttons: [
          {
            label: DEFINE_UNITS_WIND_SPEED.mph.label,
            value: DEFINE_UNITS_WIND_SPEED.mph.value,
          },
          {
            label: DEFINE_UNITS_WIND_SPEED.kph.label,
            value: DEFINE_UNITS_WIND_SPEED.kph.value,
          },
          {
            label: DEFINE_UNITS_WIND_SPEED['km/h'].label,
            value: DEFINE_UNITS_WIND_SPEED['km/h'].value,
          },
          {
            label: DEFINE_UNITS_WIND_SPEED['m/s'].label,
            value: DEFINE_UNITS_WIND_SPEED['m/s'].value,
          },
        ],
      },
      {
        label: 'Pressure',
        icon: IconPressureSvg,
        key: itemKey.pressure,
        iconSize: {
          width: normalize(51),
          height: normalize(51),
        },
        buttons: [
          {
            label: DEFINE_UNITS_PRESSURE.mBar.label,
            value: DEFINE_UNITS_PRESSURE.mBar.value,
          },
          {
            label: DEFINE_UNITS_PRESSURE.inHg.label,
            value: DEFINE_UNITS_PRESSURE.inHg.value,
          },
          {
            label: DEFINE_UNITS_PRESSURE.psi.label,
            value: DEFINE_UNITS_PRESSURE.psi.value,
          },
          {
            label: DEFINE_UNITS_PRESSURE.mmHg.label,
            value: DEFINE_UNITS_PRESSURE.mmHg.value,
          },
        ],
      },
    ];
  }
  onPressItem = (item, btn) => {
    const {dataChoice} = this.state;
    const {
      unitTemp,
      unitRainSnow,
      unitDistance,
      unitWindSpeed,
      unitPressure,
      changeValueUnitTemp,
      changeValueUnitRainSnow,
      changeValueUnitDistance,
      changeValueUnitPressure,
      changeValueUnitWindSpeed,
    } = this.props;
    // this.setState({
    //   dataChoice: {
    //     ...dataChoice,
    //     [item.key]: btn.value,
    //   },
    // });
    switch (item.key) {
      case itemKey.temp:
        if (unitTemp !== btn.value) {
          changeValueUnitTemp(btn.value);
        }
        break;
      case itemKey.rain:
        if (unitRainSnow !== btn.value) {
          changeValueUnitRainSnow(btn.value);
        }
        break;
      case itemKey.distance:
        if (unitDistance !== btn.value) {
          changeValueUnitDistance(btn.value);
        }
        break;
      case itemKey.pressure:
        if (unitPressure !== btn.value) {
          changeValueUnitPressure(btn.value);
        }
        break;
      case itemKey.windSpeed:
        if (unitWindSpeed !== btn.value) {
          changeValueUnitWindSpeed(btn.value);
        }
        break;
      default:
        break;
    }
  };
  renderItem = params => {
    const {item, index} = params;
    const {value} = this.state;
    const IconLeft = item.icon;
    const {dataChoice} = this.state;
    const {
      unitTemp,
      unitRainSnow,
      unitDistance,
      unitWindSpeed,
      unitPressure,
      changeValueUnitTemp,
      changeValueUnitRainSnow,
      changeValueUnitDistance,
      changeValueUnitPressure,
      changeValueUnitWindSpeed,
    } = this.props;
    return (
      <View key={index} style={styles.containerItem}>
        <View style={styles.wrapTouchItem}>
          <View style={{marginTop: 0}}>
            <IconLeft {...item.iconSize} />
          </View>
          <View
            style={{
              marginLeft: paddingHorizontalItem,
              paddingBottom: normalize(45),
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(218, 220, 227, 0.5)',
              flex: 1,
            }}>
            <View>
              <CustomText
                includeFontPadding={true}
                size={32}
                style={styles.labelItem}
                color={Colors.air_quality_text}>
                {item.label}
              </CustomText>
              <View style={{flexDirection: 'row'}}>
                {item.buttons.map((btn, index) => {
                  const IconBtn = btn.icon;
                  {
                    /* const isChoiced = dataChoice[item.key] === btn.value; */
                  }
                  let isChoiced = false;
                  switch (item.key) {
                    case itemKey.temp:
                      isChoiced = unitTemp === btn.value;
                      break;
                    case itemKey.rain:
                      isChoiced = unitRainSnow === btn.value;
                      break;
                    case itemKey.distance:
                      isChoiced = unitDistance === btn.value;
                      break;
                    case itemKey.pressure:
                      isChoiced = unitPressure === btn.value;
                      break;
                    case itemKey.windSpeed:
                      isChoiced = unitWindSpeed === btn.value;
                      break;
                    default:
                      break;
                  }
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.onPressItem(item, btn);
                      }}
                      style={{
                        borderLeftWidth: index === 0 ? 1 : 0,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderTopLeftRadius: index === 0 ? borderRadiusBtn : 0,
                        borderBottomLeftRadius:
                          index === 0 ? borderRadiusBtn : 0,
                        borderTopRightRadius:
                          index === item.buttons.length - 1
                            ? borderRadiusBtn
                            : 0,
                        borderBottomRightRadius:
                          index === item.buttons.length - 1
                            ? borderRadiusBtn
                            : 0,
                        borderColor: isChoiced
                          ? Colors.viewDetail
                          : Colors.bgHeaderBottomModal,
                        backgroundColor: isChoiced
                          ? Colors.viewDetail
                          : Colors.backgroundGray,
                        width: normalize(120) + normalize(34),
                        height: normalize(74) + normalize(34),
                        // padding: normalize(34),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      key={index}>
                      <CustomText
                        size={32}
                        color={isChoiced ? Colors.white : Colors.textTitle}>
                        {btn.label}
                      </CustomText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
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
          width: widthDevice,
        }}>
        <Header title="Units" />
        <FlatList
          keyExtractor={(item, index) => item.key + index}
          data={this.listItem}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
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
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeValueUnitTemp: value => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          unit: value,
          subKey: NORMAL_TYPE.CHANGE_VALUE_UNIT_TEMP,
        }),
      );
    },
    changeValueUnitRainSnow: value => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          unit: value,
          subKey: NORMAL_TYPE.CHANGE_VALUE_UNIT_RAIN,
        }),
      );
    },
    changeValueUnitDistance: value => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          unit: value,
          subKey: NORMAL_TYPE.CHANGE_VALUE_UNIT_DISTANCE,
        }),
      );
    },
    changeValueUnitWindSpeed: value => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          unit: value,
          subKey: NORMAL_TYPE.CHANGE_VALUE_UNIT_WIND,
        }),
      );
    },
    changeValueUnitPressure: value => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          unit: value,
          subKey: NORMAL_TYPE.CHANGE_VALUE_UNIT_PRESSURE,
        }),
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitScreen);
