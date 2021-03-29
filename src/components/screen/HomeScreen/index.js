import React from 'react';
import {ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Colors} from '../../../themes/Colors';
import {getStatusBarHeight} from '../../../utils/DeviceUtil';
import SVGIcon from '../../../../assets/SVGIcon';
import {Text} from '../../common';
import BaseScreen from '../BaseScreen';
import {TouchablePlatform} from '../../../modules/TouchablePlatform';
import {LineChartCustom, BarChartCustom} from '../../element';

const exampleData = [15, 21, 23, 12, 24, 28, 29];
export default class HomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      currentIndexLineChart: 0,
      currentIndexBarChart: 0,
    };
    this.displayName = 'HomeScreen';
    this.listLineChart = [
      {
        title: 'Temp',
        unit: 'oC',
        data: exampleData,
        dotColor: Colors.tempDotColor,
        lineColor: Colors.tempLineColor,
        renderBottomLabel: () => {},
      },
      {
        title: 'Rain',
        unit: 'mm',
        data: exampleData,
        dotColor: Colors.rainDotColor,
        lineColor: Colors.rainLineColor,
        renderBottomLabel: () => {},
      },
      {
        title: 'Wind',
        unit: 'Km/h',
        data: exampleData,
        dotColor: Colors.windDotColor,
        lineColor: Colors.windLineColor,
        renderBottomLabel: () => {},
      },
      {
        title: 'Pressure',
        unit: 'mb',
        data: exampleData,
        dotColor: Colors.pressureDotColor,
        lineColor: Colors.pressureLineColor,
        renderBottomLabel: () => {},
      },
    ];
    this.listBarChart = [
      {
        title: 'Snow',
        unit: 'mm',
        data: exampleData,
        renderContentBar: ({value, ratio}) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Text size={13} style={{alignSelf: 'center', marginBottom: 4}}>
                {value}
              </Text>
              <LinearGradient
                start={{x: 0, y: 0.1}}
                end={{x: 0, y: 1.0}}
                colors={['#89D378', '#EAF7E6']}
                style={{flex: ratio}}
              />
            </View>
          );
        },
        renderBottomLabel: () => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                marginTop: 16,
              }}>
              <SVGIcon.cloudy width={30} height={30} />
              <Text size={12} style={{marginTop: 4}}>
                Mon 01
              </Text>
            </View>
          );
        },
      },
      {
        title: 'Wind',
        unit: 'Km/h',
        data: exampleData,
        renderContentBar: ({value, ratio}) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Text size={13} style={{alignSelf: 'center', marginBottom: 4}}>
                {value}
              </Text>
              <LinearGradient
                start={{x: 0, y: 0.1}}
                end={{x: 0, y: 1.0}}
                colors={['#89D378', '#EAF7E6']}
                style={{flex: ratio}}
              />
            </View>
          );
        },
        renderBottomLabel: () => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                marginTop: 16,
              }}>
              <SVGIcon.wind_direction width={30} height={30} />
              <Text size={12} style={{marginTop: 4}}>
                Mon 01
              </Text>
            </View>
          );
        },
      },
      {
        title: 'Pressure',
        unit: 'mb',
        data: exampleData,
        renderContentBar: ({value, ratio}) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <Text size={13} style={{alignSelf: 'center', marginBottom: 4}}>
                {value}
              </Text>
              <LinearGradient
                start={{x: 0, y: 0.1}}
                end={{x: 0, y: 1.0}}
                colors={['#9C94ED', '#F4F4FD']}
                style={{flex: ratio}}
              />
            </View>
          );
        },
        renderBottomLabel: () => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                marginTop: 16,
              }}>
              <SVGIcon.cloudy width={30} height={30} />
              <Text size={12} style={{marginTop: 4}}>
                Mon 01
              </Text>
            </View>
          );
        },
      },
    ];
  }

  renderHeaderSection = ({title, onPressDetail}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SVGIcon.header_left width={12} height={40} />
          <Text size={20} semiBold style={{marginLeft: 8, color: Colors.black}}>
            {title}
          </Text>
        </View>
        <TouchablePlatform
          style={{padding: 16}}
          onPress={() => onPressDetail && onPressDetail()}>
          <Text size={15} style={{color: Colors.viewDetail}} semiBold>
            View detail →
          </Text>
        </TouchablePlatform>
      </View>
    );
  };

  renderLineChart = () => {
    const {currentIndexLineChart} = this.state;
    const currentLineChartProps = this.listLineChart[currentIndexLineChart];
    return (
      <LineChartCustom
        style={{marginTop: 64}}
        chartHeight={150}
        {...currentLineChartProps}
      />
    );
  };

  renderHourlyChart = () => {
    const {currentIndexLineChart} = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginTop: 16,
          paddingVertical: 16,
        }}>
        {this.renderHeaderSection({title: 'Hourly'})}
        <ScrollView
          bounces={false}
          horizontal
          style={{marginTop: 8}}
          contentContainerStyle={{
            paddingLeft: 22,
          }}
          showsHorizontalScrollIndicator={false}>
          {this.listLineChart.map((it, index) => {
            const isFocus = currentIndexLineChart === index;
            return (
              <TouchablePlatform
                onPress={() => {
                  this.setStateSafe({currentIndexLineChart: index});
                }}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  borderColor: Colors.border,
                  borderWidth: 1,
                  marginRight: index !== this.listLineChart.length - 1 ? 8 : 0,
                  backgroundColor: isFocus
                    ? Colors.activeTitleLineChart
                    : Colors.white,
                }}>
                <Text
                  size={13}
                  medium
                  style={{color: isFocus ? Colors.white : Colors.textTitle}}>
                  {it.title}
                  <Text size={13} light>
                    {' '}
                    {it.unit}
                  </Text>
                </Text>
              </TouchablePlatform>
            );
          })}
        </ScrollView>
        {this.renderLineChart()}
      </View>
    );
  };

  renderBarChart = () => {
    const {currentIndexBarChart} = this.state;
    const currentBarChartProps = this.listBarChart[currentIndexBarChart];
    return <BarChartCustom style={{marginTop: 24}} {...currentBarChartProps} />;
  };

  renderDailyChart = () => {
    const {currentIndexBarChart} = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginTop: 16,
          paddingVertical: 16,
        }}>
        {this.renderHeaderSection({title: 'Daily'})}
        <ScrollView
          bounces={false}
          horizontal
          style={{marginTop: 8}}
          contentContainerStyle={{
            paddingLeft: 22,
          }}
          showsHorizontalScrollIndicator={false}>
          {this.listBarChart.map((it, index) => {
            const isFocus = currentIndexBarChart === index;
            return (
              <TouchablePlatform
                onPress={() => {
                  this.setStateSafe({currentIndexBarChart: index});
                }}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  borderColor: Colors.border,
                  borderWidth: 1,
                  marginRight: index !== this.listLineChart.length - 1 ? 8 : 0,
                  backgroundColor: isFocus
                    ? Colors.activeTitleLineChart
                    : Colors.white,
                }}>
                <Text
                  size={13}
                  medium
                  style={{color: isFocus ? Colors.white : Colors.textTitle}}>
                  {it.title}
                  <Text size={13} light>
                    {' '}
                    {it.unit}
                  </Text>
                </Text>
              </TouchablePlatform>
            );
          })}
        </ScrollView>
        {this.renderBarChart()}
      </View>
    );
  };

  renderContent() {
    return (
      <View style={{flex: 1, paddingTop: getStatusBarHeight()}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, backgroundColor: Colors.backgroundHome}}>
          {this.renderHourlyChart()}
          {this.renderDailyChart()}
        </ScrollView>
      </View>
    );
  }
}
