import React from 'react';
import axios from 'axios';
import { ApiServer } from '../../Defaults';
import { instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie';
import Modal from '../Modal/Modal';
import Input from '../styles/Input/Input';
import Button from '../Btn/Btn';
import './styles.css'

export const userToken = '';

class AccountManager extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;

    this.state = {
      showModal: false,
      token: cookies.get('token')
    };

    this.validToken = this.validToken.bind(this);

    if (this.state.token !== undefined) {
      this.validToken();
    }

    this.getDisplayable = this.getDisplayable.bind(this);
    this.setClosed = this.setClosed.bind(this);
  }

  async validToken(){
    let config = {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          }
        }
    try {
      const response = await axios.get(`${ApiServer}/api/v1/user`, config)
    } catch (e) {
      const { cookies } = this.props;
      cookies.remove('token')
      window.location.reload(true);
    }
  }

  setClosed() {
    this.setState({ showModal: false });
  }

  // TODO: Verify token validation and re logging if necessary
  getDisplayable() {
    const show = this.state.showModal;
    if (this.state.token !== undefined)
    {
      return (<div
        onClick={() => { window.location.href = "/user" }}
        style={{
          color: '#000000',
          cursor: 'pointer',
          alignItems: 'center',
          height: '100%',
          padding: '10px',
          borderRadius: '5px',
          minWidth: '130px',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}
        className="mr-lg-5 ml-lg-4 mr-3 ml-2 d-none d-md-flex align-self-center"
      >
        <i className="far fa-user mr-2 pr-1" />
          Profile
        {show ? <SignInModal cookies={this.props.cookies} notifyClosed={this.setClosed} show /> : <div />}
      </div>);
    }

    return (
      <div
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
          alignItems: 'center'
        }}
        className="mr-lg-5 ml-lg-4 mr-3 ml-2 d-none d-md-flex align-self-center border-0 button-check shadow"
      >
        <i className="far fa-user mr-2 pr-1" />
          Sign In
        {show ? <SignInModal cookies={this.props.cookies} notifyClosed={this.setClosed} show /> : <div />}
      </div>
    );
  }

  render() {
    return (this.getDisplayable());
  }
}

export class SignInModal extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      showSigIn: props.show,
      rotate: 'normal',
      token: cookies.get('token') || 'none',
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
            type="submit"
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
              <i
                style={{
                  position: 'absolute',
                  right: 0,
                  margin: 'auto',
                  top: 0,
                  bottom: 0,
                  alignItems: 'center',
                  display: this.state.rotate === 'rotate' ? 'flex' : 'none',
                }}
                className="fas fa-spinner loading"
              />
            </div>
          </Button>
        </form>
      </Modal>
    );
  }

  async signIn(e) {
    e.preventDefault();
    const { cookies } = this.props;
    const data = {
      username: this.username.value,
      password: this.password.value,
      grant_type: 'password',
    };
    try {
      const response = await axios.post(`${ApiServer}/oauth/token`, data);
      if (response.status === 200) {
        console.log(response);
        cookies.set('token', response.data.access_token);
        window.location.reload();
      }
    } catch (e) {
      cookies.remove('token');
    }
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
