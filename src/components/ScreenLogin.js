import React from 'react';
import {connect} from 'react-redux';
import * as axios from 'axios';
import config from '../config';

class ScreenLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: ''
    };
  }

  componentDidMount() {

  }

  handleChange(event) {
    this.setState({phone: event.target.value});
    this.context.store.dispatch({
      type: 'PHONE_CHANGE',
      phone: this.state.phone
    });
  }

  validate() {
    if (this.props.phone.phone && this.props.phone.phone.match(/^[1-9]{1}[0-9]{10}$/)) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          <p className="phoneField">
            <span className="phonePlus">+</span><input name="phone" type="tel" placeholder="телефон"
                   value={this.props.phone.phone}
                   onChange={this.handleChange.bind(this)}
                   onKeyUp={this.handleChange.bind(this)}
            />
          </p>
          {(this.validate() ?
              <button
                onClick={this.next.bind(this)}>
                Далее >
              </button>
              : <button
                disabled
                onClick={this.next.bind(this)}>
                Далее >
              </button>
          )}

        </div>
      </div>
    );
  }

  next(event) {
    event.preventDefault();
    this.context.store.dispatch({
      type: 'SCREEN_CHANGE',
      screen: 'SmsCode'
    });
  }

  login(event) {
    event.preventDefault();
    axios.get(config.serverUrl + '/api/v1/login?phone=' +
      this.state.phone + '&code=' + this.state.code
    ).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }

}

ScreenLogin.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenLogin);


