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
import {Colors} from '../../themes/Colors';

const paddingBottomTitle = normalize(25);
export const Header = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: normalize(30),
        paddingBottom: paddingBottomTitle,
        paddingTop: normalize(109),
        width: widthDevice,
        shadowColor: Colors.shadowHeader,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: Colors.white,
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
        <CustomText size={36} semiBold color="#202020">
          {props.title || 'Screen'}
        </CustomText>
      </View>
    </View>
  );
};
