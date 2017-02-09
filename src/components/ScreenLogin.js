import React from 'react';
import {connect} from 'react-redux';
import '../static/capture.css';
import * as axios from 'axios';

class ScreenLogin extends React.Component {

  render() {
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
      </div>
    );
  }

}

ScreenLogin.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenLogin);


