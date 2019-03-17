import React from 'react';
import SignInModal from './SignInModal/SignInModal';
import './styles.css';

const qs = require('query-string');

class AccountManager extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    this.state = {
      showModal: this.params.signIn || false,
    };

    this.getDisplayable = this.getDisplayable.bind(this);
    this.setClosed = this.setClosed.bind(this);
  }

  setClosed() {
    this.setState({ showModal: false });
  }

  // TODO: Verify token validation and re logging if necessary
  getDisplayable() {
    const { showModal } = this.state;
    const { cookies } = this.props;

    if (cookies.get('token') !== undefined) {
      return (
        <button
          type="button"
          onClick={() => { window.location.href = '/user'; }}
          className="sign_in_button"
        >
          <i className="far fa-user" id="inner-sign-in-icon" />
          Profile
          {showModal
            ? <SignInModal notifyClosed={this.setClosed} show /> : <div />}
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => { this.setState({ showModal: true }); }}
        className="sign_in_button"
      >
        <i className="far fa-user" id="inner-sign-in-icon" />
          Sign In
        {showModal ? <SignInModal notifyClosed={this.setClosed} show /> : null}
      </button>
    );
  }

  render() {
    return (this.getDisplayable());
  }
}

export default AccountManager;
