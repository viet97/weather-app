import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import BaseScreen from '../BaseScreen';
import IconChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_choice.svg';
import IconNoChoiceSvg from '../../../../assets/SVGIcon/view-frequency/icon_nochoice.svg';
import {
  normalize,
  STATUS_BAR_HEIGHT,
  widthDevice,
} from '../../../utils/DeviceUtil';
import CustomText from '../../common/Text';
import {Header} from '../Header';

const paddingHorizontalItem = normalize(30);
const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: paddingHorizontalItem,
  },
  wrapTouchItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(218, 220, 227, 0.6)',
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
export const ItemListSetting = props => {
  const {onPressItem = () => {}, item, value} = props;
  return (
    <View style={styles.containerItem}>
      <View style={styles.wrapTouchItem}>
        <TouchableOpacity
          onPress={() => {
            onPressItem(item);
          }}
          style={styles.touchItem}>
          {value === item.value ? (
            <IconChoiceSvg width={normalize(44)} height={normalize(44)} />
          ) : (
            <IconNoChoiceSvg width={normalize(44)} height={normalize(44)} />
          )}
          <CustomText size={32} style={styles.labelItem} color="#404040">
            {item.label}
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
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
      <ItemListSetting
        onPressItem={this.onPressItem}
        key={index}
        item={item}
        value={value}
      />
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