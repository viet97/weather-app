import Immutable from 'immutable';
import {NORMAL_TYPE} from '../../actions/ActionTypes';

const initState = Immutable.fromJS({
  dailyNotification: 0,
  severeAlert: 0,
  rainAndSnow: 0,
});

export default (state = initState, action) => {
  switch (action.key) {
    case NORMAL_TYPE.CHANGE_VALUE_DAILY_NOTIFICATION:
      return state.setIn(['dailyNotification'], action.data.dailyNotification);
    case NORMAL_TYPE.CHANGE_VALUE_SEVERE_ALERT:
      return state.setIn(['severeAlert'], action.data.severeAlert);
    case NORMAL_TYPE.CHANGE_VALUE_NOTI_RAIN_SNOW:
      return state.setIn(['rainAndSnow'], action.data.rainAndSnow);
    default:
      return state;
  }
};
