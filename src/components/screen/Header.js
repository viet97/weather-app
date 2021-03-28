import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {STATUS_BAR_HEIGHT, widthDevice} from '../../utils/DeviceUtil';
import IconBackSvg from '../../../assets/SVGIcon/header/icon_back.svg';
import CustomText from '../common/Text';
import NavigationService from '../../navigation/NavigationService';

const paddingBottomTitle = 15;
export const Header = props => {
  return (
    <View
      style={{
        marginTop: STATUS_BAR_HEIGHT,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: paddingBottomTitle,
        width: widthDevice,
        height: 90,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        style={{paddingRight: 20}}
        onPress={() => {
          NavigationService.getInstance().goBack();
        }}>
        <IconBackSvg width={11} height={(11 * 34) / 18} />
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          width: widthDevice,
          alignItems: 'center',
          paddingBottom: paddingBottomTitle,
        }}>
        <CustomText color="#202020">{props.title || 'Screen'}</CustomText>
      </View>
    </View>
  );
};
