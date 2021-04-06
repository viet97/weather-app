import Connector from '../../connection/Connector';
import ConfigStore from '../../container/ConfigStore';
import {myLog} from '../../Debug';
import {DEFINE_DATA_SOURCE} from '../../Define';
import LocalStorage from '../../modules/LocalStorage';
import {
  deepCopyObject,
  getStateForKeys,
  getValueFromObjectByKeys,
} from '../../utils/Util';
import {AdapterManager} from '../adapter';
import {openWeatherManager} from '../open-weather';
import {weatherBitManager} from '../weather-bit';

const googleKey = 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8';
const apiPlaceGoogle = 'https://maps.googleapis.com/maps/api/place/';
const apiEndPointPlaceGoogle = {
  findPlaceFromText: 'findplacefromtext/json',
  getPhotoFromReference: 'photo',
  autoComplete: 'queryautocomplete/json',
  getDetailPlace: 'details/json',
  photo: 'photo',
};

export class MyServer {
  constructor(props) {
    this.instance = null;
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new MyServer();
    }
    return this.instance;
  };
  getConnector = () => new Connector();
  getKeyDataSource = async () => {
    return (
      (await LocalStorage.getItem(
        LocalStorage.DEFINE_KEY.SETTING_APP.WEATHER_PROVIDER,
      )) ||
      getStateForKeys(ConfigStore().store.getState(), ['Setting', 'dataSource'])
    );
  };
  getLocationByName = async ({query = {}}) => {
    try {
      const keyDataSource = await this.getKeyDataSource();
      switch (keyDataSource) {
        case DEFINE_DATA_SOURCE.openWeather.key:
          return AdapterManager.getInstance().convertLocationData({
            data: await openWeatherManager
              .getInstance()
              .getLocationByName({query}),
            source: keyDataSource,
          });
        case DEFINE_DATA_SOURCE.weatherBit.key:
          let queryWeatherBit = deepCopyObject(query);
          queryWeatherBit.city = query.q;
          delete queryWeatherBit.q;
          return AdapterManager.getInstance().convertLocationData({
            data: await weatherBitManager
              .getInstance()
              .getLocationByName({query: queryWeatherBit}),
            source: keyDataSource,
          });
        default:
          break;
      }
    } catch (error) {
      myLog('--getLocationByName error---', error);
      throw error;
    }
  };
  getWeatherByCityId = async ({query = {}}) => {
    try {
      const keyDataSource = await this.getKeyDataSource();
      myLog('getWeatherByCityId--->', query, keyDataSource);
      switch (keyDataSource) {
        case DEFINE_DATA_SOURCE.openWeather.key:
          return AdapterManager.getInstance().convertWeatherDetailData({
            data: await openWeatherManager
              .getInstance()
              .getWeatherByCityId({query}),
            source: keyDataSource,
          });
        case DEFINE_DATA_SOURCE.weatherBit.key:
          let tmpQueryWeatherBit = deepCopyObject(query);
          tmpQueryWeatherBit.city_id = query.id;
          delete tmpQueryWeatherBit.id;
          return AdapterManager.getInstance().convertWeatherDetailData({
            data: await weatherBitManager
              .getInstance()
              .getWeatherByCityId({query: tmpQueryWeatherBit}),
            source: keyDataSource,
          });
        default:
          break;
      }
    } catch (error) {
      myLog('--getWeatherByCityId error---', error);
      throw error;
    }
  };
  getWeatherByGeometry = async ({query = {}}) => {
    try {
      const keyDataSource = await this.getKeyDataSource();
      myLog('getWeatherByCityId--->', query, keyDataSource);
      switch (keyDataSource) {
        case DEFINE_DATA_SOURCE.openWeather.key:
          return AdapterManager.getInstance().convertWeatherDetailData({
            data: await openWeatherManager
              .getInstance()
              .getWeatherByGeometry({query}),
            source: keyDataSource,
          });
        case DEFINE_DATA_SOURCE.weatherBit.key:
          return AdapterManager.getInstance().convertWeatherDetailData({
            data: await weatherBitManager
              .getInstance()
              .getWeatherByGeometry({query}),
            source: keyDataSource,
          });
        default:
          break;
      }
    } catch (error) {
      myLog('--getWeatherByCityId error---', error);
      throw error;
    }
  };
  getPhotoOfPlace = async ({
    photoReference = '',
    maxwidth = 100,
    maxheight = 100,
  }) => {
    try {
      const resPhoto = await this.getConnector()
        .setUrl(apiPlaceGoogle + apiEndPointPlaceGoogle.getPhotoFromReference)
        .setQuery({
          maxwidth: 400,
          photoreference: photoReference,
          key: googleKey,
        })
        .getPromise();
      myLog('---resPhoto--->', resPhoto);
    } catch (error) {
      myLog('---resPhoto error--->', error);
    }
  };
  findPlaceFromText = async ({name = ''}) => {
    try {
      const resPlace = await this.getConnector()
        .setUrl(apiPlaceGoogle + apiEndPointPlaceGoogle.findPlaceFromText)
        .setQuery({
          input: name,
          inputtype: 'textquery',
          fields: 'photos,formatted_address,name,geometry',
          key: googleKey,
        })
        .getPromise();
      const {status, candidates} = getValueFromObjectByKeys(resPlace, ['data']);
      if (status === 'OK' && candidates && candidates.length) {
        return resPlace;
      }
      myLog('---findPlaceFromText--->', resPlace);
    } catch (error) {
      myLog('---findPlaceFromText error--->', error);
    }
  };
  findPlaceFromTextLike = async ({name = ''}) => {
    try {
      const resPlace = await this.getConnector()
        .setUrl(apiPlaceGoogle + apiEndPointPlaceGoogle.autoComplete)
        .setQuery({
          input: name,
          key: googleKey,
        })
        .getPromise();
      const {status, predictions} = getValueFromObjectByKeys(resPlace, [
        'data',
      ]);
      if (status === 'OK' && predictions && predictions.length) {
        return resPlace;
      }
      myLog('---findPlaceFromTextLike--->', resPlace);
    } catch (error) {
      myLog('---findPlaceFromTextLike error--->', error);
    }
  };
  getPlaceDetail = async ({placeId = ''}) => {
    try {
      return await this.getConnector()
        .setUrl(apiPlaceGoogle + apiEndPointPlaceGoogle.getDetailPlace)
        .setQuery({
          place_id: placeId,
          key: googleKey,
          fields: 'name,geometry,photos',
        })
        .getPromise();
    } catch (error) {
      myLog('---findPlaceFromTextLike error--->', error);
    }
  };
  getPhotoPlaceGg = photoReference => {
    return `${apiPlaceGoogle}${apiEndPointPlaceGoogle.photo}?maxwidth=500&photoreference=${photoReference}&key=${googleKey}`;
  };
}
