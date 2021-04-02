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
    switch (source) {
      case DEFINE_DATA_SOURCE.openWeather:
        return data;
      default:
        return null;
    }
  };
}
