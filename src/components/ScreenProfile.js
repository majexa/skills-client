import React from 'react';
import {connect} from 'react-redux';

class ScreenProfile extends React.Component {

  getProfileContents() {
    return <div>
      <h2>{this.props.auth.profile.phone}</h2>
      <button onClick={this.logout.bind(this)}>Выйти</button>
    </div>
  }

  logout() {
    this.context.store.dispatch({
      type: 'LOGOUT'
    });
  }

  render() {
    let contents;
    if (this.props.auth.profile) {
      contents = this.getProfileContents()
    } else {
      contents = <div>Вы не залогинены</div>
    }
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          {contents}
        </div>
      </div>
    );
  }

}

ScreenProfile.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenProfile);


