import { createrAction } from '../RAction';
import { REQUEST_TYPE } from '../ActionTypes';
import { getActionAPI } from '../UtilAction';
import ManagerAPI from '../../connection/ManagerAPI';

const { GET_ALL_DATA } = REQUEST_TYPE;

const Actions = createrAction({
  actionName: 'AppStateAction',
  actionListApi: [GET_ALL_DATA]
});

const getAllData = () => {
  return getActionAPI({
    Actions: Actions,
    actionName: GET_ALL_DATA,
    promiseApi: () => ManagerAPI.getInstance().getAllData()
  });
};

export default {
  getAllData,
};
