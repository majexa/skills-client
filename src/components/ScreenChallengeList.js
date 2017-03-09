import React from 'react';
import {connect} from 'react-redux';
import '../static/challengeManager.css';

class ScreenChallengeList extends React.Component {

  render() {
    var items = [];
    for (var i in this.props.challenge.items) {
      items.push(this.props.challenge.items[i])
    }
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          <div className="challengeManager">
            {items.map((item, i) => {
              return (
                <div className="item" key={i} onClick={this.itemClick.bind(this, item._id)}>
                  {item.title}
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
      screen: 'ChallengePage',
      id: id
    });
  }

}

ScreenChallengeList.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenChallengeList);


