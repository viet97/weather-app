import Immutable from 'immutable';
import {NORMAL_TYPE} from '../../actions/ActionTypes';
import {AppSettingManager} from '../../modules/AppSettingManager';
import LocalStorage from '../../modules/LocalStorage';

const initState = Immutable.fromJS({
  myLocations: [],
});

export default (state = initState, action) => {
  switch (action.key) {
    case NORMAL_TYPE.CHANGE_LOCATION:
      AppSettingManager.getInstance().changeDataSetting(
        LocalStorage.DEFINE_KEY.LOCATION,
        action.data,
      );
      return state.setIn(['myLocations'], action.data);
    default:
      return state;
  }
};
