import React from 'react';
import {connect} from 'react-redux';

class ScreenChallengePage extends React.Component {

  constructor(props) {
    super(props);
    if (!this.props.navigation.id) {
      throw new Error('state.navigation.id must be defined');
    }
  }

  componentWillMount() {
    this.setState({
      data: this.props.challenge.data[this.props.navigation.id]
    });
  }

  render() {
    console.log(this.state);
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          <h2>{this.state.data.title}</h2>
          <p>{this.state.data.shortDesc}</p>
          <button>Начать</button>
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
