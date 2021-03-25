import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers';
import Immutable from 'immutable';
import Config from '../Config';

const middleware = [];

middleware.push(thunk);
Config.useLoggerRedux && middleware.push(logger);

const store = createStore(
  reducers,
  Immutable.Map({}),
  applyMiddleware(...middleware),
);

export default () => {
  return {store};
};
