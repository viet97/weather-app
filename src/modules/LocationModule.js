import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoder';

import Config from '../Config';
import {myLog} from '../Debug';
import NavigationService from '../navigation/NavigationService';
import {getValueFromObjectByKeys} from '../utils/Util';
import {size} from 'lodash';

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
      const lat = getValueFromObjectByKeys(location, ['latitude']);
      const lng = getValueFromObjectByKeys(location, ['longitude']);
      if (lat) {
        LocationModule.lat = lat;
      }
      if (lng) {
        LocationModule.lng = lng;
      }
      return location;
    } catch (error) {
      myLog('getCurrentPositionError', error);
      const {message} = error;
      if (message) {
        NavigationService.getInstance().showToast({message: message});
      }
    }
  },
  lat: 0,
  lng: 0,
  getCurrentAddress: async () => {
    let lat = LocationModule.lat;
    let lng = LocationModule.lng;
    if (!lat || !lng) {
      const location = await LocationModule.getCurrentPosition();
      lat = getValueFromObjectByKeys(location, ['latitude']);
      lng = getValueFromObjectByKeys(location, ['longitude']);
    }
    const geoObject = {
      lat,
      lng,
    };
    let addressStr = '';
    const addressArray = await Geocoder.geocodePosition(geoObject);
    if (size(addressArray) > 0) {
      const {country, locality} = addressArray[0];
      addressStr = `${country}, ${locality}`;
    }
    myLog('getCurrentAddress', addressStr);
    return addressStr;
  },
};

export default LocationModule;
