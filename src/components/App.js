import React from 'react';
import {connect} from 'react-redux';
import Screens from './Screens';
import Navigation from './Navigation';

import '../static/screens.css';
import '../static/header.css';
import config from '../config';
import * as axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    // let socket = io.connect('http://majexa.ru:8052');
    // socket.on('connect', (() => {
    //   socket.emit('asd', { das: 123 });
    // }));
    axios.get(config.serverUrl + '/api/v1/challenges').then((response) => {
      if (response.data.error) {
        this.context.store.dispatch({
          type: 'SCREEN_CHANGE',
          screen: 'Error',
          text: response.data.error
        });
      } else {
        // ------------
        let data = {};
        for (let i=0; i<response.data.body.length; i++) {
          let v = response.data.body[i];
          data[v.id] = v.data;
        }
        // ------------
        this.context.store.dispatch({
          type: 'SET_CHALLENGES',
          items: response.data,
          data: data
        });
      }
    }).catch((error) => {
      console.log(error);
    });

    setTimeout(() => {
      this.context.store.dispatch({
        type: 'SET_TASKS',
        tasks: {
          5: {
            text: 'asdasdqw dqwd qwd qw',
            endingDate: 'February 10, 2017 00:00:00'
          }
        }
      });
      this.setState({
        loaded: true
      });
    }, 1000);
    document.addEventListener('deviceready', () => {
      // this.context.store.dispatch({
      //   type: 'SCREEN_CHANGE',
      //   screen: 'Init'
      // });
    }, false);
    this.initSize();

    this.context.store.dispatch({
      type: 'WINDOW_SIZE_CHANGE',
      width: window.innerWidth,
      height: window.innerHeight
    });


  }

  initSize() {
    window.addEventListener('resize', () => {
      this.context.store.dispatch({
        type: 'WINDOW_SIZE_CHANGE',
        width: window.innerWidth,
        height: window.innerHeight
      });
    });
    this.context.store.dispatch({
      type: 'WINDOW_SIZE_CHANGE',
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  back() {
    if (!this.props.navigation.prevScreen) return;
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: this.props.navigation.prevScreen,
      direction: 'left'
    });
  }

  render() {
    if (this.state.loaded === false) {
      return <div className="Loading">Loading...</div>;
    }
    return (
      <div className="App" style={{width: this.props.size.width}}>
        <div className="header">
          {
            this.props.navigation.prevScreen ?
              <button className="back" onClick={this.back.bind(this)}>&#9664;</button>
              :
              <button className="back">H</button>
          }
          App
        </div>
        <Screens/>
        {/*<Navigation/>*/}
      </div>
    );
  }

}

App.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(App);
