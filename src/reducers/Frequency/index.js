import Immutable from 'immutable';
import {NORMAL_TYPE} from '../../actions/ActionTypes';
import {DEFINE_UNIT_FREQUENCY} from '../../Define';

const initState = Immutable.fromJS({
  frequencyValue: DEFINE_UNIT_FREQUENCY['30m'].value,
});

export default (state = initState, action) => {
  switch (action.key) {
    case NORMAL_TYPE.CHANGE_VALUE_FREQUENCY:
      return state.setIn(['frequencyValue'], action.data.frequency);
    default:
      return state;
  }
};
