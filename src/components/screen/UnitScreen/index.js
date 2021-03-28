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
import {STATUS_BAR_HEIGHT, widthDevice} from '../../../utils/DeviceUtil';
import CustomText from '../../common/Text';
import {Header} from '../Header';

const borderRadiusBtn = 10;
const paddingHorizontalItem = 15;
const styles = StyleSheet.create({
  containerItem: {
    paddingLeft: paddingHorizontalItem,
  },
  wrapTouchItem: {
    paddingVertical: 12,
    flexDirection: 'row',
  },
  touchItem: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  labelItem: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

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
    this.listTime = [
      {
        label: 'Temperature',
        icon: IconTempSvg,
        key: 'temp',
        buttons: [
          {
            label: '℃',
            icon: IconCSvg,
            value: 'c',
          },
          {
            label: '℉',
            icon: IconFSvg,
            value: 'f',
          },
        ],
      },
      {
        label: 'Rain, Snow',
        icon: IconRainSvg,
        key: 'rain',
        buttons: [
          {
            label: 'mm',
            value: 'mm',
          },
          {
            label: 'in',
            value: 'in',
          },
        ],
      },
      {
        label: 'Distance',
        icon: IconDistanceSvg,
        key: 'distance',
        buttons: [
          {
            label: 'mi',
            value: 'mi',
          },
          {
            label: 'km',
            value: 'km',
          },
        ],
      },
      {
        label: 'Wind speed',
        icon: IconWindSvg,
        key: 'windSpeed',
        buttons: [
          {
            label: 'mph',
            value: 'mph',
          },
          {
            label: 'kph',
            value: 'kph',
          },
          {
            label: 'km/h',
            value: 'km/h',
          },
          {
            label: 'm/s',
            value: 'm/s',
          },
        ],
      },
      {
        label: 'Pressure',
        icon: IconPressureSvg,
        key: 'pressure',
        buttons: [
          {
            label: 'mBar',
            value: 'mBar',
          },
          {
            label: 'inHg',
            value: 'inHg',
          },
          {
            label: 'psi',
            value: 'psi',
          },
          {
            label: 'mmHg',
            value: 'mmHg',
          },
        ],
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
    const IconLeft = item.icon;
    const {dataChoice} = this.state;
    return (
      <View key={index} style={styles.containerItem}>
        <View style={styles.wrapTouchItem}>
          <View
            onPress={() => {
              this.onPressItem(item);
            }}
            style={styles.touchItem}>
            <IconLeft width={25} height={25} />
          </View>
          <View
            style={{
              marginLeft: paddingHorizontalItem,
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#DADCE3',
              flex: 1,
            }}>
            <View style={{}}>
              <CustomText style={styles.labelItem} color="#404040">
                {item.label}
              </CustomText>
              <View style={{flexDirection: 'row'}}>
                {item.buttons.map((btn, index) => {
                  const IconBtn = btn.icon;
                  const isChoiced = dataChoice[item.key] === btn.value;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        this.setState({
                          dataChoice: {
                            ...dataChoice,
                            [item.key]: btn.value,
                          },
                        });
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
                        borderColor: isChoiced ? '#094FB9' : '#DADCE3',
                        backgroundColor: isChoiced ? '#094FB9' : '#F5F6FA',
                        width: 70,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      key={index}>
                      <CustomText color={isChoiced ? '#ffffff' : '#808080'}>
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
          data={this.listTime}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default UnitScreen;
