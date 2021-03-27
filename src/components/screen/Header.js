import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {STATUS_BAR_HEIGHT, widthDevice} from '../../utils/DeviceUtil';
import IconBackSvg from '../../../assets/SVGIcon/header/icon_back.svg';
import CustomText from '../common/Text';
import NavigationService from '../../navigation/NavigationService';

export const Header = props => {
  return (
    <View
      style={{
        marginTop: STATUS_BAR_HEIGHT + 30,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}>
      <TouchableOpacity
        style={{paddingRight: 20}}
        onPress={() => {
          NavigationService.getInstance().goBack();
        }}>
        <IconBackSvg width={18.36} height={34} />
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          width: widthDevice,
          alignItems: 'center',
        }}>
        <CustomText color="#202020">{props.title || 'Screen'}</CustomText>
      </View>
    </View>
  );
};
