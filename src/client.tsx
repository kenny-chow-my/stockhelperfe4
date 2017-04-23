import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
const { Router, browserHistory } = require('react-router');
import { syncHistoryWithStore } from 'react-router-redux';
const { ReduxAsyncConnect } = require('redux-connect');
import { configureStore } from './app/redux/store';
import 'isomorphic-fetch';
import routes from './app/routes';
import { getUserThings } from './app/redux/modules/userThings';

const store = configureStore(
  browserHistory,
  window.__INITIAL_STATE__,
);

store.dispatch(getUserThings());

const history = syncHistoryWithStore(browserHistory, store);
const connectedCmp = (props) => <ReduxAsyncConnect {...props} />;

ReactDOM.render(
  <Provider store={store} key="provider">
    <Router
      history={history}
      render={connectedCmp}
    >
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app'),
);
