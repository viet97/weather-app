import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import IconCheckedSvg from '../../../../assets/SVGIcon/view-custom-layout/icon_checked.svg';
import IconUnCheckedSvg from '../../../../assets/SVGIcon/view-custom-layout/icon_unchecked.svg';
import IconDragSvg from '../../../../assets/SVGIcon/view-custom-layout/icon_drag.svg';
import ImageHeaderSvg from '../../../../assets/SVGIcon/view-custom-layout/image_header';
import BaseScreen from '../BaseScreen';
import CustomText from '../../common/Text';
import {Header} from '../Header';
import {normalize, widthDevice} from '../../../utils/DeviceUtil';
import {Colors} from '../../../themes/Colors';

const styles = StyleSheet.create({
  containerView: {flex: 1, backgroundColor: Colors.white},
  wrapIconCheckbox: {flexDirection: 'row', alignItems: 'center'},
});
const iconCheckboxSize = {width: normalize(42), height: normalize(42)};
const paddingHorizontalItem = normalize(30);
class CustomLayoutScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          label: 'Status',
          key: 'status',
          isActive: true,
        },
        {
          label: 'Detail',
          key: 'Detail',
          isActive: true,
        },
        {
          label: 'Hourly',
          key: 'Hourly',
          isActive: true,
        },
        {
          label: 'Air Quality',
          key: 'AirQuality',
          isActive: true,
        },
        {
          label: 'Sun and Moon',
          key: 'SunandMoon',
          isActive: true,
        },
        {
          label: 'Wind and Pressure',
          key: 'WindandPressure',
          isActive: true,
        },
        {
          label: 'Radar',
          key: 'Radar',
          isActive: false,
        },
        {
          label: 'Covid',
          key: 'Covid',
          isActive: false,
        },
      ],
    };
  }
  onPressItem = ({item, index}) => {
    let tmpData = [...this.state.data];
    let indexFinal = tmpData.findIndex(x => x.key === item.key);
    tmpData[indexFinal] = {
      ...item,
      isActive: !item.isActive,
    };
    this.setState({
      data: tmpData,
    });
  };
  renderItem = params => {
    const {item, index, isActive, drag} = params;
    const styleViewBorder = {
      width: isActive ? widthDevice : widthDevice - paddingHorizontalItem * 2,
      height: 1,
      backgroundColor: Colors.borderRgb,
      marginLeft: isActive ? 0 : paddingHorizontalItem,
    };
    const styleTouch = {
      paddingVertical: normalize(36),
      backgroundColor: isActive ? '#ddd' : Colors.white,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: paddingHorizontalItem,
    };
    return (
      <View>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.onPressItem({item, index});
            }}
            style={styleTouch}
            onLongPress={drag}>
            <View style={styles.wrapIconCheckbox}>
              <TouchableOpacity
                onPress={() => {
                  this.onPressItem({item, index});
                }}>
                {item.isActive ? (
                  <IconCheckedSvg {...iconCheckboxSize} />
                ) : (
                  <IconUnCheckedSvg {...iconCheckboxSize} />
                )}
              </TouchableOpacity>
              <CustomText
                medium
                style={{marginLeft: normalize(30)}}
                color={Colors.air_quality_text}
                size={34}>
                {item.label}
              </CustomText>
            </View>
            <TouchableOpacity onLongPress={drag}>
              <IconDragSvg width={normalize(32)} height={normalize(18)} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        <View style={styleViewBorder} />
      </View>
    );
  };
  renderHeader = () => {
    return (
      <ImageHeaderSvg width={widthDevice} height={widthDevice * (134 / 750)} />
    );
  };
  render() {
    const {data} = this.state;
    return (
      <View style={styles.containerView}>
        <Header title="Customize Layout" />
        <DraggableFlatList
          data={data}
          extraData={data}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          onDragEnd={({data}) => this.setState({data})}
        />
      </View>
    );
  }
}

export default CustomLayoutScreen;
