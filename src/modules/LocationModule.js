import GetLocation from 'react-native-get-location';
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
      return location;
    } catch (error) {
      const {message} = error;
      if (message) {
        NavigationService.getInstance().showToast({message: message});
      }
    }
  },
};

export default LocationModule;
