import React from 'react';
import {connect} from 'react-redux';
//import Navigation from './Navigation';
import ScreenInit from './ScreenInit';
import ScreenError from './ScreenError';
import ScreenTaskPhoto from './ScreenTaskPhoto';
import ScreenTask from './ScreenTask';
import ScreenLogin from './ScreenLogin';
import ScreenSmsCode from './ScreenSmsCode';
import ScreenChallengeList from './ScreenChallengeList';
import ScreenChallengePage from './ScreenChallengePage';
import ScreenA from './ScreenA';
import ScreenProfile from './ScreenProfile';

class Screens extends React.Component {

  componentWillUpdate(nextProps) {
    if (nextProps.navigation.startChange) {
      setTimeout(() => {
        this.context.store.dispatch({
          type: 'SCREEN_RESET'
        });
      }, 200); // must be equals to css ".screens transition-duration" property
    }
  }

  getScreenComponent(name) {
    switch (name) {
      case 'Init':
        return <ScreenInit/>;
      case 'Error':
        return <ScreenError/>;
      case 'TaskPhoto':
        return <ScreenTaskPhoto/>;
      case 'Login':
        return <ScreenLogin/>;
      case 'SmsCode':
        return <ScreenSmsCode/>;
      case 'ChallengeList':
        return <ScreenChallengeList/>;
      case 'ChallengePage':
        return <ScreenChallengePage/>;
      case 'Task':
        return <ScreenTask/>;
      case 'Profile':
        return <ScreenProfile/>;
      default:
        throw new Error('ScreenComponent for "' + name + '" is not defined');
    }
  }

  render() {
    let rightScreen, leftScreen, currentScreen, nextScreen, offset;
    let movingClassName = '';
    leftScreen = null;
    rightScreen = null;
    if (this.props.navigation.startChange) {
      currentScreen = this.getScreenComponent(this.props.navigation.screen);
      nextScreen = this.getScreenComponent(this.props.navigation.nextScreen);
      if (this.props.navigation.direction === 'right') {
        offset = -(this.props.size.width * 2);
        movingClassName = ' moveRight';
        rightScreen = nextScreen;
        leftScreen = <ScreenA content="dimmy"/>;
      } else {
        offset = 0;
        movingClassName = ' moveLeft';
        leftScreen = nextScreen;
      }
    } else {
      offset = -this.props.size.width;
      movingClassName = ' reset';
      currentScreen = this.getScreenComponent(this.props.navigation.screen);
      leftScreen = <ScreenA content="dummy"/>;
    }

    return (
      <div
        style={{
          height: (this.props.size.height) + 'px',
          width: this.props.size.width + 'px',
        }}
        className="wrapper">
        <div style={{
          //height: (this.props.size.height) + 'px',
          width: (this.props.size.width * 3) + 'px',
          transform: 'translate3d(' + offset + 'px, 0, 0)'
        }} className={'screens' + movingClassName}>
          {leftScreen}
          {currentScreen}
          {rightScreen}
        </div>
      </div>
    );
  }

}

Screens.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(Screens);
