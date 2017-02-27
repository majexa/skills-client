import React from 'react';
import {connect} from 'react-redux';

class ScreenChallengeList extends React.Component {

  render() {
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          LIST HERE
        </div>
      </div>
    );
  }

}

ScreenChallengeList.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenChallengeList);


