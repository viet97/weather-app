import Immutable from 'immutable';
import {NORMAL_TYPE} from '../../actions/ActionTypes';

const initState = Immutable.fromJS({
  data: [],
});

export default (state = initState, action) => {
  switch (action.key) {
    case NORMAL_TYPE.CHANGE_LAYOUT:
      return state.setIn(['data'], action.data.data || []);
    default:
      return state;
  }
};
