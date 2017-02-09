import React from 'react';
import {connect} from 'react-redux';
import '../static/capture.css';
import * as axios from 'axios';

class ScreenTaskPhoto extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageData: false
    };
  }

  render() {
    let photo = <p>Фото появится здесь</p>;
    if (this.state.imageData) {
      photo = <p className="preview"><img src={'data:image/jpeg;base64,' + this.state.imageData}/></p>;
    }
    let buttons;
    if (this.state.imageData) {
      buttons = <div>
        <button onClick={this.uploadPhoto.bind(this)}>Загрузить</button>
        <button onClick={this.capturePhoto.bind(this)}>Сделать фото</button>
      </div>
    } else {
      buttons = <div>
        <button onClick={this.capturePhoto.bind(this)}>Сделать фото</button>
      </div>
    }
    return (
      <div style={{width: this.props.size.width + 'px'}} className={'screen sInit'}>
        <div className="cont">
          {buttons}
          {photo}
        </div>
      </div>
    );
  }

  onFail(message) {
    alert('Failed because: ' + message);
  }

  onPhotoDataSuccess(imageData) {
    this.setState({
      imageData: imageData
    });
  }

  loadImage(onload) {
    let xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', '/img/i.jpg', true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function (e) {
      let arr = new Uint8Array(this.response);
      let raw = String.fromCharCode.apply(null, arr);
      let b64 = btoa(raw);
      onload(b64);
    };
    xmlHTTP.send();
  }

  capturePhoto() {
    if (!navigator.camera) {
      this.loadImage(this.onPhotoDataSuccess.bind(this));
      return;
    }

    const destinationType = navigator.camera.DestinationType;
    navigator.camera.getPicture(this.onPhotoDataSuccess.bind(this), this.onFail, {
      quality: 20,
      allowEdit: false,
      destinationType: destinationType.DATA_URL
    });
  }

  uploadPhoto() {
    axios.post('http://majexa.ru:8050/api/v1/tasks/589c52d669cd621dc51be5e4/uploadPhoto', {
      imageData: this.state.imageData
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  }

}

ScreenTaskPhoto.contextTypes = {
  store: React.PropTypes.object
};

const mapStateToProps = state => (state);

export default connect(
  mapStateToProps
)(ScreenTaskPhoto);


