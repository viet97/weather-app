import {createrAction} from '../RAction';
import {NORMAL_TYPE} from '../ActionTypes';
import {getAction} from '../UtilAction';

const {CHANGE_LANGUAGE} = NORMAL_TYPE;

const Actions = createrAction({
  actionName: 'LanguageAction',
  actionListNormal: [CHANGE_LANGUAGE],
});

const changeLanguage = data => {
  return getAction({
    Actions: Actions,
    actionName: CHANGE_LANGUAGE,
    data: data,
  });
};

export default {
  changeLanguage,
};
