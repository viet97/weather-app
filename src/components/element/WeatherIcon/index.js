import React from 'react';
import {Image} from '../../common';
import BaseElement from '../BaseElement';

export default class WeatherIcon extends BaseElement {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayName = 'WeatherIcon';
  }

  renderContent() {
    const {style, icon} = this.props;
    this._debugLog('WeatherIcon', icon);
    if (!icon) return null;
    return (
      <Image
        source={{uri: `https://openweathermap.org/img/wn/${icon}@2x.png`}}
        style={style}
      />
    );
  }
}
