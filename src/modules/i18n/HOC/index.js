import React, {Component} from 'react';
import myI18n from '../I18n';
import {connect} from 'react-redux';
import {getStateForKeys} from '../../../utils/Util';
import LocalStorage from '../../LocalStorage';
import {LanguageAction} from '../../../actions';
import {myLog} from '../../../Debug';

export const typeStringAfterTranslation = {
  capitalize: 'capitalize',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  none: 'none',
  capitalizeInEachWord: 'capitalizeInEachWord',
};

const withI18n = WrappedComponent => {
  class I18nHOC extends Component {
    constructor(props) {
      super(props);
      this.init();
      myI18n.customTranslations = this.translations;
      myI18n.setLocale = this.setLocale;
    }
    init = async () => {
      const localeUserSet = await LocalStorage.getItem(
        LocalStorage.DEFINE_KEY.LAST_LOCALE_SET,
      );
      if (localeUserSet && localeUserSet !== myI18n.locale) {
        this.setLocale(localeUserSet);
      }
    };
    setLocale = async lang => {
      try {
        myLog('set locale', lang);
        await LocalStorage.setItem(
          LocalStorage.DEFINE_KEY.LAST_LOCALE_SET,
          lang,
        );
        const {changeLanguage} = this.props;
        changeLanguage(lang);
      } catch (error) {
        myLog('set locale fail', error);
      }
    };
    translations = (str, options = {type: typeStringAfterTranslation.none}) => {
      try {
        myLog('---translations--->', str, options);
        const {type} = options;
        switch (type) {
          case typeStringAfterTranslation.capitalize:
            return myI18n.t(str).capitalize();
          case typeStringAfterTranslation.uppercase:
            return myI18n.t(str).toUpperCase();
          case typeStringAfterTranslation.lowercase:
            return myI18n.t(str).toLowerCase();
          case typeStringAfterTranslation.capitalizeInEachWord:
            return myI18n.t(str).capitalizeInEachWord();
          default:
            return myI18n.t(str);
        }
      } catch (error) {
        myLog('---error--->', error);
        return str;
      }
    };
    render() {
      try {
        const {locale, changeLanguage} = this.props;
        return (
          <WrappedComponent
            {...this.props}
            setLocaleCustom={this.setLocale}
            I18n={myI18n}
            locale={locale}
            t={this.translations}
          />
        );
      } catch (error) {
        return <WrappedComponent {...this.props} />;
      }
    }
  }
  const mapStateToProps = state => {
    return {
      language: getStateForKeys(state, ['Language', 'language']),
    };
  };

  const mapDispatchToProps = (dispatch, getState) => {
    return {
      changeLanguage: locale => dispatch(LanguageAction.changeLanguage(locale)),
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(I18nHOC);
};

export default withI18n;
