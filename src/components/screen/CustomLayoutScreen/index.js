import React, {useState, useCallback} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import IconCheckedSvg from '../../../../assets/SVGIcon/view-custom-layout/icon_checked.svg';
import IconUnCheckedSvg from '../../../../assets/SVGIcon/view-custom-layout/icon_unchecked.svg';
import IconDragSvg from '../../../../assets/SVGIcon/view-custom-layout/icon_drag.svg';
import ImageHeaderSvg from '../../../../assets/SVGIcon/view-custom-layout/image_header';
import BaseScreen from '../BaseScreen';
import CustomText from '../../common/Text';
import {Header} from '../Header';
import {widthDevice} from '../../../utils/DeviceUtil';

const NUM_ITEMS = 10;

const getColor = i => {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
};

const exampleData = [...Array(20)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${backgroundColor}`,
    label: String(index),
    backgroundColor,
  };
});

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
    tmpData[index] = {
      ...item,
      isActive: !item.isActive,
    };
    this.setState({
      data: tmpData,
    });
  };
  renderItem = params => {
    const {item, index, isActive, drag} = params;
    return (
      <View style={{borderBottomWidth: 1, borderBottomColor: '#DADCE3'}}>
        <TouchableOpacity
          onPress={() => {
            this.onPressItem({item, index});
          }}
          style={{
            height: 80,
            backgroundColor: isActive ? '#ddd' : '#ffffff',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: 15,
          }}
          onLongPress={drag}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                this.onPressItem({item, index});
              }}>
              {item.isActive ? (
                <IconCheckedSvg width={30} height={30} />
              ) : (
                <IconUnCheckedSvg width={30} height={30} />
              )}
            </TouchableOpacity>
            <CustomText style={{marginLeft: 10}} color="#404040">
              {item.label}
            </CustomText>
          </View>
          <TouchableOpacity onLongPress={drag}>
            <IconDragSvg width={32} height={18} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };
  renderHeader = () => {
    return (
      <View>
        <ImageHeaderSvg
          width={widthDevice}
          height={widthDevice * (134 / 750)}
        />
      </View>
    );
  };
  render() {
    const {data} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <Header title="Customize Layout" />
        <DraggableFlatList
          data={data}
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
