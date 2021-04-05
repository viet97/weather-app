import I18n from 'react-native-i18n';
import vi from './locale/vi';
import en from './locale/en';
import ca from './locale/catalan';
import de from './locale/de';
import it from './locale/it';
import pl from './locale/pl';
import pt from './locale/pt';
import sl from './locale/sl';
import sv from './locale/sv';
import we from './locale/we';
import {DEFINE_LANGUAGE} from '../../Define';

I18n.fallbacks = true;

I18n.translations = {
  vi,
  en,
  uk: require('./languages/uk.json'),
  ca,
  de,
  it,
  pl,
  pt,
  sl,
  sv,
  we,
};
I18n.locale = DEFINE_LANGUAGE.eng.value;
I18n.customTranslations = str => {
  return I18n.t(str);
};

export default I18n;
