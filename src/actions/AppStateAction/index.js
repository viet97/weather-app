import {createrAction} from '../RAction';
import {NORMAL_TYPE} from '../ActionTypes';
import {getAction} from '../UtilAction';

const {CHANGE_RESIZE_WINDOW} = NORMAL_TYPE;

const Actions = createrAction({
  actionName: 'AppStateAction',
  actionListNormal: [CHANGE_RESIZE_WINDOW],
});

const changeResizeWindow = data => {
  return getAction({
    Actions: Actions,
    actionName: CHANGE_RESIZE_WINDOW,
    data: data,
  });
};

export default {
  changeResizeWindow,
};
