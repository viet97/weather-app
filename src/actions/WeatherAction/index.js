import {createrAction} from '../RAction';
import {REQUEST_TYPE} from '../ActionTypes';
import {getActionAPI} from '../UtilAction';
import ManagerAPI from '../../connection/ManagerAPI';

const {GET_ALL_DATA, GET_AIR_POLLUTION} = REQUEST_TYPE;

const Actions = createrAction({
  actionName: 'WeatherAction',
  actionListApi: [GET_ALL_DATA, GET_AIR_POLLUTION],
});

const getAllData = () => {
  return getActionAPI({
    Actions: Actions,
    actionName: GET_ALL_DATA,
    promiseApi: () => ManagerAPI.getInstance().getAllData(),
  });
};
const getAirPollution = () => {
  return getActionAPI({
    Actions: Actions,
    actionName: GET_AIR_POLLUTION,
    promiseApi: () => ManagerAPI.getInstance().getAirPollution(),
  });
};

export default {
  getAllData,
  getAirPollution,
};
