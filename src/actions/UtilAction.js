/* eslint-disable no-shadow */
import {REQUEST_SUBTYPE} from './ActionTypes';
import {myLog} from '../Debug';
import LoadingManager from '../components/element/Loading/LoadingManager';

const {REQUEST, SUCCESS, ERROR} = REQUEST_SUBTYPE;

export const getAction = ({
  Actions = null,
  actionName = '',
  data = {},
  onAfter = (dispatch, getState, data) => {
    return data;
  },
  onBefore = (dispatch, getState, data) => {
    return data;
  },
}) => {
  if (Actions === null || actionName === '') {
    return null;
  }
  return async (dispatch, getState) => {
    onBefore && onBefore(dispatch, getState, data);
    dispatch(Actions[actionName](data));
    onAfter && onAfter(dispatch, getState, data);
  };
};

export const getActionAPI = ({
  Actions = null,
  visibleSpin = false,
  actionName = '',
  delayTime = 100,
  promiseApi = async () => {},
  arg = {},
  dispatchRedux = true,
  dispatchRequest = true,
  isTouch = false,
  isToast = false,
  handlerAfterDismissPopupMessage = () => {},
  onBeforeRequest = (dispatch, getState, arg) => {
    return arg;
  },
  onAfterRequest = (dispatch, getState, arg) => {
    return arg;
  },
  dispatchSuccess = true,
  onBeforeSuccess = (dispatch, getState, data) => {
    return data;
  },
  onAfterSuccess = (dispatch, getState, data) => {
    return data;
  },
  dispatchError = true,
  onBeforeError = (dispatch, getState, data) => {
    return data;
  },
  onAfterError = (dispatch, getState, data) => {
    return data;
  },
}) => {
  if (Actions === null || actionName === '') {
    return null;
  }
  return async (dispatch, getState) => {
    if (visibleSpin) {
      LoadingManager.getInstance().visibleLoading();
    }
    // TcoN.D-Request
    if (onBeforeRequest) {
      let argTmp = onBeforeRequest(dispatch, getState, {
        ...arg,
      });
      if (typeof argTmp === 'object') {
        arg = argTmp;
      }
    }
    dispatchRedux &&
      dispatchRequest &&
      dispatch(
        Actions[actionName + REQUEST]({
          ...arg,
          isTouch,
          isToast,
        }),
      );
    onAfterRequest && onAfterRequest(dispatch, getState, {...arg});
    // TcoN.D-Request
    try {
      // TcoN.D-Success
      onBeforeSuccess && onBeforeSuccess(dispatch, getState);
      const data = await promiseApi();
      if (arg) {
        data.tmpArg = arg;
      }
      dispatchRedux &&
        dispatchSuccess &&
        dispatch(
          Actions[actionName + SUCCESS]({
            ...data,
            isTouch,
            handlerAfterDismissPopupMessage,
          }),
        );
      onAfterSuccess &&
        setTimeout(() => onAfterSuccess(dispatch, getState, data));
      // TcoN.D-Success
      if (visibleSpin) {
        const funcCloseSpin = () => {
          LoadingManager.getInstance().visibleLoading(false);
          handlerCSS && clearTimeout(handlerCSS);
        };
        let handlerCSS = setTimeout(funcCloseSpin, delayTime);
      }
      myLog('GetActionAPI', data);
      return data;
    } catch (err) {
      // TcoN.D-Error
      onBeforeError && onBeforeError(dispatch, getState);
      dispatchRedux &&
        dispatchError &&
        dispatch(
          Actions[actionName + ERROR]({
            ...err,
            isTouch,
            isToast,
            handlerAfterDismissPopupMessage,
          }),
        );
      onAfterError && onAfterError(dispatch, getState, err);
      if (visibleSpin) {
        const funcCloseSpin = () => {
          LoadingManager.getInstance().visibleLoading(false);
          handlerCES && clearTimeout(handlerCES);
        };
        let handlerCES = setTimeout(funcCloseSpin, delayTime);
      }
      // TcoN.D-Error
      throw err;
    }
  };
};
