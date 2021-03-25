import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import BaseCommon from '../BaseCommon';
import {normalize} from '../../../utils/DeviceUtil';
import {withImmutablePropsToJS} from '../../../navigation/NavigationHOC';
import {LanguageAction} from '../../../actions';
import {getStateForKeys} from '../../../utils/Util';
import I18n from '../../../i18n/I18n';

class TranslationText extends BaseCommon {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayName = 'TranslationText';
    I18n.locale = props.language ? props.language : 'vi';
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.language !== this.props.language) {
      I18n.locale = nextProps.language;
    }
  }
  renderContent() {
    const {size, style, color, children, language, ...otherProps} = this.props;
    const colorStyle = {};
    if (color) {
      colorStyle.color = color;
    }
    return (
      <Text
        style={[
          styles.defaultText,
          style,
          {fontSize: normalize(size)},
          colorStyle,
        ]}
        {...otherProps}>
        {children ? I18n.t(children) : ''}
      </Text>
    );
  }
}

TranslationText.defaultProps = {
  size: 16,
};

const styles = StyleSheet.create({
  defaultText: {
    color: '#ffffff99',
  },
});

const mapStateToProps = state => {
  return {
    language: getStateForKeys(state, ['Language', 'language']),
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    changeLanguage: language => {
      return dispatch(LanguageAction.changeLanguage(language));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withImmutablePropsToJS(TranslationText));
