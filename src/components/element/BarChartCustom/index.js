import {size} from 'lodash';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Colors} from '../../../themes/Colors';
import {Text} from '../../common';
import BaseElement from '../BaseElement';

export default class BarChartCustom extends BaseElement {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayName = 'BarChartCustom';
    this.aspectRatio = 0.375;
    this.widthBar = 60;
  }

  getDataPercentage = () => {
    const {data} = this.props;
    if (size(data) === 0) return data;
    const maxValue = Math.max(...data);
    this._debugLog('getDataPercentage', data);
    return data.map(it => it / maxValue);
  };

  renderContent() {
    const {
      data,
      renderBottomLabel,
      renderContentBar,
      style,
      contentContainerStyle,
    } = this.props;

    return (
      <View style={style}>
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}>
          {this.getDataPercentage().map((it, index) => {
            return (
              <View>
                <View
                  style={{
                    width: this.widthBar,
                    aspectRatio: this.aspectRatio,
                    borderRadius: 22,
                    backgroundColor: Colors.backgroundGray,
                    marginRight: index !== size(data) - 1 ? 8 : 0,
                    overflow: 'hidden',
                    flex: 1,
                  }}>
                  {renderContentBar &&
                    renderContentBar({value: data[index], ratio: it * 0.8})}
                </View>
                {renderBottomLabel && renderBottomLabel({index})}
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
