import AccountFields from './RegistrationForm/AccountFields';
import AddressFields from './RegistrationForm/AddressFields';
import UserFields from './RegistrationForm/UserFields';
import SuccessfulPortion from './RegistrationForm/SuccesfullPortion';
import Button from '../Btn/Btn';

const React = require('react');

const fieldValues = {
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  phonenumber: null,
  country: '',
  city: null,
  zip: null,
  address1: null,
  address2: null,
  password: null,
  rePassword: null,
};

class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      loading: true,
    };

    this.moveSection = this.moveSection.bind(this);
  }

  moveSection(data, step) {
    this.setState({ step });

    Object.keys(data).forEach((key) => {
      fieldValues[key] = data[key];
    });
  }

  render() {
    switch (this.state.step) {
      default:
        return (
          <div style={{
            height: '500px',
            width: '100%',
            backgroundColor: '#9aa7b5',
          }}
          >
            <AccountFields fieldValues={fieldValues} nextButton={this.moveSection} />
          </div>
        );
      case 2:
        return (
          <div style={{
            height: '500px',
            width: '100%',
            backgroundColor: '#9aa7b5',
          }}
          >
            <div style={{
              paddingLeft: '10px',
              height: '0px',
            }}
            >
              <Button marginTop="10px" color="#0bb761" height="30px" width="100px" onClick={() => { this.setState({ step: 1 }); }}>&#60;&#60; Back</Button>
            </div>
            <AddressFields fieldValues={fieldValues} nextButton={this.moveSection} />
          </div>
        );
      case 3:
        return (
          <div style={{
            height: '500px',
            width: '100%',
            backgroundColor: '#9aa7b5',
          }}
          >
            <div style={{
              padding: '10px',
              height: '0px',
            }}
            >
              <Button color="#0bb761" height="30px" width="100px" onClick={() => { this.setState({ step: 2 }); }}>&#60;&#60; Back</Button>
            </div>
            <UserFields fieldValues={fieldValues} nextButton={this.moveSection} />
          </div>
        );
      case 4:
        return (
          <div style={{
            height: '500px',
            width: '100%',
            backgroundColor: '#9aa7b5',
          }}
          >
            <SuccessfulPortion
              loading={this.state.loading}
              fieldValues={fieldValues}
              nextButton={this.moveSection}
              signInElement={this.props.openModal}
            />
          </div>
        );
    }
  }
}

export default Registration;
