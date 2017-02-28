import React from 'react';
import {connect} from 'react-redux';
import '../static/challengeManager.css';

class ScreenMyChallengeList extends React.Component {

  render() {
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          <div className="challengeManager">
            {this.props.challenge.items.body.map((item, i) => {
              return (
                <div className="item" key={i} onClick={this.itemClick.bind(this, item.id)}>
                  {item.data.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  itemClick(id) {
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: 'MyChallengePage',
      id: id
    });
  }

}

ScreenMyChallengeList.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenMyChallengeList);


