import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import './static/index.css';
import './static/buttons.css';
//import 'babel-polyfill';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.addEventListener('message', function (event) {
  if (!event.data) return;
  if (!event.data.challengeId) return;
  store.dispatch({
    type: 'SCREEN_CHANGE',
    screen: 'ChallengePage',
    id: event.data.challengeId
  });
});

store.dispatch({
  type: 'SCREEN_INIT'
});
store.dispatch({
  type: 'WINDOW_SIZE_CHANGE',
  width: 100,
  height: 100
});

function startApp() {
  if (window.cordova) {

    console.log('Wait 2 sec');
    setTimeout(function() {

      console.log('Set orientation to portrait');
      window.screen.orientation.lock('portrait');

      render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById('root')
      );

    }, 2000);


  } else {
    console.log('window.cordova does not exists');
  }
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
