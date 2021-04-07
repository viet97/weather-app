import Immutable from 'immutable';
import { size } from 'lodash';
import SVGIcon from '../../../assets/SVGIcon';
import {
  NORMAL_TYPE,
  REQUEST_SUBTYPE,
  REQUEST_TYPE,
} from '../../actions/ActionTypes';
import { myLog } from '../../Debug';
import { languagesKeys } from '../../modules/i18n/defined';
import { getValueFromObjectByKeys } from '../../utils/Util';

const initState = Immutable.fromJS({});

export default (state = initState, action) => {
  switch (action.key) {
    case REQUEST_TYPE.GET_COUNTRY_COVID:
      switch (action.subType) {
        case REQUEST_SUBTYPE.SUCCESS:
          const data = getValueFromObjectByKeys(action, [
            'data',
            'data',
            'data',
          ]);
          const latest_data = getValueFromObjectByKeys(data, ['latest_data']);
          const timeline = getValueFromObjectByKeys(data, ['timeline']);
          let active = 0;
          if (size(timeline) > 0) {
            active = timeline[0].active;
          }
          const deaths = getValueFromObjectByKeys(latest_data, ['deaths']);
          const confirmed = getValueFromObjectByKeys(latest_data, [
            'confirmed',
          ]);
          const recovered = getValueFromObjectByKeys(latest_data, [
            'recovered',
          ]);
          const listCountryCovidInfo = [
            {
              Icon: SVGIcon.covid_active,
              value: active,
              title: languagesKeys.active,
            },
            {
              Icon: SVGIcon.covid_confirm,
              value: confirmed,
              title: languagesKeys.confirmed,
            },
            {
              Icon: SVGIcon.covid_recover,
              value: recovered,
              title: languagesKeys.recovered,
            },
            {
              Icon: SVGIcon.covid_death,
              value: deaths,
              title: languagesKeys.deaths,
            },
          ];
          myLog('REQUEST_TYPE.GET_COUNTRY_COVID', data);
          return state.setIn(['listCountryCovidInfo'], listCountryCovidInfo);
        default:
          return state;
      }
    case REQUEST_TYPE.GET_WORLD_COVID:
      switch (action.subType) {
        case REQUEST_SUBTYPE.SUCCESS:
          const data = getValueFromObjectByKeys(action, [
            'data',
            'data',
            'data',
          ]);
          const world_covid = size(data) > 0 ? data[0] : {};
          const deaths = getValueFromObjectByKeys(world_covid, ['deaths']);
          const active = getValueFromObjectByKeys(world_covid, ['active']);
          const confirmed = getValueFromObjectByKeys(world_covid, [
            'confirmed',
          ]);
          const recovered = getValueFromObjectByKeys(world_covid, [
            'recovered',
          ]);
          const listWorldCovidInfo = [
            {
              Icon: SVGIcon.covid_active,
              value: active,
              title: languagesKeys.active,
            },
            {
              Icon: SVGIcon.covid_confirm,
              value: confirmed,
              title: languagesKeys.confirmed,
            },
            {
              Icon: SVGIcon.covid_recover,
              value: recovered,
              title: languagesKeys.recovered,
            },
            {
              Icon: SVGIcon.covid_death,
              value: deaths,
              title: languagesKeys.deaths,
            },
          ];
          myLog('REQUEST_TYPE.GET_WORLD_COVID', data);
          return state.setIn(['listWorldCovidInfo'], listWorldCovidInfo);
        default:
          return state;
      }
    default:
      return state;
  }
};
