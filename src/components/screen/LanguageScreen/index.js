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
    paddingVertical: 18,
  },
  touchItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelItem: {
    marginLeft: paddingHorizontalItem,
  },
});

class LanguageScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {
      value: 'eng',
    };
    this.listTime = [
      {
        label: 'English : English',
        value: 'eng',
      },
      {
        label: 'Vietnamese : Tiếng Việt',
        value: 'vie',
      },
      {
        label: 'Catalan : Català',
        value: 'catalan',
      },
      {
        label: 'Welsh : Cymraeg',
        value: 'welsh',
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
        <Header title="Language" />
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

export default LanguageScreen;
