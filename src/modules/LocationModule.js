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
    if (Config.debug) {
      const geoObject = {
        latitude: 21.027763,
        longitude: 105.83416,
      };
      LocationModule.lat = geoObject.latitude;
      LocationModule.lng = geoObject.longitude;
      return geoObject;
    }
    if (LocationModule.lat !== 0 && LocationModule.lng !== 0) {
      return {
        latitude: LocationModule.lat,
        longitude: LocationModule.lng,
      };
    }
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
  address_info: null,
  getCurrentAddressInfo: async () => {
    if (LocationModule.address_info) {
      return LocationModule.address_info;
    }

    const location = await LocationModule.getCurrentPosition();
    lat = getValueFromObjectByKeys(location, ['latitude']);
    lng = getValueFromObjectByKeys(location, ['longitude']);
    const geoObject = {
      lat,
      lng,
    };
    const addressArray = await Geocoder.geocodePosition(geoObject);

    if (size(addressArray) > 0) {
      LocationModule.address_info = addressArray[0];
      myLog('getCurrentAddress', addressArray[0]);

      return addressArray[0];
    }
    return null;
  },
  getCurrentAddressStr: async () => {
    const currentAddressInfo = await LocationModule.getCurrentAddressInfo();
    const {country, locality} = currentAddressInfo;
    addressStr = `${locality}, ${country}`;

    return addressStr;
  },
};

export default LocationModule;
