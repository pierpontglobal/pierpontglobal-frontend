import React from 'react';
import { withCookies } from 'react-cookie';
import SignInModal from './SignInModal/SignInModal';
import './styles.css';

class AccountManager extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.getDisplayable = this.getDisplayable.bind(this);
    this.setClosed = this.setClosed.bind(this);
  }

  setClosed() {
    this.setState({ showModal: false });
  }

  // TODO: Verify token validation and re logging if necessary
  getDisplayable() {
    const { cookies } = this.props;

    const token = cookies.get('token', { path: '/' });

    if (token) {
      return (
        <button
          type="button"
          onClick={() => { window.location.href = '/user'; }}
          className="sign_in_button"
        >
          <i className="far fa-user" id="inner-sign-in-icon" />
          Profile
        </button>
      );
    }

    return (
      <button
        type="button"
        className="sign_in_button"
        onClick={this.props.showSignIn}
      >
        <i className="far fa-user" id="inner-sign-in-icon" />
          Sign In
      </button>
    );
  }

  render() {
    return (this.getDisplayable());
  }
}

export default withCookies(AccountManager);
