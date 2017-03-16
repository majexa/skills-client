import React from 'react';
import {connect} from 'react-redux';
import Screens from './Screens';
//import Navigation from './Navigation';
import '../static/screens.css';
import '../static/header.css';
import config from '../config';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    //console.log('App:componentDidMount. waiting 2 sec');
    //setTimeout(this._componentDidMount.bind(this), 2000);
    this._componentDidMount();
  }
  _componentDidMount() {
        this.setState({
          loaded: true
        });
    // let socket = io.connect('http://majexa.ru:8052');
    // socket.on('connect', (() => {
    //   socket.emit('asd', { das: 123 });
    // }));
    // axios({
    //   method: 'get',
    //   url: config.serverUrl + '/api/v1/chs',
    //   headers: {
    //     'Authorization': 'Bearer ' + 123
    //   }
    // }).then((response) => {
    //   if (response.data.error) {
    //     console.log('error');
    //     console.log(response.data.error);
    //     this.context.store.dispatch({
    //       type: 'SCREEN_CHANGE',
    //       screen: 'Error',
    //       text: response.data.error
    //     });
    //   } else {
    //     let data = {};
    //     let v;
    //     for (let i=0; i<response.data.length; i++) {
    //       v = response.data[i];
    //       data[v._id] = v;
    //     }
    //     this.context.store.dispatch({
    //       type: 'SET_CHALLENGES',
    //       items: data
    //     });
    //     console.log('all ok. change state to loaded: true');
    //     this.setState({
    //       loaded: true
    //     });
    //     // FOR DEBUG
    //     // setTimeout(() => {
    //     //   this.context.store.dispatch({
    //     //     type: 'SCREEN_CHANGE',
    //     //     screen: 'ChallengePage',
    //     //     id: '58b01682c2201244625efbf8'
    //     //   });
    //     // }, 1000);
    //   }
    // }).catch((error) => {
    //   console.log(error);
    // });

    document.addEventListener('deviceready', () => {
      this.context.store.dispatch({
        type: 'SCREEN_CHANGE',
        screen: 'Init'
      });
    }, false);
    this.initSize();
    this.initAuth();
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

  initAuth() {
    let profile = window.localStorage.getItem('profile');
    if (profile) {
      profile = JSON.parse(profile);
      this.context.store.dispatch({
        type: 'SET_AUTH',
        profile: profile
      });
    }
  }

  back() {
    if (!this.props.navigation.prevScreen) return;
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: this.props.navigation.prevScreen,
      direction: 'left'
    });
  }

  gotoProfile() {
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: 'Profile'
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
              <button className="back"
                      onClick={this.back.bind(this)}>&#9664;</button>
              :
              <button className="back">H</button>
          }
          {window.innerWidth}x{window.innerHeight}

          {
            this.props.auth.profile ?
              <button className="profile"
                      onClick={this.gotoProfile.bind(this)}>P</button>
              :
              ''
          }

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
