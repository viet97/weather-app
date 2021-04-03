import I18n from 'react-native-i18n';
import vi from './locale/vi';
import en from './locale/en';
import {DEFINE_LANGUAGE} from '../../Define';

I18n.fallbacks = true;

I18n.translations = {
  vi,
  en,
  uk: require('./languages/uk.json'),
};
I18n.locale = DEFINE_LANGUAGE.eng.value;
I18n.customTranslations = str => {
  return I18n.t(str);
};

export default I18n;
