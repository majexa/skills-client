import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import './static/index.css';
import './static/buttons.css';
//import 'babel-polyfill';

import * as axios from 'axios';


function startApp() {
    const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

    store.dispatch({
      type: 'SCREEN_INIT'
    });
    store.dispatch({
      type: 'WINDOW_SIZE_CHANGE',
      width: 100,
      height: 100
    });

    window.addEventListener('message', function (event) {
      if (!event.data) return;
      if (!event.data.challengeId) return;
      store.dispatch({
        type: 'SCREEN_CHANGE',
        screen: 'ChallengePage',
        id: event.data.challengeId
      });
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    );
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
