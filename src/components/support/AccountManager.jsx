import React from 'react';
import axios from 'axios';
import posed from 'react-pose';
import Modal from '../Modal/Modal';
import Input from '../styles/Input/Input';
import Button from '../Btn/Btn';
import { ApiServer } from '../../Defaults';

const Spinner = posed.i({
  rotate: {
    rotate: (300 * 2 * 360),
    transition: {
      duration: (1000 * 300),
      ease: 'linear',
    },
  },
  normal: {
    rotate: 0,
    transition: {
      duration: (1000 * 300),
      ease: 'linear',
    },
  },
});

export const userToken = '';

class AccountManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.getDisplayable = this.getDisplayable.bind(this);
    this.setClosed = this.setClosed.bind(this);
  }

  setClosed() {
    this.setState({ showModal: false });
  }

  getDisplayable() {
    const show = this.state.showModal;
    return (
      <div
        onClick={() => { this.setState({ showModal: true }); }}
        style={{
          cursor: 'pointer',
          alignItems: 'center',
          height: '100%',
        }}
        className="mr-lg-5 ml-lg-4 mr-3 ml-2 d-none d-md-flex align-self-center"
      >
        <i className="far fa-user mr-2 pr-1" />
      Sign In
        {show ? <SignInModal notifyClosed={this.setClosed} show /> : <div />}
      </div>
    );
  }

  render() {
    return (this.getDisplayable());
  }
}

export class SignInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSigIn: props.show,
      rotate: 'normal',
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signInModal = this.signInModal.bind(this);
  }

  closeModal() {
    this.setState({ showSigIn: false });
    try {
      this.props.notifyClosed();
    } catch (error) {
      console.log(error);
    }
  }

  openModal() {
    this.setState({ showSigIn: true });
  }

  signInModal() {
    return (
      <Modal height="320px" show notifyClosed={this.closeModal} title="User sign in">
        <form
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={this.signIn}
        >

          <Input
            style={{
              marginTop: '10px',
              height: '40px',
            }}
            className="w-100 pl-2 border-0"
            type="text"
            backgroundColor="#EEEEEE"
            ref={(node) => { this.username = node; }}
            lineHeight={1.31}
            maxWidth="300px"
            maxHeight="40px"
            borderRadius="4px"
            placeholder="Username"
            required
          />

          <Input
            style={{
              marginTop: '10px',
              height: '40px',
            }}
            className="w-100 pl-2 border-0"
            type="password"
            backgroundColor="#EEEEEE"
            lineHeight={1.31}
            ref={(node) => { this.password = node; }}
            maxWidth="300px"
            maxHeight="40px"
            borderRadius="4px"
            placeholder="Password"
            required
          />

          <a
            href="/recover"
            style={{
              marginTop: '10px',
              cursor: 'pointer',
              textDecoration: 'none',
              color: '#000000',
            }}
          >
    Forgot account?
          </a>

          <Button
            type="button"
            marginTop="20px"
            color="#3e78c0"
            height="50px"
            width="160px"
            style={{
              color: 'gray',
            }}
            onClick={() => { this.setState({ rotate: 'rotate' }); }}
          >
            <div style={{ position: 'relative' }}>
        Sign In
              <Spinner
                pose={this.state.rotate}
                style={{
                  position: 'absolute',
                  right: 0,
                  margin: 'auto',
                  top: 0,
                  bottom: 0,
                  alignItems: 'center',
                  display: this.state.rotate === 'rotate' ? 'flex' : 'none',
                }}
                className="fas fa-spinner"
              />
            </div>
          </Button>
        </form>
      </Modal>
    );
  }

  async signIn(e) {
    e.preventDefault();
    const data = {
      username: this.username.value,
      password: this.password.value,
      grant_type: 'password',
    };
    const response = await axios.post(`${ApiServer}/oauth/token`, data);
    console.log(response.data);
  }

  render() {
    return (
      <div>
        {this.state.showSigIn ? this.signInModal() : <div />}
      </div>
    );
  }
}

export default AccountManager;
