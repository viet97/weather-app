import {REQUEST_SUBTYPE} from '../actions/ActionTypes';
import Immutable from 'immutable';
import {myLog} from '../Debug';

const initState = Immutable.fromJS({});

const tracker = (state = initState, action) => {
  myLog('--tracker--', action);
  switch (action.subType) {
    case REQUEST_SUBTYPE.ERROR:
      break;
    default:
      break;
  }
};

export default tracker;
