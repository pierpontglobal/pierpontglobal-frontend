import React from 'react';
import MainForm from './Form/MainForm';
import './styles.css';
import { FormattedMessage } from 'react-intl';

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>

        <div className="registration-bg">
          <div className="container-2">
            <div className="item-5">
              <img alt="Pierpont logo" className="big-logo" src="/logos/logo4white_cs.png" />
              <p style={{ textAlign: 'center' }}>
                <FormattedMessage id="registration.message" />
              </p>
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
