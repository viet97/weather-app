import GetLocation from 'react-native-get-location';
import Config from '../Config';
import {myLog} from '../Debug';
import NavigationService from '../navigation/NavigationService';

const ERROR_CODE = {
  CANCELLED: 'CANCELLED',
  UNAVAILABLE: 'UNAVAILABLE',
  TIMEOUT: 'TIMEOUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
};

const LocationModule = {
  getCurrentPosition: async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });
      myLog('getCurrentPosition', location);
      return location;
    } catch (error) {
      myLog('getCurrentPositionError', error);
      const {message} = error;
      if (message) {
        NavigationService.getInstance().showToast({message: message});
      }
    }
  },
};

export default LocationModule;
