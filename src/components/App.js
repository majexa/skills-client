import React from 'react';
import {connect} from 'react-redux';
import Screens from './Screens';
//import Navigation from './Navigation';
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
    axios.get(config.serverUrl + '/api/v1/chs').then((response) => {
      if (response.data.error) {
        this.context.store.dispatch({
          type: 'SCREEN_CHANGE',
          screen: 'Error',
          text: response.data.error
        });
      } else {
        let data = {};
        let v;
        for (let i=0; i<response.data.length; i++) {
          v = response.data[i];
          data[v._id] = v;
        }
        this.context.store.dispatch({
          type: 'SET_CHALLENGES',
          items: data
        });
        this.setState({
          loaded: true
        });
      }
    }).catch((error) => {
      console.log(error);
    });

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
