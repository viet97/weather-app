import React from 'react';
import { ScrollView, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import SVGIcon from '../../../../assets/SVGIcon';
import { Colors } from '../../../themes/Colors';
import { widthDevice } from '../../../utils/DeviceUtil';
import { Text } from '../../common';
import BaseScreen from '../BaseScreen';

export default class HomeScreen extends BaseScreen {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayName = 'HomeScreen';
  }

  renderContent() {
    return (
      <View
        style={{ flex: 1, marginTop: 50 }}>
        <ScrollView
          horizontal>
          <View>
            <LineChart
              data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ]
                  }
                ]
              }}
              width={widthDevice} // from react-native
              height={300}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              fromZero
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `#e26a00`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                }
              }}
              getDotColor={() => Colors.BLUE}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
              withHorizontalLabels={false}
            />
            <View style={{ flexDirection: "row" }}>
              <Text>123123121</Text>
              <Text>123123121</Text>
              <Text>123123121</Text>
              <Text>123123121</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
