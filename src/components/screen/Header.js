import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  normalize,
  STATUS_BAR_HEIGHT,
  widthDevice,
} from '../../utils/DeviceUtil';
import IconBackSvg from '../../../assets/SVGIcon/header/icon_back.svg';
import CustomText from '../common/Text';
import NavigationService from '../../navigation/NavigationService';
import {KEY_FONT} from '../../themes/Fonts';

const paddingBottomTitle = normalize(25);
export const Header = props => {
  return (
    <View
      style={{
        marginTop: STATUS_BAR_HEIGHT,
        // marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(30),
        paddingBottom: paddingBottomTitle,
        paddingTop: normalize(109),
        width: widthDevice,
        // height: 90,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          justifyContent: 'flex-end',
        }}
        onPress={() => {
          NavigationService.getInstance().goBack();
        }}>
        <IconBackSvg width={normalize(18.36)} height={normalize(34)} />
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          width: widthDevice,
          alignItems: 'center',
          paddingBottom: paddingBottomTitle,
        }}>
        <CustomText
          size={36}
          style={{fontFamily: KEY_FONT.medium}}
          color="#202020">
          {props.title || 'Screen'}
        </CustomText>
      </View>
    </View>
  );
};