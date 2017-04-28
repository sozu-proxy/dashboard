import { combineReducers } from 'redux'

import workers from './reducers/workers'
import initialState from './reducers/initialState';
import * as types from './actions/actionTypes';

const isFetchingWorkers = (state = initialState.workers, action) => {
  switch(action.type) {
    case types.LOAD_WORKERS_PENDING:
      return true;
    default:
      return false;
  }
};

const reducers = combineReducers({
  isFetchingWorkers,
  workers,
})

export default reducers
