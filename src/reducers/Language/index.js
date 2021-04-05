import Immutable from 'immutable';
import {NORMAL_TYPE} from '../../actions/ActionTypes';
import {locale} from '../../Config';
import myI18n from '../../modules/i18n/I18n';
import {DEFINE_LANGUAGE} from '../../Define';
import {myLog} from '../../Debug';

const initState = Immutable.fromJS({
  language: myI18n.locale,
});

export default (state = initState, action) => {
  switch (action.key) {
    case NORMAL_TYPE.CHANGE_LANGUAGE:
      myLog('--myI18n--', myI18n.locale);
      const locale = action.data || myI18n.locale;
      myI18n.locale = locale;
      return state.setIn(['language'], locale);
    default:
      return state;
  }
};
