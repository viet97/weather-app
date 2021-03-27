import React from 'react';
import {ScrollView, View} from 'react-native';
import {Colors} from '../../../themes/Colors';
import { Text } from '../../common';
import BaseElement from '../BaseElement';

export default class BarChart extends BaseElement {
  constructor (props) {
    super (props);
    this.state = {};
    this.displayName = 'BarChart';
    this.data = [21 / 30, 16 / 30, 15 / 30, 24 / 30, 22 / 30, 30 / 30, 30 / 30];
    this.aspectRatio = 0.375;
    this.widthBar = 60;
  }

  renderContent () {
    const {
      data,
      renderBottomLabel,
      renderContentBar,
      containerStyle,
      contentContainerStyle,
    } = this.props;

    return (
      <View style={contentContainerStyle}>
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 8}}
        >
          {this.data.map ((it, index) => {
            return (
              <View>
                <View
                  style={{
                    width: this.widthBar,
                    aspectRatio: this.aspectRatio,
                    borderRadius: 22,
                    backgroundColor: '#F5F6FA',
                    marginRight: index !== this.data.length - 1 ? 8 : 0,
                    overflow: 'hidden',
                    justifyContent: 'flex-end',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'red',
                      flex: it,
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: 'blue',
                    width: this.widthBar,
                    marginTop: 8,
                  }}
                >
                  <Text style={{color: Colors.black}}>
                    label1231231231231312
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
