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
import {Colors} from '../../../themes/Colors';
import {DEFINE_LANGUAGE} from '../../../Define';
import withI18n from '../../../modules/i18n/HOC';
import {NORMAL_TYPE} from '../../../actions/ActionTypes';
import {getStateForKeys} from '../../../utils/Util';
import {LanguageAction} from '../../../actions';
import {connect} from 'react-redux';
import {myLog} from '../../../Debug';

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
export const ItemListSetting = props => {
  const {
    onPressItem = () => {},
    item,
    value,
    iconLeft = null,
    iconRight = null,
    customStyle = {},
    txtRight = '',
    noBorder = false,
  } = props;
  return (
    <View style={[styles.containerItem, customStyle]}>
      <View
        style={[styles.wrapTouchItem, noBorder ? {borderBottomWidth: 0} : {}]}>
        <TouchableOpacity
          onPress={() => {
            onPressItem(item);
          }}
          style={[
            styles.touchItem,
            iconRight ? {justifyContent: 'space-between'} : {},
          ]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {iconLeft ? (
              iconLeft
            ) : value === item.value ? (
              <IconChoiceSvg width={normalize(44)} height={normalize(44)} />
            ) : (
              <IconNoChoiceSvg width={normalize(44)} height={normalize(44)} />
            )}
            <CustomText
              medium
              size={32}
              style={styles.labelItem}
              color={Colors.air_quality_text}>
              {item.label}
            </CustomText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {txtRight ? txtRight : null}
            {iconRight ? iconRight : null}
          </View>
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
    this.listTime = Object.values(DEFINE_LANGUAGE);
  }
  onPressItem = item => {
    const {setLocaleCustom} = this.props;
    setLocaleCustom(item.value);
  };
  renderItem = params => {
    const {item, index} = params;
    const {value} = this.state;
    const {language} = this.props;
    myLog('---renderItem--->', this.props);
    return (
      <ItemListSetting
        onPressItem={this.onPressItem}
        key={index}
        item={item}
        value={language}
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
const mapStateToProps = state => {
  return {
    language: getStateForKeys(state, ['Language', 'language']),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeLanguage: value => {
      return dispatch(LanguageAction.changeLanguage(value));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withI18n(LanguageScreen));
