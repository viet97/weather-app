import * as React from 'react';
import PropTypes from 'prop-types';

import {shouldComponentUpdate} from '../../utils/RenderUtil';
import BaseComponent from '../BaseComponent';

export default class BaseCommon extends BaseComponent {
  constructor(props) {
    super(props);
    this.displayName = 'BaseCommon';
  }

  renderContent() {
    return null;
  }

  render() {
    if (this.renderContent) {
      return this.renderContent();
    }
    return null;
  }
}

BaseCommon.prototype.shouldComponentUpdate = shouldComponentUpdate;

BaseCommon.contextTypes = {
  displayScreen: PropTypes.string,
};
