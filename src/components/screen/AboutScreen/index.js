import React from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import BaseScreen from '../BaseScreen';
import {normalize, widthDevice} from '../../../utils/DeviceUtil';
import {Header} from '../Header';
import {ItemListSetting} from '../LanguageScreen';
import {Colors} from '../../../themes/Colors';
import IconWeatherSvg from '../../../../assets/SVGIcon/weather-provider/icon_weather.svg';
import IconFollowWebSvg from '../../../../assets/SVGIcon/icon_follow_web';
import IconFollowFacebookSvg from '../../../../assets/SVGIcon/icon_follow_facebook.svg';
import IconFollowInstargramSvg from '../../../../assets/SVGIcon/icon_follow_instargram.svg';
import IconFollowTwitterSvg from '../../../../assets/SVGIcon/icon_follow_twitter';
import IconRateSvg from '../../../../assets/SVGIcon/view-about/icon_rate.svg';
import IconFeedBackSvg from '../../../../assets/SVGIcon/view-about/icon_feedback.svg';
import IconShareSvg from '../../../../assets/SVGIcon/view-about/icon_share.svg';
import BgBottomSvg from '../../../../assets/SVGIcon/view-about/bg_bottom.svg';
import IconRightSvg from '../../../../assets/SVGIcon/view-setting/right.svg';
import CustomText from '../../common/Text';
import AppInfoManager from '../../../AppInfoManager';
import {TouchablePlatform} from '../../../modules/TouchablePlatform';
import CustomImage from '../../common/Image';
import {Images} from '../../../themes/Images';
import {appCreatedBy} from '../../../Define';

const iconFollowSize = {width: normalize(60), height: normalize(60)};
const paddingHorizontalItem = normalize(30);
const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: paddingHorizontalItem,
  },
  wrapTouchItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderRgb,
    paddingVertical: normalize(41),
  },
  touchItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelItem: {
    marginLeft: paddingHorizontalItem,
  },
  touchIconFollow: {marginRight: normalize(30)},
});

class AboutScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      value: '30p',
    };
    this.listAction = [
      {
        label: 'Rate',
        value: 'rate',
        iconLeft: IconRateSvg,
      },
      {
        label: 'Feedback',
        value: 'feedback',
        iconLeft: IconFeedBackSvg,
      },
      {
        label: 'Share',
        value: 'share',
        iconLeft: IconShareSvg,
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
    const IconLeft = item.iconLeft;
    return (
      <ItemListSetting
        customStyle={{width: widthDevice}}
        key={index}
        value={value}
        onPressItem={this.onPressItem}
        item={item}
        iconLeft={<IconLeft width={normalize(56)} height={normalize(56)} />}
        iconRight={
          <IconRightSvg width={normalize(11.88)} height={normalize(22)} />
        }
      />
    );
  };
  renderHeader = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: normalize(80),
          paddingHorizontal: normalize(30),
        }}>
        <IconWeatherSvg width={normalize(120)} height={normalize(120)} />
        <CustomText
          style={{marginTop: normalize(45)}}
          color={Colors.viewDetail}
          size={52}
          bold>
          Weather
        </CustomText>
        <CustomText size={32} medium>
          {'Version ' + AppInfoManager.getInstance().getAppInfo().buildVersion}
        </CustomText>
        <CustomText
          color={Colors.textDesc}
          style={{textAlign: 'center'}}
          size={28}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea.
        </CustomText>
      </View>
    );
  };
  renderFooter = () => {
    return (
      <View style={{backgroundColor: '#F4F5F8'}}>
        <CustomImage
          source={Images.assets.bg_bottom_about.source}
          style={{
            width: widthDevice,
            height: widthDevice * (1 / Images.assets.bg_bottom_about.ratio),
          }}
        />
      </View>
    );
  };
  renderContent() {
    return (
      <>
        <Header title="About App" />
        <ScrollView
          invertStickyHeaders={[0]}
          style={{
            // backgroundColor: Colors.white,
            flex: 1,
            width: widthDevice,
            backgroundColor: '#F4F5F8',
          }}>
          {this.renderHeader()}
          <ImageBackground
            style={{
              width: widthDevice,
              height: widthDevice * (1 / Images.assets.bg_bottom_about.ratio),
              alignItems: 'center',
              backgroundColor: '#F4F5F8',
            }}
            source={Images.assets.bg_bottom_about.source}>
            <CustomText
              size={26}
              medium
              style={{marginTop: normalize(40), marginBottom: normalize(25)}}
              color={Colors.textTitle}>
              {'— Follow Us —'.toUpperCase()}
            </CustomText>
            <View style={{flexDirection: 'row'}}>
              <TouchablePlatform style={styles.touchIconFollow}>
                <IconFollowWebSvg {...iconFollowSize} />
              </TouchablePlatform>
              <TouchablePlatform style={styles.touchIconFollow}>
                <IconFollowFacebookSvg {...iconFollowSize} />
              </TouchablePlatform>
              <TouchablePlatform style={styles.touchIconFollow}>
                <IconFollowInstargramSvg {...iconFollowSize} />
              </TouchablePlatform>
              <TouchablePlatform style={styles.touchIconFollow}>
                <IconFollowTwitterSvg {...iconFollowSize} />
              </TouchablePlatform>
            </View>
            {this.listAction.map((item, index) => {
              return this.renderItem({item, index});
            })}
            <CustomText
              style={{position: 'absolute', bottom: normalize(26)}}
              color="#094FB9"
              size={28}>
              {appCreatedBy}
            </CustomText>
          </ImageBackground>
        </ScrollView>
      </>
    );
  }
}

export default AboutScreen;
