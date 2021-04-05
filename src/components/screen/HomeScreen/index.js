import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
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
import AppStateModule from '../../../modules/AppStateModule';
import {
  LineChartCustom,
  BarChartCustom,
  AirQualityProgressCircle,
  WeatherIcon,
} from '../../element';
import {Images} from '../../../themes/Images';
import {TYPE_IMAGE_RESIZE_MODE} from '../../common/Image';
import NavigationService from '../../../navigation/NavigationService';
import WeatherInfo from './component/weather-info';
import {ROUTER_NAME} from '../../../navigation/NavigationConst';
import {AppSettingManager} from '../../../modules/AppSettingManager';
import {isEmpty, size} from 'lodash';
import {TouchablePlatform} from '../../../modules/TouchablePlatform';
import WeatherAction from '../../../actions/WeatherAction';
import {connect} from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';
import {
  getDateTimeString,
  getDayMonth,
  getGreetingTime,
  getHourString,
  getStateForKeys,
  getValueFromObjectByKeys,
} from '../../../utils/Util';
import {AIR_LIST} from '../../../Define';
import {EmitterManager} from '../../../modules/EmitterManager';
import LocationModule from '../../../modules/LocationModule';
import Svg from 'react-native-svg';

const LEFT_PADDING_SCREEN = normalize(14) + 8;
const RIGHT_PADDING_SCREEN = 16;
class HomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      currentIndexLineChart: 0,
      currentIndexBarChart: 0,
      currentIndexCovidTab: 0,
      greeting: getGreetingTime(moment()),
      address: '',
    };
    this.displayName = 'HomeScreen';
    this.sunCircleR = normalize(175);
    this.sunCircleCenterX =
      (widthDevice - LEFT_PADDING_SCREEN - RIGHT_PADDING_SCREEN) / 2;
    this.sunCircleCenterY = normalize(175);
    this.listQualityIndex = [
      {
        color: 'green',
        value: 50,
        ...AIR_LIST.SO2,
      },
      {
        color: 'yellow',
        value: 100,
        ...AIR_LIST.CO,
      },
      {
        color: 'red',
        value: 500,
        ...AIR_LIST.O3,
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
        key: 'temp',
        unit: 'oC',
        dotColor: Colors.tempDotColor,
        lineColor: Colors.tempLineColor,
      },
      // {
      //   title: 'Rain',
      //   unit: 'mm',
      //   key: 'rain',
      //   dotColor: Colors.rainDotColor,
      //   lineColor: Colors.rainLineColor,
      // },
      {
        title: 'Wind',
        key: 'wind_speed',
        unit: 'Km/h',
        dotColor: Colors.windDotColor,
        lineColor: Colors.windLineColor,
      },
      {
        title: 'Pressure',
        unit: 'mb',
        key: 'pressure',
        dotColor: Colors.pressureDotColor,
        lineColor: Colors.pressureLineColor,
      },
    ];
    this.listBarChart = [
      // {
      //   title: 'Snow',
      //   unit: 'mm',
      //   data: exampleData,
      //   renderContentBar: ({value, ratio}) => {
      //     return (
      //       <View
      //         style={{
      //           flex: 1,
      //           justifyContent: 'flex-end',
      //         }}>
      //         <Text
      //           size={28}
      //           light
      //           style={{
      //             alignSelf: 'center',
      //             marginBottom: 4,
      //             color: Colors.black,
      //           }}>
      //           {value}
      //         </Text>
      //         <LinearGradient
      //           start={{x: 0, y: 0.1}}
      //           end={{x: 0, y: 1.0}}
      //           colors={['#89D378', '#EAF7E6']}
      //           style={{flex: ratio}}
      //         />
      //       </View>
      //     );
      //   },
      //   renderBottomLabel: () => {
      //     return (
      //       <View
      //         style={{
      //           alignItems: 'center',
      //           justifyContent: 'center',
      //           flex: 1,
      //           marginTop: 16,
      //         }}>
      //         <SVGIcon.cloudy width={30} height={30} />
      //         <Text size={24} style={{marginTop: 4, color: Colors.textTitle}}>
      //           Mon 01
      //         </Text>
      //       </View>
      //     );
      //   },
      // },
      {
        title: 'Wind',
        key: 'wind_speed',
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
      },
      {
        title: 'Pressure',
        key: 'pressure',
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
      },
    ];

    this.listMoonInfo = [{}, {}, {}];
    this.covidInfo = [
      {
        title: 'Viet Name',
      },
      {
        title: 'Worldwide',
      },
    ];
    this.listCovidGridInfo = [
      {
        Icon: SVGIcon.covid_active,
        value: 549,
        title: 'Active',
      },
      {
        Icon: SVGIcon.covid_confirm,
        value: 2482,
        title: 'Confirmed',
      },
      {
        Icon: SVGIcon.covid_recover,
        value: 1898,
        title: 'Recovered',
      },
      {
        Icon: SVGIcon.covid_death,
        value: 35,
        title: 'Deaths',
      },
    ];
  }
  componentWillMount = async () => {
    await AppSettingManager.getInstance().setDataSettingFromLocal();
  };

  async _componentDidMount() {
    const {getAllData, getAirPollution} = this.props;
    getAllData();
    getAirPollution();
    LocationModule.getCurrentAddress().then(address =>
      this.setStateSafe({address}),
    );
    EmitterManager.getInstance().on(
      EmitterManager.listEvent.APP_STATE_CHANGE,
      () => {
        this.setStateSafe({greeting: getGreetingTime(moment())});
        LocationModule.getCurrentAddress().then(address =>
          this.setStateSafe({address}),
        );
      },
    );
  }
  renderBottomLabel = (dateTimeStr, icon, isFocus) => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <WeatherIcon icon={icon} style={{width: 40, height: 40}} />
      <Text
        size={24}
        style={{
          marginTop: 4,
          color: isFocus ? Colors.text_color1 : Colors.textTitle,
        }}>
        {dateTimeStr}
      </Text>
    </View>
  );

  renderHeaderSection = ({title, onPressDetail, hasDetail = true}) => {
    return (
      <View style={styles.headerSectionContainer}>
        <View style={styles.leftHeaderSection}>
          <SVGIcon.header_left width={normalize(14)} height={normalize(54)} />
          <Text size={42} semiBold style={styles.headerSectionTitle}>
            {title}
          </Text>
        </View>
        {hasDetail ? (
          <TouchablePlatform
            style={styles.detailButton}
            onPress={() => onPressDetail && onPressDetail()}>
            <Text size={30} style={{color: Colors.viewDetail}} semiBold>
              View detail →
            </Text>
          </TouchablePlatform>
        ) : (
          <View />
        )}
      </View>
    );
  };

  renderLineChart = () => {
    const {currentIndexLineChart} = this.state;
    const {hourly} = this.props;
    if (size(hourly) > 0) {
      const currentLineChartProps = this.listLineChart[currentIndexLineChart];
      const data = hourly.map(it => {
        if (currentLineChartProps.key === 'temp') {
          return Math.floor(it[currentLineChartProps.key]);
        }
        return it[currentLineChartProps.key];
      });
      return (
        <LineChartCustom
          style={{marginTop: 48}}
          chartHeight={150}
          {...currentLineChartProps}
          data={data}
          renderBottomLabel={({index, isFocus}) => {
            const currentData = hourly[index];
            if (!currentData) return null;
            const {dt} = currentData;
            const weatherArray = getValueFromObjectByKeys(currentData, [
              'weather',
            ]);
            let icon = '';
            if (size(weatherArray) > 0) {
              icon = weatherArray[0].icon;
            }

            return this.renderBottomLabel(getHourString(dt), icon, isFocus);
          }}
        />
      );
    }
  };

  renderHourlyChart = () => {
    const {currentIndexLineChart} = this.state;
    const {hourly} = this.props;
    return (
      <View style={styles.sectionContainer}>
        {this.renderHeaderSection({
          title: 'Hourly',
          onPressDetail: () =>
            NavigationService.getInstance().navigate({
              routerName: ROUTER_NAME.HOURLY_DETAIL.name,
            }),
        })}
        {size(hourly) > 0 ? (
          <View>
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
                      marginRight:
                        index !== this.listLineChart.length - 1 ? 8 : 0,
                      backgroundColor: isFocus
                        ? Colors.activeTitleLineChart
                        : Colors.white,
                    }}>
                    <Text
                      size={26}
                      medium
                      style={{
                        color: isFocus ? Colors.white : Colors.textTitle,
                      }}>
                      {it.title}
                      <Text
                        style={{
                          color: isFocus ? Colors.white : Colors.textTitle,
                        }}
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
        ) : null}
      </View>
    );
  };

  renderBarChart = () => {
    const {currentIndexBarChart} = this.state;
    const {daily} = this.props;
    if (size(daily) > 0) {
      const currentBarChartProps = this.listBarChart[currentIndexBarChart];

      const data = daily.map(it => {
        return Math.floor(it[currentBarChartProps.key]);
      });
      return (
        <BarChartCustom
          contentContainerStyle={{
            paddingLeft: LEFT_PADDING_SCREEN,
            paddingRight: RIGHT_PADDING_SCREEN,
          }}
          style={{marginTop: 24}}
          {...currentBarChartProps}
          data={data}
          renderBottomLabel={({index}) => {
            const currentData = daily[index];
            if (!currentData) return null;
            const {dt} = currentData;
            const weatherArray = getValueFromObjectByKeys(currentData, [
              'weather',
            ]);
            let icon = '';
            if (size(weatherArray) > 0) {
              icon = weatherArray[0].icon;
            }
            return this.renderBottomLabel(getDateTimeString(dt), icon);
          }}
        />
      );
    }
  };

  renderDailyChart = () => {
    const {currentIndexBarChart} = this.state;
    const {daily} = this.props;
    return (
      <View style={styles.sectionContainer}>
        {this.renderHeaderSection({
          title: 'Daily',
          onPressDetail: () =>
            NavigationService.getInstance().navigate({
              routerName: ROUTER_NAME.DAILY_DETAIL.name,
            }),
        })}
        {size(daily) > 0 ? (
          <View>
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
                      marginRight:
                        index !== this.listLineChart.length - 1 ? 8 : 0,
                      backgroundColor: isFocus
                        ? Colors.activeTitleLineChart
                        : Colors.white,
                    }}>
                    <Text
                      size={26}
                      medium
                      style={{
                        color: isFocus ? Colors.white : Colors.textTitle,
                      }}>
                      {it.title}
                      <Text
                        size={26}
                        style={{
                          color: isFocus ? Colors.white : Colors.textTitle,
                        }}
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
        ) : null}
      </View>
    );
  };

  renderAirQualityStatus = () => {
    return (
      <View style={styles.airStatusContainer}>
        <View style={styles.airIndexContainer}>
          <Text thin style={{color: Colors.text_color1}} size={78}>
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
                  height: normalize(10),
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
    const {listAirObj} = this.props;
    if (isEmpty(listAirObj)) return null;
    return (
      <View style={styles.pmCircleContainer}>
        {this.listQualityIndex.map(airQuality => {
          const {name, key} = airQuality;
          const value = listAirObj[key];
          return (
            <View style={styles.circleContainer}>
              <Text size={36} medium style={{color: Colors.air_quality_text}}>
                {name}
              </Text>
              <AirQualityProgressCircle
                outerCircleStyle={{marginTop: 12}}
                percentage={30}
                radius={normalize(80)}
                color="green"
                innerCircleStyle={styles.innerDashedCircle}
                value={value && value.toFixed(2)}
              />
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
        {this.renderHeaderSection({
          title: 'Air Quality Index',
          onPressDetail: () =>
            NavigationService.getInstance().navigate({
              routerName: ROUTER_NAME.AIR_QUALITY_DETAIL.name,
              params: {
                renderAirQualityStatus: this.renderAirQualityStatus,
                renderAirSeekBar: this.renderAirSeekBar,
              },
            }),
        })}
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
    const {weather, current, daily} = this.props;
    let minTemp = 0,
      maxTemp = 0;
    if (size(daily) > 0) {
      minTemp = Math.floor(getValueFromObjectByKeys(daily[0], ['temp', 'min']));
      maxTemp = Math.floor(getValueFromObjectByKeys(daily[0], ['temp', 'max']));
    }

    const temp = getValueFromObjectByKeys(current, ['temp']);
    const weatherArray = getValueFromObjectByKeys(current, ['weather']);
    let description = '';
    let main = '';
    let icon = '';
    if (size(weatherArray) > 0) {
      description = weatherArray[0].description;
      main = weatherArray[0].main;
      icon = weatherArray[0].icon;
    }

    this._debugLog('renderCommonInfo', weather);
    return (
      <View style={styles.commonContainer}>
        <View style={styles.weatherToday}>
          <Text style={{color: Colors.white}} size={160} thin>
            {Math.floor(temp)}
            <Text size={80} light>
              oC
            </Text>
          </Text>
          <View style={styles.tempRange}>
            <Text
              style={{color: Colors.white, alignSelf: 'flex-start'}}
              size={55}
              thin>
              {maxTemp}
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
              {minTemp}
            </Text>
          </View>
        </View>
        <View style={styles.partyCloud}>
          <WeatherIcon
            icon={icon}
            style={{
              width: normalize(100),
              height: normalize(100),
            }}
          />
          <Text size={50} medium style={styles.partyCloudText}>
            {main}
          </Text>
        </View>
        <Text size={32} style={styles.weatherSuggest}>
          {description}
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
    const {listGridInfo} = this.props;
    return (
      <View style={styles.gridInfoContainer}>
        <FlatList
          bounces={false}
          data={listGridInfo}
          numColumns={2}
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
              Good {this.state.greeting}!
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
            {this.state.address}
          </Text>
          <Text size={28} style={styles.dateText}>
            {getDayMonth(new Date().getTime())}
          </Text>
          <View style={styles.infoContainer}>
            {this.renderCommonInfo()}
            {this.renderGridInfo()}
          </View>
        </View>
      </ImageBackground>
    );
  };

  getCirclePointY = x => {
    return (
      -Math.sqrt(
        Math.pow(this.sunCircleR, 2) - Math.pow(x - this.sunCircleCenterX, 2),
      ) + this.sunCircleCenterY
    );
  };

  renderSun = () => {
    const {current} = this.props;
    const sunrise = getValueFromObjectByKeys(current, ['sunrise']);
    const sunset = getValueFromObjectByKeys(current, ['sunset']);
    return (
      <View style={styles.sectionContainer}>
        {this.renderHeaderSection({title: 'Sun', hasDetail: false})}
        <View style={styles.sunContentContainer}>
          <View>
            <Text style={{color: Colors.textTitle}}>Sunrise</Text>
            <Text size={36} style={{color: Colors.air_quality_text}}>
              {moment(new Date(sunrise * 1000)).format('HH:ss')}
            </Text>
          </View>
          <View style={styles.sunCircleContainer}>
            <View style={styles.sunInnerCircleContainer}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1.0}}
                colors={[Colors.sun_rise, Colors.sun_set]}
                style={styles.sunInnerBackground}
              />
              <View style={styles.sunInnerEmptyBackground} />
            </View>
          </View>
          <SVGIcon.sun
            style={{
              position: 'absolute',
              top: this.getCirclePointY(240),
              left: 240,
            }}
            width={normalize(40)}
            height={normalize(40)}
          />
          <View>
            <Text style={{color: Colors.textTitle}}>Sunset</Text>
            <Text size={36} style={{color: Colors.air_quality_text}}>
              {moment(new Date(sunset * 1000)).format('HH:ss')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderMoon = () => {
    return (
      <View style={styles.moonContainer}>
        {this.renderHeaderSection({title: 'Moon', hasDetail: false})}
        <View style={styles.moonContentContainer}>
          {this.listMoonInfo.map(it => {
            return (
              <View style={styles.moonCircleContainer}>
                <View style={styles.moonCircle} />
                <Text style={{color: Colors.textTitle, marginTop: 16}}>
                  Today
                </Text>
                <Text
                  size={30}
                  style={{color: Colors.air_quality_text, marginTop: 8}}>
                  Waxing Gibbous
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  renderWindPressure = () => {
    const {current} = this.props;
    const wind_deg = getValueFromObjectByKeys(current, ['wind_deg']);
    const wind_speed = getValueFromObjectByKeys(current, ['wind_speed']);
    const pressure = getValueFromObjectByKeys(current, ['pressure']);
    return (
      <View style={styles.sectionContainer}>
        {this.renderHeaderSection({title: 'Wind & Pressure', hasDetail: false})}
        <View style={styles.winPressureContentContainer}>
          <View style={styles.windIconContainer}>
            <SVGIcon.wind_pressure width="100%" height="100%" />
          </View>
          <View style={styles.wind_pressure}>
            <View style={styles.winContainer}>
              <View>
                <Text style={{color: Colors.textTitle}}>Wind</Text>
                <Text
                  size={36}
                  thin
                  style={{color: Colors.text_color1, marginTop: 4}}>
                  {wind_speed} m/s
                </Text>
              </View>
              <SVGIcon.wind_value
                width={normalize(72)}
                height={normalize(72)}
              />
            </View>
            <View style={styles.pressureContainer}>
              <View>
                <Text style={{color: Colors.textTitle}}>Pressure</Text>
                <Text
                  size={36}
                  thin
                  style={{color: Colors.text_color1, marginTop: 4}}>
                  {pressure} mb
                </Text>
              </View>
              <SVGIcon.pressure_value
                width={normalize(72)}
                height={normalize(72)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderCovidTab = () => {
    const {currentIndexCovidTab} = this.state;
    return (
      <View style={styles.covidTabContainer}>
        {this.covidInfo.map((it, index) => {
          const isFocus = currentIndexCovidTab === index;
          return (
            <TouchablePlatform
              onPress={() => this.setStateSafe({currentIndexCovidTab: index})}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                backgroundColor: isFocus ? Colors.viewDetail : Colors.white,
              }}>
              <Text
                medium
                style={{color: isFocus ? Colors.white : Colors.textTitle}}>
                {it.title}
              </Text>
            </TouchablePlatform>
          );
        })}
      </View>
    );
  };

  renderCovidGridInfoItem = ({item, index}) => {
    const {Icon, title, value} = item;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginRight: index % 2 === 0 ? 8 : 0,
          marginLeft: index % 2 !== 0 ? 8 : 0,
          marginBottom: 16,
        }}>
        <Icon width={normalize(140)} height={normalize(140)} />
        <View style={styles.covidGridItemContent}>
          <Text size={30} style={{color: Colors.air_quality_text}}>
            {title}
          </Text>
          <Text
            size={44}
            light
            style={{color: Colors.air_quality_text, marginTop: 4}}>
            {value}
          </Text>
        </View>
      </View>
    );
  };

  renderCovidGridInfo = () => {
    return (
      <FlatList
        style={styles.covidGridInfo}
        data={this.listCovidGridInfo}
        numColumns={this.listCovidGridInfo.length / 2}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={this.renderCovidGridInfoItem}
      />
    );
  };

  renderCovid = () => {
    return (
      <View style={styles.sectionContainer}>
        {this.renderHeaderSection({title: 'Covid', hasDetail: false})}
        {this.renderCovidTab()}
        {this.renderCovidGridInfo()}
        <View style={styles.covidGridBottomLine} />
        <Text size={26} style={styles.covidDataText}>
          Data from about-corona.net
        </Text>
      </View>
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
          {this.renderSun()}
          {this.renderMoon()}
          {this.renderWindPressure()}
          {this.renderCovid()}
          <WeatherInfo />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  covidDataText: {
    alignSelf: 'center',
    color: Colors.air_quality_text,
    marginTop: 16,
  },
  covidGridBottomLine: {
    height: 0,
    borderWidth: 1,
    borderColor: Colors.border_color_5,
    borderStyle: 'dashed',
    marginLeft: LEFT_PADDING_SCREEN,
    marginRight: RIGHT_PADDING_SCREEN,
  },
  covidGridInfo: {
    marginTop: 16,
    marginLeft: LEFT_PADDING_SCREEN,
    marginRight: RIGHT_PADDING_SCREEN,
  },
  covidGridItemContent: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 16,
    backgroundColor: Colors.backgroundGray,
    borderTopRightRadius: normalize(20),
    borderBottomRightRadius: normalize(20),
  },
  covidTabContainer: {
    marginTop: 16,
    marginLeft: LEFT_PADDING_SCREEN,
    marginRight: RIGHT_PADDING_SCREEN,
    borderRadius: normalize(24),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    flexDirection: 'row',
  },
  pressureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  winContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.border_color,
    borderBottomWidth: 1,
  },
  wind_pressure: {flex: 1, marginLeft: 16, paddingVertical: 8},
  windIconContainer: {flex: 1, aspectRatio: 320 / 235},
  winPressureContentContainer: {
    flexDirection: 'row',
    marginTop: 16,
    paddingLeft: LEFT_PADDING_SCREEN,
    paddingRight: RIGHT_PADDING_SCREEN,
    flex: 1,
  },
  moonCircle: {
    width: normalize(90),
    height: normalize(90),
    borderRadius: normalize(45),
    borderWidth: 1,
    borderColor: Colors.border_moon,
  },
  moonCircleContainer: {flex: 1, alignItems: 'center'},
  moonContentContainer: {marginTop: 16, flexDirection: 'row', flex: 1},
  moonContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
  },
  sunInnerEmptyBackground: {
    flex: 0.25,
    backgroundColor: Colors.white,
  },
  sunInnerBackground: {
    flex: 0.2,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: normalize(175) * 0.75,
    borderTopRightRadius: 0,
  },
  sunInnerCircleContainer: {
    width: normalize(350),
    height: normalize(350),
    borderTopLeftRadius: normalize(175),
    borderTopRightRadius: normalize(175),
    overflow: 'hidden',
    flexDirection: 'row',
  },
  sunCircleContainer: {
    height: normalize(175),
    borderTopLeftRadius: normalize(175),
    borderTopRightRadius: normalize(175),
    borderWidth: 1,
    borderColor: Colors.border_color_4,
    borderStyle: 'dashed',
    marginHorizontal: 8,
  },
  sunContentContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border_color,
    marginLeft: LEFT_PADDING_SCREEN,
    marginRight: RIGHT_PADDING_SCREEN,
  },
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
    paddingLeft: LEFT_PADDING_SCREEN,
  },
  sectionContentContainer: {
    paddingLeft: LEFT_PADDING_SCREEN,
    paddingRight: RIGHT_PADDING_SCREEN,
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
    marginBottom: 12,
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

const mapStateToProps = state => {
  return {
    weather: getStateForKeys(state, ['Weather', 'weather']),
    current: getStateForKeys(state, ['Weather', 'current']),
    listGridInfo: getStateForKeys(state, ['Weather', 'listGridInfo']),
    hourly: getStateForKeys(state, ['Weather', 'hourly']),
    daily: getStateForKeys(state, ['Weather', 'daily']),
    listAirObj: getStateForKeys(state, ['Weather', 'listAirObj']),
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    getAllData: () => dispatch(WeatherAction.getAllData()),
    getAirPollution: () => dispatch(WeatherAction.getAirPollution()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withImmutablePropsToJS(HomeScreen));
