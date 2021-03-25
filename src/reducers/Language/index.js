import Immutable from 'immutable';
import {NORMAL_TYPE} from '../../actions/ActionTypes';

const initState = Immutable.fromJS({
  language: 'vi',
});

export default (state = initState, action) => {
  switch (action.key) {
    case NORMAL_TYPE.CHANGE_LANGUAGE:
      return state.setIn(['language'], action.data.language);
    default:
      return state;
  }
};
