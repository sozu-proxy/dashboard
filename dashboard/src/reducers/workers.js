import * as types from '../actions/actionTypes';  
import initialState from './initialState';

export default function workerReducer(state = initialState.workers, action) {  
  switch(action.type) {
    case types.LOAD_WORKERS_SUCCESS:
      return action.workers
    default: 
      return state;
  }
}
