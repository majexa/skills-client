import React from 'react';
import {connect} from 'react-redux';
import '../static/capture.css';
import * as axios from 'axios';

class ScreenLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phone: '79202560776',
      code: '54289'
    };
  }

  phoneChange(event) {
    this.setState(Object.assign(this.state, {
      phone: event.target.value
    }));
  }

  codeChange(event) {
    this.setState(Object.assign(this.state, {
      code: event.target.value
    }));
  }

  render() {
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          <p>
          <input name="phone" type="tel"
                 value={this.state.phone}
                 onChange={this.phoneChange.bind(this)}

          />
          </p>
          <p>
          <input name="phone" type="number"
                 value={this.state.code}
                 onChange={this.codeChange.bind(this)}

          />
          </p>
          <button onClick={this.login.bind(this)}>Войти</button>
        </div>
      </div>
    );
  }

  login(event) {
    event.preventDefault();
    axios.get('http://localhost:8050/api/v1/login?phone=' +
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


