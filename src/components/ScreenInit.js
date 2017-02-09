import React from 'react';
import {connect} from 'react-redux';

class ScreenInit extends React.Component {

  componentWillMount() {
    this.setState({
      loading: false
    });
    let that = this;
    setTimeout(function () {
      that.setLoading(true)
    }, 0);
  }

  setLoading() {
    this.setState({loading: true});
  }

  render() {
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          <p>Оперативная<br />помощь бизнесу</p>
          <button onClick={this.onClick.bind(this)}>Сделать снимок</button>
        </div>
      </div>
    );
  }

  onClick() {
      this.context.store.dispatch({
          type: 'SCREEN_CHANGE',
          screen: 'TaskPhoto'
      });
  }

}

ScreenInit.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => ({
  size: state.size
});

export default connect(
  mapStateToProps
)(ScreenInit);


