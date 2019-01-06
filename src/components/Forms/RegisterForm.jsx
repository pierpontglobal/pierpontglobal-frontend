import AccountFields from './RegistrationForm/AccountFields';
import AddressFields from './RegistrationForm/AddressFields';
import UserFields from './RegistrationForm/UserFields';
import SuccessfulPortion from './RegistrationForm/SuccesfullPortion';
import Button from '../Btn/Btn';
import { SignInModal } from '../support/AccountManager';
import Text from '../styles/Text/Text';

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
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      loading: true,
      openModal: false,
    };

    this.textColor = this.props.textColor ? this.props.textColor : '#000000';
    this.moveSection = this.moveSection.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    console.log(process.env.NODE_ENV);
  }

  openModal() {
    this.setState({ openModal: true });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  moveSection(data, step) {
    this.setState({ step });

    Object.keys(data).forEach((key) => {
      fieldValues[key] = data[key];
    });
  }

  render() {
    return (
      <div style={{
        height: this.props.height,
        width: '100%',
        backgroundColor: this.props.backgroundColor,
      }}
      >
        <AccountFields textColor={this.textColor} fieldValues={fieldValues} nextButton={this.moveSection} />
      </div>
    );
    /* case 2:
        return (
          <div style={{
            height: this.props.height,
            width: '100%',
            backgroundColor: this.props.backgroundColor,
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
            height: this.props.height,
            width: '100%',
            backgroundColor: this.props.backgroundColor,
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
            height: this.props.height,
            width: '100%',
            backgroundColor: this.props.backgroundColor,
          }}
          >
            <SuccessfulPortion
              loading={this.state.loading}
              fieldValues={fieldValues}
              nextButton={this.moveSection}
              signInElement={this.openModal}
            />

            { this.state.openModal ? <SignInModal show notifyClosed={this.closeModal} /> : <div /> }
          </div>
        ); */
  }
}

export default Registration;
