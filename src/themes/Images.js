import RNFS from 'react-native-fs';
import {Platform} from 'react-native';
import replace from 'lodash/replace';

const getImageAssets = (name = '', extendName = '') => {
  if (Platform.OS === 'android') {
    return {
      uri:
        'file://' +
        RNFS.DocumentDirectoryPath +
        '/assets/' +
        replace(name, new RegExp('/', 'g'), '_').toLowerCase(),
      isStatic: true,
    };
  }
  return {
    uri: '' + RNFS.DocumentDirectoryPath + '/assets/src/' + name + extendName,
    isStatic: true,
  };
};

const TYPE_IMAGE = {
  JPG: '.jpg',
  PNG: '.png',
  GIF: '.gif',
};

const DEFINE_REQUIRE = {
  ic_arrow_back: {
    source: require('../../assets/images/ic_arrow_back.png'),
    type: TYPE_IMAGE.PNG,
  },
  ic_search: {
    source: require('../../assets/images/ic_search.png'),
    type: TYPE_IMAGE.PNG,
  },
  default: {
    source: require('../../assets/images/logo_apple_nho.png'),
    type: TYPE_IMAGE.PNG,
  },
  close: {
    source: require('../../assets/images/ic_close.png'),
    type: TYPE_IMAGE.PNG,
  },
  setting_header_image: {
    source: require('../../assets/images/view-setting/header_image.png'),
    type: TYPE_IMAGE.PNG,
    ratio: 750 / 341,
  },
  setting_header_bg: {
    source: require('../../assets/images/view-setting/header_bg.png'),
    type: TYPE_IMAGE.PNG,
    ratio: 750 / 341,
  },
  home_background: {
    source: require('../../assets/images/home_background.png'),
    type: TYPE_IMAGE.PNG,
  },
  bg_menu: {
    source: require('../../assets/images/view-menu/menu-bg.png'),
    type: TYPE_IMAGE.PNG,
    ratio: 543 / 271.5,
  },
  icon_more_menu: {
    source: require('../../assets/images/view-menu/icon_more.png'),
    type: TYPE_IMAGE.PNG,
  },
  bg_bottom_about: {
    source: require('../../assets/images/view-about/bg_bottom.png'),
    type: TYPE_IMAGE.PNG,
    ratio: 750 / 781,
  },
  bg_review_noti: {
    source: require('../../assets/images/view-noti/bg_review_noti.png'),
    type: TYPE_IMAGE.PNG,
    ratio: 750 / 234,
  },
  background_circle: {
    source: require('../../assets/images/background_circle.png'),
    type: TYPE_IMAGE.PNG,
    ratio: 210 / 354,
  },
  background_title_hourly_detail: {
    source: require('../../assets/images/background_title_hourly_detail.png'),
    type: TYPE_IMAGE.PNG,
    ratio: 341 / 70,
  },
};

export const Images = {
  assets: {
    ...DEFINE_REQUIRE,
  },
  init: function (cb = () => {}) {
    const pathAssets =
      Platform.OS === 'ios'
        ? RNFS.DocumentDirectoryPath + '/assets/'
        : 'file://' + RNFS.DocumentDirectoryPath + '/assets/';
    RNFS.exists(pathAssets)
      .then(value => {
        if (value === true && !__DEV__) {
          Object.keys(DEFINE_REQUIRE).map(row => {
            this.assets[row] = getImageAssets(
              'assets/images/' + row,
              this.assets[row].type,
            );
          });
        }
        return new Promise.reject();
      })
      .catch(e => {
        if (cb && typeof cb === 'function') {
          cb();
        }
      });
  },
};
