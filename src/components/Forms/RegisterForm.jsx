import AccountFields from './RegistrationForm/AccountFields';
import SuccessfulPortion from './RegistrationForm/SuccesfullPortion';

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
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.nextView = this.nextView.bind(this);
    this.loadingScreenState = this.loadingScreenState.bind(this);
  }

  openModal() {
    this.setState({ openModal: true });
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  nextView() {
    this.setState({
      step: this.state.step + 1,
    });
  }

  loadingScreenState() {
    this.setState({
      loading: false,
    });
    console.log(this.state);
  }

  render() {
    const { loading } = this.state;
    switch (this.state.step) {
      case 1: return (
        <div style={{
          height: this.props.height,
          width: '100%',
          backgroundColor: this.props.backgroundColor,
        }}
        >
          <AccountFields
            textColor={this.textColor}
            fieldValues={fieldValues}
            nextButton={this.nextView}
            loadinStop={this.loadingScreenState}
          />
        </div>
      );
      default:
        if (loading === true) {
          return (

            <div style={{
              height: this.props.height,
              width: '100%',
              backgroundColor: this.props.backgroundColor,
            }}
            >
              <SuccessfulPortion
                loading
                fieldValues={fieldValues}
                signInElement={this.openModal}
              />
            </div>
          );
        }
        return (

          <div style={{
            height: this.props.height,
            width: '100%',
            backgroundColor: this.props.backgroundColor,
          }}
          >
            <SuccessfulPortion
              fieldValues={fieldValues}
              signInElement={this.openModal}
            />
          </div>
        );
    }
  }
}

export default Registration;
