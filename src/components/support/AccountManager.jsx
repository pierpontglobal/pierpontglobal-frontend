import React from 'react';
import SignInModal from './SignInModal/SignInModal';
import './styles.css';
import { withCookies } from 'react-cookie';

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

    const token = cookies.get('token', { path: '/' });

    return (
      <>
        { !token ?
          (
            <button
              type="button"
              onClick={() => { this.setState({ showModal: true }); }}
              className="sign_in_button"
            >
              <i className="far fa-user" id="inner-sign-in-icon" />
                Sign In
              {showModal ? <SignInModal notifyClosed={this.setClosed} show /> : null}
            </button>
          )
          : null
        }
      </>
    );
  }

  render() {
    return (this.getDisplayable());
  }
}

export default withCookies(AccountManager);
