import {createrAction} from '../RAction';
import {REQUEST_TYPE} from '../ActionTypes';
import {getActionAPI} from '../UtilAction';
import ManagerAPI from '../../connection/ManagerAPI';

const {GET_COUNTRY_COVID, GET_WORLD_COVID} = REQUEST_TYPE;

const Actions = createrAction({
  actionName: 'CovidAction',
  actionListApi: [GET_COUNTRY_COVID, GET_WORLD_COVID],
});

const getCountryCovid = () => {
  return getActionAPI({
    Actions: Actions,
    actionName: GET_COUNTRY_COVID,
    promiseApi: () => ManagerAPI.getInstance().getCountryCovid(),
  });
};
const getWorldCovid = () => {
  return getActionAPI({
    Actions: Actions,
    actionName: GET_WORLD_COVID,
    promiseApi: () => ManagerAPI.getInstance().getWorldCovid(),
  });
};

export default {
  getCountryCovid,
  getWorldCovid,
};
