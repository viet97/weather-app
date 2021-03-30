import { IS_ANDROID } from '../utils/DeviceUtil';

export const TYPE_FONT_SIZE = {
  TITLE_TAB: 13,
  TITLE_MENU_DRAW_ITEM: 14,
};
export const KEY_FONT = {
  light: IS_ANDROID ? 'SF-Pro-Display-Light' : 'SFProDisplay-Light',
  thin: IS_ANDROID ? 'SF-Pro-Display-Thin' : 'SFProDisplay-Thin',
  medium: IS_ANDROID ? 'SF-Pro-Display-Medium' : 'SFProDisplay-Medium',
  bold: IS_ANDROID ? 'SF-Pro-Display-Bold' : 'SFProDisplay-Bold',
  regular: IS_ANDROID ? 'SF-Pro-Display-Regular' : 'SFProDisplay-Regular',
  semiBold: IS_ANDROID ? 'SF-Pro-Display-Semibold' : 'SFProDisplay-Semibold',
};
