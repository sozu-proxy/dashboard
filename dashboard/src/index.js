import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import {loadWorkers} from './actions/workerActions';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));
store.dispatch(loadWorkers());

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={hashHistory} />
  </Provider>
  , document.getElementById('root')
);
