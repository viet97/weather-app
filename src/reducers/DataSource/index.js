import Immutable from 'immutable';
import {NORMAL_TYPE} from '../../actions/ActionTypes';
import {DEFINE_DATA_SOURCE} from '../../Define';

const initState = Immutable.fromJS({
  source: DEFINE_DATA_SOURCE.openWeather.key,
});

export default (state = initState, action) => {
  switch (action.key) {
    case NORMAL_TYPE.CHANGE_DATA_SOURCE:
      return state.setIn(['source'], action.data.source);
    default:
      return state;
  }
};
