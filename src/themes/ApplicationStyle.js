import {Colors} from './Colors';
import {getStatusBarHeight} from '../utils/DeviceUtil';

export const ApplicationStyle = {
  textMore: '● ● ●',
  containerScreen: {
    flex: 1,
    backgroundColor: Colors.STACK_BACKGROUND_COLOR,
  },
  menuDrawScreen: {
    flex: 1,
    backgroundColor: Colors.backgroundScreen,
  },
  contentScreen: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    backgroundColor: Colors.backgroundScreen,
  },
};

export default ApplicationStyle;
