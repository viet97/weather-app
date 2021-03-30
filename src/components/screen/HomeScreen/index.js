import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProgressCircle from 'react-native-progress-circle';

import {Colors} from '../../../themes/Colors';
import {
  getBottomSpace,
  getStatusBarHeight,
  heightDevice,
  insets,
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
                style={{
                  alignSelf: 'center',
                  marginBottom: 4,
                  color: Colors.black,
                }}>
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
                style={{
                  alignSelf: 'center',
                  marginBottom: 4,
                  color: Colors.black,
                }}>
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
                style={{
                  alignSelf: 'center',
                  marginBottom: 4,
                  color: Colors.black,
                }}>
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

    this.listGridInfo = [
      {
        Icon: SVGIcon.temp,
        value: 36,
        unit: 'oC',
        description: 'Feel Like',
      },
      {
        Icon: SVGIcon.humidity,
        value: 43,
        unit: '%',
        description: 'Humidity',
      },
      {
        Icon: SVGIcon.rain_snow,
        value: 0,
        unit: 'mm',
        description: 'Rain/Snow',
      },
      {
        Icon: SVGIcon.wind,
        value: 3,
        unit: 'km/h',
        description: 'Wind',
      },
      {
        Icon: SVGIcon.uv_index,
        value: 9,
        unit: '',
        description: 'UV Index',
      },
      {
        Icon: SVGIcon.dew_point,
        value: 43,
        unit: '%',
        description: 'Dew Point',
      },
      {
        Icon: SVGIcon.pressure,
        value: 1011,
        unit: 'mb',
        description: 'Pressure',
      },
      {
        Icon: SVGIcon.visibility,
        value: 8,
        unit: 'km',
        description: 'Visibility',
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
                  <Text
                    style={{color: isFocus ? Colors.white : Colors.textTitle}}
                    size={26}
                    light>
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
                  <Text
                    size={26}
                    style={{color: isFocus ? Colors.white : Colors.textTitle}}
                    light>
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

  renderPMCircleProgress = () => {
    return (
      <View style={styles.pmCircleContainer}>
        {this.listQualityIndex.map(airQuality => {
          return (
            <View style={styles.circleContainer}>
              <Text size={36} medium style={{color: Colors.air_quality_text}}>
                PM2.5
              </Text>
              <ProgressCircle
                outerCircleStyle={{marginTop: 12}}
                percent={30}
                radius={normalize(80)}
                borderWidth={normalize(8)}
                color="green"
                shadowColor={Colors.border_color}
                bgColor={Colors.white}>
                <View style={styles.innerDashedCircle}>
                  <Text style={{color: Colors.text_color1}} size={54} thin>
                    119
                  </Text>
                </View>
              </ProgressCircle>
              <View style={styles.airQualityBackground}>
                <Text size={28} style={{color: Colors.weather_red}}>
                  Unhealthy
                </Text>
              </View>
            </View>
          );
        })}
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
          <View style={styles.airQualityLine} />
          {this.renderPMCircleProgress()}
        </View>
      </View>
    );
  };

  renderCommonInfo = () => {
    return (
      <View style={styles.commonContainer}>
        <View style={styles.weatherToday}>
          <Text style={{color: Colors.white}} size={160} thin>
            36
            <Text size={80} light>
              oC
            </Text>
          </Text>
          <View style={styles.tempRange}>
            <Text
              style={{color: Colors.white, alignSelf: 'flex-start'}}
              size={55}
              thin>
              38o
            </Text>
            <Text
              style={{color: Colors.white, alignSelf: 'center'}}
              size={55}
              thin>
              /
            </Text>
            <Text
              style={{color: Colors.white, alignSelf: 'flex-end'}}
              size={55}
              thin>
              25o
            </Text>
          </View>
        </View>
        <View style={styles.partyCloud}>
          <SVGIcon.cloudy width={normalize(52)} height={normalize(52)} />
          <Text size={50} medium style={styles.partyCloudText}>
            Partly Cloudy
          </Text>
        </View>
        <Text size={32} style={styles.weatherSuggest}>
          Good weather, suitable for outdoor activities!
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.networkStatus}>
            <SVGIcon.offline width={normalize(24)} height={normalize(24)} />
            <Text light size={26} style={{marginLeft: 6}}>
              Offline Mode - last update 2 hours ago
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderGridInfoItem = ({item, index}) => {
    const {description, value, unit, Icon} = item;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 18,
          marginLeft: index % 2 === 0 ? 14 : 0,
          marginRight: index % 2 !== 0 ? 14 : 0,
          borderBottomColor: Colors.border_color_3,
          borderBottomWidth: 1,
        }}>
        <Icon width={normalize(90)} height={normalize(90)} />
        <View style={{marginLeft: 6, flex: 1}}>
          <Text style={{color: Colors.text_color1}} size={44}>
            {value}{' '}
            <Text style={{color: Colors.text_color1}} size={34}>
              {unit}
            </Text>
          </Text>
          <View style={styles.gridInfoItemDes}>
            <Text style={{color: Colors.textTitle}}>{description}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderGridInfo = () => {
    return (
      <View style={styles.gridInfoContainer}>
        <FlatList
          bounces={false}
          data={this.listGridInfo}
          numColumns={this.listGridInfo.length / 4}
          renderItem={this.renderGridInfoItem}
          showsVerticalScrollIndicator={false}
        />
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
        style={styles.homeImageBackground}>
        <View style={{flex: 1}}>
          <View style={styles.homeHeader}>
            <Text
              size={36}
              style={{color: Colors.white, flex: 1, alignSelf: 'center'}}
              medium>
              Good Morning!
            </Text>
            <View style={styles.iconsContainer}>
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
          <Text size={38} style={styles.locationText} semiBold>
            Tan Binh, Ho Chi Minh
          </Text>
          <Text size={28} style={styles.dateText}>
            Wed, March 03
          </Text>
          <View style={styles.infoContainer}>
            {this.renderCommonInfo()}
            {this.renderGridInfo()}
          </View>
        </View>
      </ImageBackground>
    );
  };

  renderContent() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
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
  contentContainerStyle: {
    paddingBottom: insets.bottom,
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
  airQualityLine: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border_color,
    marginTop: 24,
  },
  pmCircleContainer: {
    marginTop: 24,
    flexDirection: 'row',
  },
  circleContainer: {flex: 1, alignItems: 'center'},
  innerDashedCircle: {
    width: normalize(130),
    height: normalize(130),
    borderRadius: normalize(130) / 2,
    borderWidth: 1,
    borderColor: Colors.border_color,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  airQualityBackground: {
    paddingVertical: 8,
    backgroundColor: Colors.weather_red + '26',
    marginTop: 8,
    width: normalize(160),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(70),
  },
  homeImageBackground: {
    width: widthDevice,
    height: heightDevice,
    paddingTop: getStatusBarHeight() + 16,
  },
  homeHeader: {flexDirection: 'row', paddingHorizontal: 12},
  iconsContainer: {flexDirection: 'row', alignItems: 'center'},
  locationText: {color: Colors.white, marginTop: 4, paddingHorizontal: 12},
  dateText: {color: Colors.white, marginTop: 2, paddingHorizontal: 12},
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  commonContainer: {paddingHorizontal: 12},
  weatherToday: {flexDirection: 'row', alignItems: 'flex-end'},
  tempRange: {
    flexDirection: 'row',
    height: normalize(100),
    marginLeft: 4,
  },
  partyCloud: {flexDirection: 'row', alignItems: 'center'},
  partyCloudText: {color: Colors.white, marginLeft: 8},
  weatherSuggest: {color: Colors.white, marginTop: 4},
  networkStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.transparent_opacity,
    borderRadius: normalize(12),
    padding: 4,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.border_color_2,
  },
  gridInfoContainer: {
    backgroundColor: Colors.white,
    marginTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: normalize(40),
    borderTopLeftRadius: normalize(40),
    overflow: 'hidden',
  },
  gridInfoItemDes: {flex: 1, justifyContent: 'flex-end'},
});
