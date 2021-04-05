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
import {connect} from 'react-redux';
import {NORMAL_TYPE} from '../../../actions/ActionTypes';
import {getStateForKeys} from '../../../utils/Util';
import {myLog} from '../../../Debug';
import SettingAction from '../../../actions/SettingAction';

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
      data: this.props.layout,
    };
  }
  onPressItem = ({item, index}) => {
    let tmpData = [...this.state.data];
    let indexFinal = tmpData.findIndex(x => x.value === item.value);
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
                {item.active ? (
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
  renderContent() {
    const {data} = this.state;
    const {changeLayout} = this.props;
    myLog('----custom layout---', this.props);
    return (
      <View style={styles.containerView}>
        <Header title="Customize Layout" />
        <DraggableFlatList
          data={data}
          extraData={data}
          ListHeaderComponent={this.renderHeader}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.value}`}
          onDragEnd={({data}) => {
            let tmpData = [];
            data.map((item, index) => {
              tmpData.push({...item, index: index + 1});
            });
            this.setState({data: tmpData}, () => {
              myLog('onDragEnd-->', tmpData);
              changeLayout(tmpData);
            });
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    layout: getStateForKeys(state, ['Setting', 'layout']),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    changeLayout: data => {
      return dispatch(
        SettingAction.changeOneValueSetting({
          layout: data,
          subKey: NORMAL_TYPE.CHANGE_LAYOUT,
        }),
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomLayoutScreen);
