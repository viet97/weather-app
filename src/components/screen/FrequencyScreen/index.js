import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import BaseScreen from '../BaseScreen';
import IconChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_choice.svg';
import IconNoChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_nochoice.svg';
import {STATUS_BAR_HEIGHT, widthDevice} from '../../../utils/DeviceUtil';
import CustomText from '../../common/Text';
import {Header} from '../Header';

const paddingHorizontalItem = 15;
const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: paddingHorizontalItem,
  },
  wrapTouchItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#DADCE3',
    paddingVertical: 12,
  },
  touchItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelItem: {
    marginLeft: paddingHorizontalItem,
    fontWeight: 'bold',
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
      <View key={index} style={styles.containerItem}>
        <View style={styles.wrapTouchItem}>
          <TouchableOpacity
            onPress={() => {
              this.onPressItem(item);
            }}
            style={styles.touchItem}>
            {value === item.value ? (
              <IconChoiceSvg width={25} height={25} />
            ) : (
              <IconNoChoiceSvg width={25} height={25} />
            )}
            <CustomText style={styles.labelItem} color="#404040">
              {item.label}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  renderContent() {
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
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
