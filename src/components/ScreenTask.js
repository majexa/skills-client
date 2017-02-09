import React from 'react';
import {connect} from 'react-redux';

class ScreenTask extends React.Component {

  constructor(props) {
    super(props);
    this.task = this.props.tasks.tasks[this.props.navigation.id];
    this.state = {
      timer: {
        text: this.getRemainingTime()
      }
    };
  }

  getRemainingTime() {
    const taskEndingDate = new Date(this.task.endingDate);
    const seconds = Math.round(taskEndingDate - new Date() / 1000);
    const days = Math.floor(seconds / 24 / 60 / 60);
    const hoursLeft = Math.floor((seconds) - (days * 86400));
    const hours = Math.floor(hoursLeft / 3600);
    const minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
    let minutes = Math.floor(minutesLeft / 60);
    let remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
      remainingSeconds = '0' + remainingSeconds;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return hours + ':' + minutes + ':' + remainingSeconds;
  }

  // initTime() {
  //   this.context.store.dispatch({
  //     type: 'TIMER_CHANGE',
  //     text: this.getRemainingTime()
  //   });
  // }
  initTime() {
    this.setState({
      timer: {
        text: this.getRemainingTime()
      }
    });
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.initTime();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sTask'}>
        <div className="cont">
          <p id="timer">{this.state.timer.text}</p>
          <p className="text">{this.task.text}</p>
          <button onClick={this.done.bind(this)}>Готово</button>
        </div>
      </div>
    );
  }

  done() {
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: 'TaskPhoto'
    });
  }

}

ScreenTask.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenTask);


