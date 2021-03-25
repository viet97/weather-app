import * as React from 'react';
import {
  CommonActions,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';
import { Keyboard, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';
import AppInfoManager from '../AppInfoManager';
import { getStateForKeys, getValueFromObjectByKeys } from '../utils/Util';
import { isString } from '../modules/Lodash';
import { DialogGlobal } from '../components/element';
import NetworkModule from '../modules/NetworkStateModule';
import { myLog } from '../Debug';

let timeoutVar = null;

const defaulFunc = () => { };

export default class NavigationService {
  static getInstance(navigation) {
    if (!this._instance) {
      if (navigation) this._instance = new NavigationService(navigation);
    } else {
      if (navigation) {
        this.navigation = navigation;
      }
    }
    return this._instance;
  }
  static clear() {
    if (this._instance) {
      this._instance.destroy();
      delete this._instance;
    }
  }
  constructor(navigation) {
    this.displayName = 'NavigationService';
    this.navigation = navigation;
  }
  _checkNavigation() {
    return !!this.navigation && !!this.navigation.dispatch;
  }
  getStateRedux(keys = [], state = undefined) {
    const store = AppInfoManager.getInstance().getStore();
    if (!store) {
      return undefined;
    }
    return getStateForKeys(state ? state : store.getState(), keys);
  }
  setCurrentScreen(displayName) {
    this.currentScreen = displayName;
  }
  getCurrentScreen() {
    return this.currentScreen;
  }
  getRootState() {
    if (!this._checkNavigation()) {
      return undefined;
    }
    return this.navigation.getRootState();
  }
  destroy() {
    if (this.navigation) {
      delete this.navigation;
    }
  }
  //   Public Func
  getDataParams(props, keys = []) {
    if (!this._checkNavigation()) {
      return;
    }
    return getValueFromObjectByKeys(props, ['route', 'params', ...keys]);
  }
  closeDrawer({ time = 0 } = { time: 0 }) {
    if (!this._checkNavigation()) {
      return;
    }
    if (timeoutVar) {
      clearTimeout(timeoutVar);
      timeoutVar = null;
    }
    const callback = () => {
      this.navigation.dispatch(DrawerActions.closeDrawer());
    };
    timeoutVar = setTimeout(callback, time);
  }
  navigate({ routerName, params }) {
    const currentRouteName = this.getCurrentScreen();
    myLog('--currentRouteName---', currentRouteName);
    if (!this._checkNavigation() || !routerName) {
      return;
    }
    if (!NetworkModule.isConnected) {
      alert('no network')
      return;
    }
    const name = isString(routerName) ? routerName : routerName.name;
    Keyboard.dismiss();
    this.navigation.dispatch(
      CommonActions.navigate({
        name: name,
        params: params,
      }),
    );
  }
  goBack({ n = 1 } = { n: 1 }) {
    if (!this._checkNavigation()) {
      return;
    }
    const popAction = StackActions.pop(n); // CommonActions.goBack();
    if (timeoutVar) {
      clearTimeout(timeoutVar);
      timeoutVar = null;
    }
    const callback = () => {
      this.navigation.dispatch(popAction);
    };
    timeoutVar = setTimeout(callback);
  }
  reset({ routerName, params, time = 100 }) {
    if (!this._checkNavigation()) {
      return;
    }
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: routerName,
          params: params,
        },
      ],
    });
    if (timeoutVar) {
      clearTimeout(timeoutVar);
      timeoutVar = null;
    }
    const callback = () => {
      this.navigation.dispatch(resetAction);
    };
    timeoutVar = setTimeout(callback, 0);
  }
  showToast(
    {
      message = '',
      second = 3,
      onShow = () => { },
      onHide = () => { },
      onShown = () => { },
      onHidden = () => { },
    } = {
        message: '',
        second: 3,
        onShow: () => { },
        onHide: () => { },
        onShown: () => { },
        onHidden: () => { },
      },
  ) {
    if (this.toast) {
      Toast.hide(this.toast);
      this.toast = null;
    }
    const configToast = {
      duration: Toast.durations.LONG,
      position: -60,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: onShow,
      onShown: onShown,
      onHide: onHide,
      onHidden: onHidden,
      useNativeDriver: true,
    };
    this.toast = Toast.show(message, configToast);
    if (timeoutVar) {
      clearTimeout(timeoutVar);
      timeoutVar = null;
    }
    const callback = () => {
      Toast.hide(this.toast);
      this.toast = null;
    };
    timeoutVar = setTimeout(callback, second * 1000);
  }
  showDialogNotice(
    {
      isImportant = false,
      title = 'Thông báo',
      message = 'Thông báo mặc định!',
      image = undefined,
      heightImage = undefined,
      ratioImage = undefined,
      onAction = defaulFunc,
      onClose = defaulFunc,
      // onCancel = defaulFunc,
      titleAction = 'Đóng',
      contentBody = undefined,
    } = {
        isImportant: false,
        title: 'Thông báo',
        message: 'Thông báo mặc định!',
        image: undefined,
        heightImage: undefined,
        ratioImage: undefined,
        onAction: defaulFunc,
        onClose: defaulFunc,
        // onCancel: defaulFunc,
        titleAction: 'Đóng',
        contentBody: undefined,
      },
  ) {
    DialogGlobal.getInstance().showDialog({
      type: DialogGlobal.TypeDialog.DIALOG_NOTICE,
      title: title,
      message: message,
      image: image,
      isImportant: isImportant,
      onAction: onAction,
      // onCancel: onCancel,
      onDismissed: onClose,
      titleAction: titleAction,
      heightImage: heightImage,
      ratioImage: ratioImage,
      contentBody,
    });
  }
  showDialogConfirm(
    {
      isImportant = false,
      title = 'Xác nhận',
      message = 'Thông báo mặc định!',
      image = undefined,
      heightImage = undefined,
      ratioImage = undefined,
      onAccept = defaulFunc,
      onClose = defaulFunc,
      onCancel = defaulFunc,
      titleAccept = 'Đồng ý',
      titleCancel = 'Đóng',
    } = {
        isImportant: false,
        title: 'Xác nhận',
        message: 'Thông báo mặc định!',
        image: undefined,
        heightImage: undefined,
        ratioImage: undefined,
        onAccept: defaulFunc,
        onClose: defaulFunc,
        onCancel: defaulFunc,
        titleAccept: 'Đồng ý',
        titleCancel: 'Đóng',
      },
  ) {
    DialogGlobal.getInstance().showDialog({
      type: DialogGlobal.TypeDialog.DIALOG_CONFIRM,
      title: title,
      message: message,
      image: image,
      isImportant: isImportant,
      onAccept: onAccept,
      onCancel: onCancel,
      onDismissed: onClose,
      titleAccept: titleAccept,
      titleCancel: titleCancel,
      heightImage: heightImage,
      ratioImage: ratioImage,
    });
  }

  showDialogMultiAction(
    {
      isImportant = false,
      title = 'Xác nhận',
      message = 'Thông báo mặc định!',
      image = undefined,
      heightImage = undefined,
      ratioImage = undefined,
      onClose = defaulFunc,
      actionList = [],
    } = {
        isImportant: false,
        title: 'Xác nhận',
        message: 'Thông báo mặc định!',
        image: undefined,
        heightImage: undefined,
        ratioImage: undefined,
        onClose: defaulFunc,
        actionList: [],
      },
  ) {
    DialogGlobal.getInstance().showDialog({
      type: DialogGlobal.TypeDialog.DIALOG_MULTI_ACTION,
      title: title,
      message: message,
      image: image,
      isImportant: isImportant,
      onDismissed: onClose,
      actionList: actionList,
      heightImage: heightImage,
      ratioImage: ratioImage,
    });
  }

  hideDialog() {
    DialogGlobal.getInstance().hideDialog();
  }
}

const styles = StyleSheet.create({});

export const NavigationServiceRq = NavigationService;
