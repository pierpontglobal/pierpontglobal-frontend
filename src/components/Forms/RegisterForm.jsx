import styled from 'styled-components';
import AccountFields from './RegistrationForm/AccountFields';
import SuccessfulPortion from './RegistrationForm/SuccesfullPortion';

const Wrapper = styled.div`
  height: ${props => props.height};
  background: ${props => props.background};
  width: 100%;
  background-repeat: no-repeat;
  background-position: center 8%; /* Center the image */
  background-size: cover;
`;

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
  }

  render() {
    const { loading } = this.state;
    switch (this.state.step) {
      case 1: return (
        <Wrapper height={this.props.height} background={this.props.background}>
          <AccountFields
            textColor={this.textColor}
            fieldValues={fieldValues}
            nextButton={this.nextView}
            loadinStop={this.loadingScreenState}
          />
        </Wrapper>
      );
      default:
        if (loading === true) {
          return (

            <Wrapper height={this.props.height} background={this.props.background}>
              <SuccessfulPortion
                email={fieldValues.email}
                loading
                fieldValues={fieldValues}
                signInElement={this.openModal}
              />
            </Wrapper>
          );
        }
        return (

          <Wrapper height={this.props.height} background={this.props.background}>
            <SuccessfulPortion
              email={fieldValues.email}
              textColor={this.textColor}
              fieldValues={fieldValues}
              signInElement={this.openModal}
            />
          </Wrapper>
        );
    }
  }
}

export default Registration;
