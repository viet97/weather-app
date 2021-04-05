import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import BaseScreen from '../BaseScreen';
import {normalize, widthDevice} from '../../../utils/DeviceUtil';
import {Header} from '../Header';
import {ItemListSetting} from '../LanguageScreen';
import {Colors} from '../../../themes/Colors';
import {DEFINE_UNIT_FREQUENCY} from '../../../Define';
import {connect} from 'react-redux';
import {getStateForKeys} from '../../../utils/Util';
import SettingAction from '../../../actions/SettingAction';
import {NORMAL_TYPE} from '../../../actions/ActionTypes';
import withI18n from '../../../modules/i18n/HOC';

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
    this.listTime = Object.values(DEFINE_UNIT_FREQUENCY);
  }
  onPressItem = item => {
    const {changeValueFrequency, frequencyValue} = this.props;
    if (item.value !== frequencyValue) {
      changeValueFrequency(item.value);
    }
  };
  renderItem = params => {
    const {item, index} = params;
    const {value} = this.state;
    const {frequencyValue, t} = this.props;
    return (
      <ItemListSetting
        key={index}
        value={frequencyValue}
        onPressItem={this.onPressItem}
        item={item}
        t={t}
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

const mapStateToProps = state => {
  return {
    frequencyValue: getStateForKeys(state, ['Setting', 'frequencyValue']),
    language: getStateForKeys(state, ['Language', 'language']),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeValueFrequency: value => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          frequencyValue: value,
          subKey: NORMAL_TYPE.CHANGE_VALUE_FREQUENCY,
        }),
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withI18n(FrequencyScreen));
