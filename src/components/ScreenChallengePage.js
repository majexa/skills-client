import React from 'react';
import {connect} from 'react-redux';
import '../static/challengePage.css';

class ScreenChallengePage extends React.Component {

  constructor(props) {
    super(props);
    if (!this.props.navigation.id) {
      throw new Error('state.navigation.id must be defined');
    }
  }

  componentWillMount() {
    if (!this.props.challenge.items[this.props.navigation.id]) {
      this.context.store.dispatch({
        type: 'SCREEN_CHANGE',
        screen: 'ChallengeList'
      });
    }
    this.setState({
      challenge: this.props.challenge.items[this.props.navigation.id]
    });
  }

  render() {
    let startDescription = null, start = null;
    if (1 || this.state.challenge.periodType === 'default') {
      startDescription = <p><small>Вы можете начать в любое время, но закончить сможете не позже 23:59</small></p>
    }
    if (this.props.auth.profile) {
      start = <button>Начать</button>
    } else {
      start = '<p>Не хватает прав. Вероятно вы не авторизованеы</p>'
    }
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sChallengePage'}>
        <div className="cont">
          <h2>{this.state.challenge.title}</h2>
          <p>{this.state.challenge.shortDesc}</p>
          {startDescription}
          <div>
          Задания:&nbsp;&nbsp;
          {this.state.challenge.tasks.map(function(task, i) {
            return (
              <div className="task" key={i} title={task.description}></div>
            );
          })}
          </div>
          <hr/>
          {start}
        </div>
      </div>
    );
  }

}

ScreenChallengePage.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenChallengePage);
