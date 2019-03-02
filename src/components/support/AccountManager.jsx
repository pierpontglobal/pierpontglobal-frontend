import React from 'react';
import SignInModal from './SignInModal/SignInModal';

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
          style={{
            color: '#ffffff',
            cursor: 'pointer',
            alignItems: 'center',
            height: '100%',
            padding: '10px',
            borderRadius: '5px',
            minWidth: '130px',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            overflow: 'show',
          }}
          className="border-0 button-check shadow"
        >
          <i className="far fa-user mr-2 pr-1" />
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
        style={{
          color: '#ffffff',
          cursor: 'pointer',
          alignItems: 'center',
          height: '100%',
          padding: '10px',
          borderRadius: '5px',
          minWidth: '130px',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          overflow: 'show',
        }}
        className="border-0 button-check shadow"
      >
        <i className="far fa-user mr-2 pr-1" />
          Sign In
        {showModal ? <SignInModal notifyClosed={this.setClosed} show /> : <div />}
      </button>
    );
  }

  render() {
    return (this.getDisplayable());
  }
}

export default AccountManager;
