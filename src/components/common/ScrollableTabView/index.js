/* eslint-disable no-undef */
import React from 'react';
import {
  ViewPropTypes,
  Dimensions,
  View,
  Animated,
  Platform,
  StyleSheet,
  EventEmitter,
} from 'react-native';
import PropTypes from 'prop-types';
import ViewPagerAndroid from '@react-native-community/viewpager';
import SceneComponent from './SceneComponent';
import DefaultTabBar from './DefaultTabBar';
import ScrollableTabBar from './ScrollableTabBar';
import BaseCommon from '../BaseCommon';
import {EmitterManager} from '../../../modules/EmitterManager';

export {ScrollableTabBar, DefaultTabBar};

const AnimatedViewPagerAndroid =
  Platform.OS === 'android'
    ? Animated.createAnimatedComponent(ViewPagerAndroid)
    : undefined;

class ScrollableTabView extends BaseCommon {
  static DefaultTabBar = DefaultTabBar;
  static ScrollableTabBar = ScrollableTabBar;
  constructor(props) {
    super(props);
    this.displayName = 'ScrollableTabView';
    this.scrollOnMountCalled = false;
    this._initState(props);
  }
  _initState = props => {
    const containerWidth = Dimensions.get('window').width;
    let scrollValue;
    let scrollXIOS;
    let positionAndroid;
    let offsetAndroid;

    if (Platform.OS === 'ios') {
      scrollXIOS = new Animated.Value(this.props.initialPage * containerWidth);
      const containerWidthAnimatedValue = new Animated.Value(containerWidth);
      // Need to call __makeNative manually to avoid a native animated bug. See
      // https://github.com/facebook/react-native/pull/14435
      containerWidthAnimatedValue.__makeNative();
      scrollValue = Animated.divide(scrollXIOS, containerWidthAnimatedValue);

      const callListeners = this._polyfillAnimatedValue(scrollValue);
      scrollXIOS.addListener(({value}) =>
        callListeners(value / this.state.containerWidth),
      );
    } else {
      positionAndroid = new Animated.Value(this.props.initialPage);
      offsetAndroid = new Animated.Value(0);
      scrollValue = Animated.add(positionAndroid, offsetAndroid);

      const callListeners = this._polyfillAnimatedValue(scrollValue);
      let positionAndroidValue = this.props.initialPage;
      let offsetAndroidValue = 0;
      positionAndroid.addListener(({value}) => {
        positionAndroidValue = value;
      });
      offsetAndroid.addListener(({value}) => {
        offsetAndroidValue = value;
        callListeners(positionAndroidValue + offsetAndroidValue);
      });
    }
    this.state = {
      currentPage: this.props.initialPage,
      scrollValue,
      scrollXIOS,
      positionAndroid,
      offsetAndroid,
      containerWidth,
    };
  };
  _componentDidMount() {
    EmitterManager.getInstance().on(
      EmitterManager.listEvent.GO_TO_PAGE_SCROLLTAB,
      this.goToPage,
    );
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.updateSceneKeys({
        page: this.state.currentPage,
      });
    }

    if (nextProps.page >= 0 && nextProps.page !== this.state.currentPage) {
      this.goToPage(nextProps.page);
    }
  }
  _componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.state.scrollXIOS.removeAllListeners();
    } else {
      this.state.positionAndroid.removeAllListeners();
      this.state.offsetAndroid.removeAllListeners();
    }
  }
  goToPage = pageNumber => {
    if (Platform.OS === 'ios') {
      const offset = pageNumber * this.state.containerWidth;
      if (this.scrollView) {
        this.scrollView.scrollTo({
          x: offset,
          y: 0,
          animated: !this.props.scrollWithoutAnimation,
        });
      }
    } else {
      if (this.scrollView) {
        if (this.props.scrollWithoutAnimation) {
          this.scrollView.setPageWithoutAnimation(pageNumber);
        } else {
          this.scrollView.setPage(pageNumber);
        }
      }
    }

    const currentPage = this.state.currentPage;
    this.updateSceneKeys({
      page: pageNumber,
      callback: this._onChangeTab.bind(this, currentPage, pageNumber),
    });
  };
  renderTabBar = props => {
    if (this.props.renderTabBar === false) {
      return null;
    } else if (this.props.renderTabBar) {
      return React.cloneElement(this.props.renderTabBar(props), props);
    } else {
      return <DefaultTabBar {...props} />;
    }
  };
  updateSceneKeys = ({page, callback = () => {}}) => {
    this.setStateSafe({currentPage: page}, callback);
  };

  _polyfillAnimatedValue = animatedValue => {
    const listeners = new Set();
    const addListener = listener => {
      listeners.add(listener);
    };

    const removeListener = listener => {
      listeners.delete(listener);
    };

    const removeAllListeners = () => {
      listeners.clear();
    };

    animatedValue.addListener = addListener;
    animatedValue.removeListener = removeListener;
    animatedValue.removeAllListeners = removeAllListeners;

    return value => listeners.forEach(listener => listener({value}));
  };
  _shouldRenderSceneKey = (idx, currentPageKey) => {
    let numOfSibling = this.props.prerenderingSiblingsNumber;
    return (
      idx < currentPageKey + numOfSibling + 1 &&
      idx > currentPageKey - numOfSibling - 1
    );
  };

  renderScrollableContent = () => {
    const {keyView, forceUpdate} = this.props;
    if (Platform.OS === 'ios') {
      const scenes = this._composeScenes(forceUpdate);
      return (
        <Animated.ScrollView
          key={keyView ? keyView : this._children().length}
          horizontal
          pagingEnabled
          automaticallyAdjustContentInsets={false}
          contentOffset={{
            x: this.props.initialPage * this.state.containerWidth,
          }}
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: this.state.scrollXIOS}}}],
            {useNativeDriver: true, listener: this._onScroll},
          )}
          onMomentumScrollBegin={this._onMomentumScrollBeginAndEnd}
          onMomentumScrollEnd={this._onMomentumScrollBeginAndEnd}
          scrollEventThrottle={16}
          scrollsToTop={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!this.props.locked}
          directionalLockEnabled
          alwaysBounceVertical={false}
          keyboardDismissMode="on-drag"
          {...this.props.contentProps}>
          {scenes}
        </Animated.ScrollView>
      );
    } else {
      const scenes = this._composeScenes(forceUpdate);
      return (
        <AnimatedViewPagerAndroid
          key={keyView ? keyView : this._children().length}
          style={styles.scrollableContentAndroid}
          initialPage={this.props.initialPage}
          onPageSelected={this._updateSelectedPage}
          keyboardDismissMode="on-drag"
          scrollEnabled={!this.props.locked}
          onPageScroll={Animated.event(
            [
              {
                nativeEvent: {
                  position: this.state.positionAndroid,
                  offset: this.state.offsetAndroid,
                },
              },
            ],
            {
              useNativeDriver: true,
              listener: this._onScroll,
            },
          )}
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          {...this.props.contentProps}>
          {scenes}
        </AnimatedViewPagerAndroid>
      );
    }
  };
  _composeScenes = forceUpdate => {
    return this._children().map((child, idx) => {
      return (
        <SceneComponent
          forceUpdate={forceUpdate}
          key={child.key}
          shouldUpdated={this._shouldRenderSceneKey(
            idx,
            this.state.currentPage,
          )}
          style={{width: this.state.containerWidth}}>
          {child}
        </SceneComponent>
      );
    });
  };
  _onMomentumScrollBeginAndEnd = e => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / this.state.containerWidth);
    if (this.state.currentPage !== page) {
      this._updateSelectedPage(page);
    }
  };

  _updateSelectedPage = nextPage => {
    let localNextPage = nextPage;
    if (typeof localNextPage === 'object') {
      localNextPage = nextPage.nativeEvent.position;
    }

    const currentPage = this.state.currentPage;
    this.updateSceneKeys({
      page: localNextPage,
      callback: this._onChangeTab.bind(this, currentPage, localNextPage),
    });
  };

  _onChangeTab = (prevPage, currentPage) => {
    this.props.onChangeTab({
      i: currentPage,
      ref: this._children()[currentPage],
      from: prevPage,
    });
  };

  _onScroll = e => {
    if (Platform.OS === 'ios') {
      const offsetX = e.nativeEvent.contentOffset.x;
      if (offsetX === 0 && !this.scrollOnMountCalled) {
        this.scrollOnMountCalled = true;
      } else {
        this.props.onScroll(offsetX / this.state.containerWidth);
      }
    } else {
      const {position, offset} = e.nativeEvent;
      this.props.onScroll(position + offset);
    }
  };

  _handleLayout = e => {
    const {width} = e.nativeEvent.layout;

    if (
      !width ||
      width <= 0 ||
      Math.round(width) === Math.round(this.state.containerWidth)
    ) {
      return;
    }

    if (Platform.OS === 'ios') {
      const containerWidthAnimatedValue = new Animated.Value(width);
      // Need to call __makeNative manually to avoid a native animated bug. See
      // https://github.com/facebook/react-native/pull/14435
      containerWidthAnimatedValue.__makeNative();
      scrollValue = Animated.divide(
        this.state.scrollXIOS,
        containerWidthAnimatedValue,
      );
      this.setStateSafe({containerWidth: width, scrollValue});
    } else {
      this.setStateSafe({containerWidth: width});
    }
    if (this.timeoutVar) {
      clearTimeout(this.timeoutVar);
      this.timeoutVar = null;
    }
    const callback = () => {
      this.goToPage(this.state.currentPage);
    };
    this.timeoutVar = setTimeout(callback);
  };
  _children = (children = this.props.children) => {
    return React.Children.map(children, child => child);
  };

  renderContent() {
    const {customOutputRangeTabBar, tabBarStyle, tabStyle = {}} = this.props;
    let overlayTabs =
      this.props.tabBarPosition === 'overlayTop' ||
      this.props.tabBarPosition === 'overlayBottom';
    let tabBarProps = {
      goToPage: this.goToPage,
      tabs: this._children().map(child => child.props.tabLabel),
      activeTab: this.state.currentPage,
      scrollValue: this.state.scrollValue,
      containerWidth: this.state.containerWidth,
      customOutputRangeTabBar,
    };

    if (this.props.tabBarBackgroundColor) {
      tabBarProps.backgroundColor = this.props.tabBarBackgroundColor;
    }
    if (this.props.tabBarActiveTextColor) {
      tabBarProps.activeTextColor = this.props.tabBarActiveTextColor;
    }
    if (this.props.tabBarInactiveTextColor) {
      tabBarProps.inactiveTextColor = this.props.tabBarInactiveTextColor;
    }
    if (this.props.tabBarTextStyle) {
      tabBarProps.textStyle = this.props.tabBarTextStyle;
    }
    if (this.props.tabBarUnderlineStyle) {
      tabBarProps.underlineStyle = this.props.tabBarUnderlineStyle;
    }
    if (this.props.customStyleTabBarText) {
      tabBarProps.customStyleTabBarText = this.props.customStyleTabBarText;
    }
    if (overlayTabs) {
      tabBarProps.style = {
        position: 'absolute',
        left: 0,
        right: 0,
        [this.props.tabBarPosition === 'overlayTop' ? 'top' : 'bottom']: 0,
      };
    }
    if (tabBarStyle) {
      tabBarProps.style = {
        ...tabBarProps.style,
        ...tabBarStyle,
      };
    }
    if (tabStyle) {
      tabBarProps.tabStyle = tabStyle;
    }

    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={this._handleLayout}>
        {this.props.tabBarPosition === 'top' && this.renderTabBar(tabBarProps)}
        {this.renderScrollableContent()}
        {(this.props.tabBarPosition === 'bottom' || overlayTabs) &&
          this.renderTabBar(tabBarProps)}
      </View>
    );
  }
}

ScrollableTabView.propTypes = {
  tabBarPosition: PropTypes.oneOf([
    'top',
    'bottom',
    'overlayTop',
    'overlayBottom',
  ]),
  initialPage: PropTypes.number,
  page: PropTypes.number,
  onChangeTab: PropTypes.func,
  onScroll: PropTypes.func,
  renderTabBar: PropTypes.any,
  style: ViewPropTypes.style,
  contentProps: PropTypes.object,
  scrollWithoutAnimation: PropTypes.bool,
  locked: PropTypes.bool,
  prerenderingSiblingsNumber: PropTypes.number,
};

ScrollableTabView.defaultProps = {
  tabBarPosition: 'top',
  initialPage: 0,
  page: -1,
  onChangeTab: () => {},
  onScroll: () => {},
  contentProps: {},
  scrollWithoutAnimation: false,
  locked: false,
  prerenderingSiblingsNumber: 0,
  activeTextColor: 'red',
};

export default ScrollableTabView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollableContentAndroid: {
    flex: 1,
  },
});
