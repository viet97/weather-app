import React from 'react';
import RootSiblings from 'react-native-root-siblings';

class DialogGlobal {
  static getInstance() {
    if (!this._instance) {
      this._instance = new DialogGlobal();
    }
    return this._instance;
  }

  static clear() {
    if (this._instance) {
      this._instance.destroy();
      delete this._instance;
    }
  }

  constructor() {
    this.displayName = 'DialogGlobal';
    this.dialog = null;
    this.showed = false;
  }

  showDialog = (content, duration) => {
    this.destroyLastDialog();
    if (duration) {
      this.displayTimeout = setTimeout(this.destroyLastDialog, duration);
    }
    this.dialog = new RootSiblings(content);
  }

  isShowed = () => {
    return this.dialog;
  };

  destroyLastDialog = () => {
    if (this.displayTimeout) {
      clearTimeout(this.displayTimeout);
      this.displayTimeout = null;
    }
    this.dialog && this.dialog.destroy();
    this.dialog = null;
  };
}

export default DialogGlobal;
