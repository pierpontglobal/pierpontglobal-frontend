import React from 'react';
import AppNav from '../../AppNav/AppNav';
import MainForm from './Form/MainForm';
import './styles.css';

const validator = require('email-validator');

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <AppNav openModal={this.openModal} notSearchable />

        <div className="registration-bg">
          <div className="container-2">
            <div className="item-5">
              <img alt="Piepont logo" className="big-logo" src="/logos/logo4white_cs.png" />
              <p style={{ textAlign: 'center' }}>Be a part of a new generation. Were constantly building relationships and new partnerships with U.S. based auction houses, transporting companies, automotive service providers, as well as U.S. and Dominican customs</p>
            </div>
            <div className="item-5">
              <div className="shadow registration-form">
                <MainForm location={window.location} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
