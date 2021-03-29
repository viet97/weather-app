import * as React from 'react';
import PropTypes from 'prop-types';

import {shouldComponentUpdate} from '../../utils/RenderUtil';
import {ApplicationStyle} from '../../themes/ApplicationStyle';
import {StyleSheet, View, BackHandler} from 'react-native';
import {myLog} from '../../Debug';
import {Text} from '../common';
import BaseComponent from '../BaseComponent';

export default class BaseScreen extends BaseComponent {
  constructor(props) {
    super(props);
    this.displayName = 'BaseScreen';
    this.useExitApp = true;
  }

  componentDidMount() {
    this._componentDidMount && this._componentDidMount();
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {};

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.mounted = false;
    this._componentWillUnmount && this._componentWillUnmount();
  }

  callbackSafe = (cb, ...arg) => {
    if (!this.mounted) {
      return;
    }
    cb && cb.call(this, ...arg);
  };

  setStateSafe = (state, callback) => {
    this.callbackSafe(() => this.setState(state, callback));
  };

  _debugLog = (...arg) => {
    if (this.debug) {
      myLog('Screen (' + this.displayName + ') : ', ...arg);
    }
  };

  renderContent() {
    return <Text>{this.displayName}</Text>;
  }

  render() {
    return (
      <React.Fragment>
        <View
          style={[ApplicationStyle.containerScreen, StyleSheet.absoluteFill]}>
          {this.renderContent()}
        </View>
      </React.Fragment>
    );
  }
}

BaseScreen.prototype.shouldComponentUpdate = shouldComponentUpdate;
