import React from 'react';
import {ScrollView, View, StyleSheet, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Colors} from '../../../themes/Colors';
import {
  getStatusBarHeight,
  heightDevice,
  normalize,
  widthDevice,
} from '../../../utils/DeviceUtil';
import SVGIcon from '../../../../assets/SVGIcon';
import {Text} from '../../common';
import BaseScreen from '../BaseScreen';
import {TouchablePlatform} from '../../../modules/TouchablePlatform';
import {LineChartCustom, BarChartCustom} from '../../element';
import {Images} from '../../../themes/Images';
import {TYPE_IMAGE_RESIZE_MODE} from '../../common/Image';
import NavigationService from '../../../navigation/NavigationService';

const exampleData = [15, 21, 23, 12, 24, 28, 29];
const renderBottomLabel = () => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    }}>
    <SVGIcon.cloudy width={30} height={30} />
    <Text size={24} style={{marginTop: 4, color: Colors.textTitle}}>
      Mon 01
    </Text>
  </View>
);
export default class HomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      currentIndexLineChart: 0,
      currentIndexBarChart: 0,
    };
    this.displayName = 'HomeScreen';

    this.listQualityIndex = [
      {
        status: 'Good',
        color: 'green',
        value: 50,
      },
      {
        status: 'Normal',
        color: 'yellow',
        value: 100,
      },
      {
        status: 'Unsafe',
        color: 'red',
        value: 500,
      },
    ];

    this.totalAirQualityValue = this.listQualityIndex
      .map(it => it.value)
      .reduce((total = 0, quality) => {
        return total + quality;
      });

    this.listLineChart = [
      {
        title: 'Temp',
        unit: 'oC',
        data: exampleData,
        dotColor: Colors.tempDotColor,
        lineColor: Colors.tempLineColor,
        renderBottomLabel,
      },
      {
        title: 'Rain',
        unit: 'mm',
        data: exampleData,
        dotColor: Colors.rainDotColor,
        lineColor: Colors.rainLineColor,
        renderBottomLabel,
      },
      {
        title: 'Wind',
        unit: 'Km/h',
        data: exampleData,
        dotColor: Colors.windDotColor,
        lineColor: Colors.windLineColor,
        renderBottomLabel,
      },
      {
        title: 'Pressure',
        unit: 'mb',
        data: exampleData,
        dotColor: Colors.pressureDotColor,
        lineColor: Colors.pressureLineColor,
        renderBottomLabel,
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
              <Text
                size={28}
                light
                style={{alignSelf: 'center', marginBottom: 4}}>
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
              <Text size={24} style={{marginTop: 4, color: Colors.textTitle}}>
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
              <Text
                size={28}
                light
                style={{alignSelf: 'center', marginBottom: 4}}>
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
              <Text size={24} style={{marginTop: 4, color: Colors.textTitle}}>
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
              <Text
                size={28}
                light
                style={{alignSelf: 'center', marginBottom: 4}}>
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
              <Text size={24} style={{marginTop: 4, color: Colors.textTitle}}>
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
      <View style={styles.headerSectionContainer}>
        <View style={styles.leftHeaderSection}>
          <SVGIcon.header_left width={normalize(14)} height={normalize(54)} />
          <Text size={42} semiBold style={styles.headerSectionTitle}>
            {title}
          </Text>
        </View>
        <TouchablePlatform
          style={styles.detailButton}
          onPress={() => onPressDetail && onPressDetail()}>
          <Text size={30} style={{color: Colors.viewDetail}} semiBold>
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
        style={{marginTop: 48}}
        chartHeight={150}
        {...currentLineChartProps}
      />
    );
  };

  renderHourlyChart = () => {
    const {currentIndexLineChart} = this.state;
    return (
      <View style={styles.sectionContainer}>
        {this.renderHeaderSection({title: 'Hourly'})}
        <ScrollView
          bounces={false}
          horizontal
          style={styles.chartScrollView}
          contentContainerStyle={styles.tabContentContainer}
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
                  size={26}
                  medium
                  style={{color: isFocus ? Colors.white : Colors.textTitle}}>
                  {it.title}
                  <Text size={26} light>
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
      <View style={styles.sectionContainer}>
        {this.renderHeaderSection({title: 'Daily'})}
        <ScrollView
          bounces={false}
          horizontal
          style={styles.chartScrollView}
          contentContainerStyle={styles.tabContentContainer}
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
                  size={26}
                  medium
                  style={{color: isFocus ? Colors.white : Colors.textTitle}}>
                  {it.title}
                  <Text size={26} light>
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

  renderAirQualityStatus = () => {
    return (
      <View style={styles.airStatusContainer}>
        <View style={styles.airIndexContainer}>
          <Text thin size={78}>
            160
          </Text>
          <SVGIcon.air_quality_status
            style={styles.air_status_icon}
            width={normalize(66)}
            height={normalize(66)}
          />
        </View>
        <View style={styles.airWarnContainer}>
          <Text
            size={38}
            medium
            style={{
              color: Colors.weather_red,
            }}>
            Unhealthy
          </Text>
          <View style={styles.airWarnContent}>
            <Text
              size={28}
              light
              style={{
                color: Colors.air_quality_text,
              }}>
              Everyone may begin to experience sadipscing elitrsed diam nonu.
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderAirSeekBar = () => {
    return (
      <View>
        <View style={styles.airSeekBar}>
          {this.listQualityIndex.map(it => {
            return (
              <View
                style={{
                  flex: it.value / this.totalAirQualityValue,
                  backgroundColor: it.color,
                }}
              />
            );
          })}
        </View>
        <View style={styles.bottomAirSeekBar}>
          <View style={styles.good}>
            <SVGIcon.air_good width={normalize(31)} height={normalize(28)} />
            <Text
              size={30}
              medium
              style={{color: Colors.air_quality_text, marginLeft: 4}}>
              Good
            </Text>
          </View>
          <View style={styles.unSafe}>
            <SVGIcon.air_unsafe width={normalize(31)} height={normalize(28)} />
            <Text
              size={30}
              medium
              style={{color: Colors.air_quality_text, marginLeft: 4}}>
              Unsafe
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderAirQualityIndex = () => {
    return (
      <View style={styles.sectionContainer}>
        {this.renderHeaderSection({title: 'Air Quality Index'})}
        <View style={styles.sectionContentContainer}>
          {this.renderAirQualityStatus()}
          {this.renderAirSeekBar()}
        </View>
      </View>
    );
  };

  renderHomeInformation = () => {
    return (
      <ImageBackground
        imageStyle={{
          resizeMode: TYPE_IMAGE_RESIZE_MODE.COVER,
        }}
        source={Images.assets.home_background.source}
        style={{
          width: widthDevice,
          height: heightDevice,
          paddingTop: getStatusBarHeight() + 16,
        }}>
        <View style={{paddingHorizontal: 12}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              size={36}
              style={{color: Colors.white, flex: 1, alignSelf: 'center'}}
              medium>
              Good Morning!
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchablePlatform style={{padding: 8}}>
                <SVGIcon.share width={normalize(42)} height={normalize(42)} />
              </TouchablePlatform>
              <TouchablePlatform
                onPress={() => {
                  NavigationService.getInstance().openDrawer();
                }}
                style={{padding: 8}}>
                <SVGIcon.menu width={normalize(42)} height={normalize(42)} />
              </TouchablePlatform>
            </View>
          </View>
          <Text size={38} style={{color: Colors.white, marginTop: 4}} semiBold>
            Tan Binh, Ho Chi Minh
          </Text>
          <Text size={28} style={{color: Colors.white, marginTop: 2}}>
            Wed, March 03
          </Text>
        </View>
      </ImageBackground>
    );
  };

  renderContent() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}>
          {this.renderHomeInformation()}
          {this.renderHourlyChart()}
          {this.renderDailyChart()}
          {this.renderAirQualityIndex()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundHome,
  },
  chartScrollView: {marginTop: 8},
  sectionContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 16,
    paddingVertical: 16,
  },
  tabContentContainer: {
    paddingLeft: normalize(14) + 8,
  },
  sectionContentContainer: {
    paddingLeft: normalize(14) + 8,
    paddingRight: 16,
  },
  headerSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  leftHeaderSection: {flexDirection: 'row', alignItems: 'center'},
  headerSectionTitle: {marginLeft: 8, color: Colors.black},
  detailButton: {padding: 16},
  airStatusContainer: {flexDirection: 'row', marginTop: 16},
  airIndexContainer: {
    width: normalize(210),
    height: normalize(129),
    borderRadius: normalize(20),
    backgroundColor: Colors.backgroundGray,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  air_status_icon: {position: 'absolute', top: -normalize(66) / 2},
  airWarnContainer: {
    flex: 1,
    marginLeft: 16,
  },
  airWarnContent: {flex: 1, justifyContent: 'flex-end'},
  airSeekBar: {
    width: '100%',
    height: normalize(10),
    flex: 1,
    flexDirection: 'row',
    marginVertical: 12,
    borderRadius: normalize(10),
    overflow: 'hidden',
  },
  bottomAirSeekBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  good: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unSafe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
