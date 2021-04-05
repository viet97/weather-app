import {createrAction} from '../RAction';
import {NORMAL_TYPE} from '../ActionTypes';
import {getAction} from '../UtilAction';

const {CHANGE_LOCATION} = NORMAL_TYPE;

const Actions = createrAction({
  actionName: 'LanguageAction',
  actionListNormal: [CHANGE_LOCATION],
});

const changeLocation = data => {
  return getAction({
    Actions: Actions,
    actionName: CHANGE_LOCATION,
    data: data,
  });
};

export default {
  changeLocation,
};
