import {myLog} from '../../Debug';
import {DEFINE_DATA_SOURCE} from '../../Define';

export class AdapterManager {
  constructor() {
    this.instance = null;
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new AdapterManager();
    }
    return this.instance;
  };
  convertLocationData = ({data, source}) => {
    myLog('---convertLocationData--->', data, source);
    switch (source) {
      case DEFINE_DATA_SOURCE.openWeather.key:
        return data;
      default:
        return null;
    }
  };
}
