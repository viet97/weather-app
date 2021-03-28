import {Colors} from './Colors';
import {getStatusBarHeight} from '../utils/DeviceUtil';

export const ApplicationStyle = {
  textMore: '● ● ●',
  containerScreen: {
    flex: 1,
    backgroundColor: Colors.white,
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
