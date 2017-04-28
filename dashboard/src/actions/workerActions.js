import * as types from './actionTypes';  
import workerApi from '../api/workerApi';

export function loadWorkersSuccess(workers) {
  return {type: types.LOAD_WORKERS_SUCCESS, workers};
}

export function loadWorkers() {
  return function(dispatch) {
    dispatch({type: types.LOAD_WORKERS_PENDING});
    return workerApi.getAllWorkers().then(workers => {
      dispatch(loadWorkersSuccess(workers));
    }).catch(error => {
      throw(error);
    });
  };
}
