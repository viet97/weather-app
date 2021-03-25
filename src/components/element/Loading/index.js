import React from 'react';
import {View, StyleSheet} from 'react-native';
import RNSpinkit from 'react-native-spinkit';
import PropTypes from 'prop-types';

import BaseElement from '../BaseElement';
import {EmitterManager} from '../../../modules/EmitterManager';
import LoadingManager from './LoadingManager';
import {IS_ANDROID} from '../../../utils/DeviceUtil';

class Loading extends BaseElement {
  constructor(props) {
    super(props);
    this.displayName = 'Loading';
    this.state = {
      loading: false,
    };
    LoadingManager.getInstance().isVisible = false;
    this.isLoadingVideo = props.isLoadingVideo ? true : false;
  }

  _componentDidMount() {
    if (!this.isLoadingVideo) {
      EmitterManager.getInstance().on(
        EmitterManager.listEvent.LOADING_GLOBAL_ON_OFF,
        this._visible,
      );
    }
  }

  _componentWillUnmount() {
    if (!this.isLoadingVideo) {
      EmitterManager.getInstance().off(
        EmitterManager.listEvent.LOADING_GLOBAL_ON_OFF,
        this._visible,
      );
    }
  }

  _visible = (loading = true) => {
    if (this.isLoadingVideo) return;
    LoadingManager.getInstance().isVisible = loading;
    this.setStateSafe({loading});
  };

  renderContent() {
    const {loading} = this.state;
    const isShow = loading || (this.isLoadingVideo && this.props.loading);
    const type = !this.isLoadingVideo ? 'Wave' : IS_ANDROID ? 'Circle' : 'Arc';
    let containerStyle = {
      ...StyleSheet.absoluteFill,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00000099',
    };

    if (this.isLoadingVideo) {
      containerStyle = {
        alignItems: 'center',
        justifyContent: 'center',
        width: 33,
        height: 33,
      };
    }
    if (isShow) {
      return (
        <View style={containerStyle}>
          <RNSpinkit size={33} color={'white'} type={type} />
        </View>
      );
    }
    return null;
  }
}

Loading.propTypes = {
  isLoadingVideo: PropTypes.bool,
  loading: PropTypes.bool,
};

Loading.defaultProps = {
  isLoadingVideo: false,
  loading: false,
};

export default Loading;
