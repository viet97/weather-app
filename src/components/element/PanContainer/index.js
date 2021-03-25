import React from 'react';
import {PanResponder, StyleSheet, Animated} from 'react-native';

type Props = {
  onLeftValueChange?: Function,
  onRightValueChange?: Function,
  onRelease?: Function,
  onStart?: Function,
};
export default class PanContainer extends React.PureComponent<Props> {
  static defaultProps = {
    onLeftValueChange: () => {},
    onRightValueChange: () => {},
    onRelease: () => {},
    onStart: () => {},
  };

  constructor(props) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.onPanStartShouldSetPanResponder,

      onMoveShouldSetPanResponder: this.onPanMoveShouldSetPanResponder,

      onPanResponderMove: this.onPanResponderMove,

      onPanResponderRelease: this.onPanRelease,
    });
  }

  onPanMoveShouldSetPanResponder = (event, gestureState) => {
    return true;
  };

  onPanStartShouldSetPanResponder = (event, gestureState) => {

    return true;
  };

  onPanResponderMove = (event, gestureState) => {

  };

  onPanRelease = (event, gestureState) => {

  };

  render() {
    const {style, children} = this.props;
    return (
      <Animated.View
        style={[styles.container, style]}
        {...this.panResponder.panHandlers}>
        {children}
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
