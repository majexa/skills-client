import React from 'react';
import {connect} from 'react-redux';
import Screens from './Screens';
import Navigation from './Navigation';

import '../static/screens.css';
import '../static/header.css';

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
    const state = this.context.store.getState();
    if (state.prevScreen) {
      this.context.store.dispatch({
        type: 'SCREEN_CHANGE',
        screen: state.prevScreen,
        direction: 'left'
      });
    }
  }

  render() {
    if (this.state.loaded === false) {
      return <div className="Loading">Loading...</div>;
    }
    const isBack = !!this.context.store.getState().prevScreen;
    return (
      <div className="App" style={{width: this.props.size.width}}>
        <div className="header">
          {
            isBack ?
              <button className="back" onClick={this.back.bind(this)}>&#9664;</button>
              :
              <button className="back">H</button>
          }

          Skills App
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
