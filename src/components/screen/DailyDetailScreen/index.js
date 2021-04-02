import React from 'react';
import {View, FlatList, ImageBackground} from 'react-native';

import BaseScreen from '../BaseScreen';
import {Header, HEADER_HEIGHT} from '../Header';
import {heightDevice, normalize, widthDevice} from '../../../utils/DeviceUtil';
import {Colors} from '../../../themes/Colors';
import SVGIcon from '../../../../assets/SVGIcon';
import {TYPE_IMAGE_RESIZE_MODE} from '../../common/Image';
import {Images} from '../../../themes/Images';
import Text from '../../common/Text';

const ITEM_MARGIN = 16;
class DailyDetailScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          date: 'Tue, March 16',
          weatherStatus: 'Partly Cloudy',
          gridInfo: [
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
          ],
        },
        {
          date: 'Tue, March 16',
          weatherStatus: 'Partly Cloudy',
          gridInfo: [
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
          ],
        },
        {
          date: 'Tue, March 16',
          weatherStatus: 'Partly Cloudy',
          gridInfo: [
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
          ],
        },
      ],
    };
  }
  renderGridInfoItem = ({item, index}) => {
    const {description, value, unit, Icon} = item;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingVertical: 12,
          marginLeft: index % 2 === 0 ? 16 : 0,
          marginRight: index % 2 !== 0 ? 16 : 0,
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
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Text style={{color: Colors.textTitle}}>{description}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderItemGridInfo = (gridInfo = []) => {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          marginTop: 12,
          borderTopRightRadius: normalize(40),
          borderTopLeftRadius: normalize(40),
          overflow: 'hidden',
        }}>
        <FlatList
          bounces={false}
          data={gridInfo}
          numColumns={gridInfo.length / 3}
          renderItem={this.renderGridInfoItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  renderItem = ({item, index}) => {
    const {date, weatherStatus, gridInfo} = item;
    return (
      <View
        style={{
          width: widthDevice,
          height: (heightDevice - HEADER_HEIGHT - ITEM_MARGIN) / 2,
          backgroundColor: Colors.white,
          marginBottom: ITEM_MARGIN,
        }}>
        <ImageBackground
          imageStyle={{
            resizeMode: TYPE_IMAGE_RESIZE_MODE.COVER,
          }}
          source={Images.assets.home_background.source}
          style={{flex: 1}}>
          <Text
            style={{
              marginLeft: 16,
              marginTop: 16,
            }}
            medium
            size={48}>
            {date}
          </Text>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 16,
              }}>
              <SVGIcon.cloudy width={normalize(52)} height={normalize(52)} />
              <Text
                size={40}
                medium
                style={{color: Colors.white, marginLeft: 8}}>
                {weatherStatus}
              </Text>
            </View>
            {this.renderItemGridInfo(gridInfo)}
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderContent() {
    const {data} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: Colors.backgroundHome}}>
        <Header title="Daily • Tan Binh, Ho Chi Minh" />
        <FlatList
          data={data}
          extraData={this.state}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default DailyDetailScreen;
