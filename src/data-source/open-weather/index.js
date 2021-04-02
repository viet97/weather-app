import Connector from '../../connection/Connector';
import {myLog} from '../../Debug';

const openWeatherAppId = '55ef21e63e49a17721cee8a48a64bad8';
const apiUrl = 'https://api.openweathermap.org/data/2.5/';
const apiEndPoint = {
  oneCall: 'onecall',
  weather: 'weather',
};

export class openWeatherManager {
  constructor(props) {
    this.instance = null;
    this.defaultQuery = {
      appid: openWeatherAppId,
    };
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new openWeatherManager();
    }
    return this.instance;
  };
  getConnector = url => new Connector(url);
  getLocationByName = ({query = {}}) => {
    myLog('getLocationByName-->', query);
    return this.getConnector()
      .setUrl(apiUrl + apiEndPoint.weather)
      .setQuery({...this.defaultQuery, ...query})
      .getPromise();
  };
}
