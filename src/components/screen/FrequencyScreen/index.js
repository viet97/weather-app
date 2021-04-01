import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import BaseScreen from '../BaseScreen';
import {normalize, widthDevice} from '../../../utils/DeviceUtil';
import {Header} from '../Header';
import {ItemListSetting} from '../LanguageScreen';
import {Colors} from '../../../themes/Colors';

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
});

class FrequencyScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      value: '30p',
    };
    this.listTime = [
      {
        label: '30 minutes',
        value: '30p',
      },
      {
        label: '1 hour',
        value: '1h',
      },
      {
        label: '2 hours',
        value: '2h',
      },
      {
        label: '12 hours',
        value: '12h',
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
    return (
      <ItemListSetting
        key={index}
        value={value}
        onPressItem={this.onPressItem}
        item={item}
      />
    );
  };
  renderContent() {
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          flex: 1,
          width: widthDevice,
        }}>
        <Header title="Update Frequency" />
        <FlatList
          keyExtractor={(item, index) => item.value + index}
          data={this.listTime}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default FrequencyScreen;
