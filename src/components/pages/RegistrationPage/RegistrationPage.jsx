import React from 'react';
import AppNav from '../../AppNav/AppNav';
import './styles.css';

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
                Hecors###
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrationPage;
