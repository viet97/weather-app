import {createrAction} from '../RAction';
import {NORMAL_TYPE} from '../ActionTypes';
import {getAction} from '../UtilAction';
import {myLog} from '../../Debug';

const {
  CHANGE_RESIZE_WINDOW,
  CHANGE_VALUE_FREQUENCY,
  CHANGE_DATA_SOURCE,
  CHANGE_TIME_FORMAT,
  CHANGE_LANGUAGE,
  CHANGE_LAYOUT,
  CHANGE_VALUE_DAILY_NOTIFICATION,
  CHANGE_MULTI_VALUE_SETTING,
  CHANGE_VALUE_SETTING,
} = NORMAL_TYPE;

const Actions = createrAction({
  actionName: 'AppStateAction',
  actionListNormal: [
    CHANGE_RESIZE_WINDOW,
    CHANGE_MULTI_VALUE_SETTING,
    CHANGE_VALUE_SETTING,
  ],
});

const changeResizeWindow = data => {
  return getAction({
    Actions: Actions,
    actionName: CHANGE_RESIZE_WINDOW,
    data: data,
  });
};
const changeMultiValueSetting = data => {
  myLog('changeMultiValueSetting--->', data);
  return getAction({
    Actions: Actions,
    actionName: CHANGE_MULTI_VALUE_SETTING,
    data: data,
  });
};
const changeOneValueSetting = data => {
  return getAction({
    Actions: Actions,
    actionName: CHANGE_VALUE_SETTING,
    data: data,
  });
};

export default {
  changeResizeWindow,
  changeMultiValueSetting,
  changeOneValueSetting,
};
