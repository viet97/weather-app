import React from 'react';
import {FlatList, View} from 'react-native';
import BaseScreen from '../BaseScreen';
import IconWeatherSvg from '../../../../assets/SVGIcon/view-menu/icon_weather.svg';
import {Images} from '../../../themes/Images';
import CustomImage from '../../common/Image';
import {normalize, STATUS_BAR_HEIGHT} from '../../../utils/DeviceUtil';
import IconBackSvg from '../../../../assets/SVGIcon/view-menu/icon_back.svg';
import IconAddSvg from '../../../../assets/SVGIcon/view-menu/icon_add.svg';
import IconSettingSvg from '../../../../assets/SVGIcon/view-menu/icon_setting.svg';
import IconMoreSvg from '../../../../assets/SVGIcon/view-menu/icon_more.svg';
import IconTempCSvg from '../../../../assets/SVGIcon/view-menu/icon_tempC.svg';
import CustomText from '../../common/Text';
import {TouchablePlatform} from '../../../modules/TouchablePlatform';
import NavigationService from '../../../navigation/NavigationService';
import {ROUTER_NAME} from '../../../navigation/NavigationConst';
import {Colors} from '../../../themes/Colors';

export default class MenuScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: 'Tan Binh, Ho Chi Minh',
          temperature: 36,
          unit: 'c',
          icon: IconWeatherSvg,
          background: Images.assets.bg_menu.source,
          ratio: 543 / 271.5,
          key: 'hcm',
        },
      ],
    };
  }
  renderItem = params => {
    const {item, index} = params;
    return (
      <View style={{paddingHorizontal: normalize(9)}} key={index}>
        <CustomImage
          source={item.background}
          style={{width: normalize(543), height: normalize(271.5)}}
        />
        <View
          style={{
            position: 'absolute',
            width: normalize(543),
            height: normalize(271.5),
            top: 0,
            left: normalize(9),
            backgroundColor: Colors.blackAlpha20,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: normalize(9),
            width: normalize(543),
            height: normalize(271.5),
            paddingHorizontal: normalize(30),
            justifyContent: 'space-between',
            paddingVertical: normalize(28),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CustomText numberOfLines={1} color={Colors.white} size={36}>
              {item.label}
            </CustomText>
            <TouchablePlatform>
              <CustomImage
                source={Images.assets.icon_more_menu.source}
                style={{
                  width: normalize(44),
                  height: normalize(44),
                }}
              />
            </TouchablePlatform>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText color={Colors.white} size={80}>
                {item.temperature}
              </CustomText>
              <IconTempCSvg width={normalize(42)} height={normalize(33)} />
            </View>
            <IconWeatherSvg width={normalize(58)} height={normalize(58)} />
          </View>
        </View>
      </View>
    );
  };
  renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: normalize(104) + STATUS_BAR_HEIGHT,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: normalize(30),
          marginBottom: normalize(40),
        }}>
        <TouchablePlatform
          onPress={() => {
            NavigationService.getInstance().closeDrawer();
          }}
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
          }}>
          <IconBackSvg width={normalize(19.44)} height={normalize(36)} />
        </TouchablePlatform>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginRight: normalize(56)}}>
            <IconAddSvg width={normalize(64)} height={normalize(64)} />
          </View>
          <TouchablePlatform
            onPress={() => {
              NavigationService.getInstance().drawerNavigate({
                routerName: 'Stack',
                screenName: ROUTER_NAME.SETTING.name,
              });
            }}>
            <IconSettingSvg width={normalize(64)} height={normalize(64)} />
          </TouchablePlatform>
        </View>
      </View>
    );
  };
  renderContent() {
    const {data} = this.state;
    return (
      <FlatList
        keyExtractor={(item, index) => item.key + index}
        data={data}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}
