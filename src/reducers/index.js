import {
  getUnexpectedInvocationParameterMessage,
  validateNextState,
} from './util.immutable';

import tracker from './Tracker';
import Navigation from './Navigation';
import Language from './Language';
import DataSource from './DataSource';
import Layout from './Layout';
import Frequency from './Frequency';
import Notification from './Notification';
import Setting from './Setting';
import Weather from './Weather';

const MainListReducers = {
  Navigation,
  Setting,
  Language,
  DataSource,
  Weather,
};

const rootReducerImmutable = (reducers, getDefaultState) => {
  const reducerKeys = Object.keys(reducers);
  return (inputState = getDefaultState(), action) => {
    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedInvocationParameterMessage(
        inputState,
        reducers,
        action,
      );
      if (warningMessage) {
        console.error(warningMessage);
      }
    }
    const state = inputState.withMutations(temporaryState => {
      reducerKeys.forEach(reducerName => {
        const reducer = reducers[reducerName];
        const currentDomainState = temporaryState.get(reducerName);
        const nextDomainState = reducer(currentDomainState, action);
        validateNextState(nextDomainState, reducerName, action);
        temporaryState.set(reducerName, nextDomainState);
      });
    });
    tracker(state, action);
    return state;
  };
};

const root = rootReducerImmutable(MainListReducers);

export default root;
