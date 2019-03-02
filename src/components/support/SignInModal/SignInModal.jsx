import React from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { ApiServer } from '../../../Defaults';
import Modal from '../../Modal/Modal';
import Input from '../../styles/Input/Input';
import Button from '../../Btn/Btn';
import './styles.css';

class SignInModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSigIn: props.show,
      rotate: 'normal',
      failed: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signInModal = this.signInModal.bind(this);
  }

  closeModal() {
    this.setState({ showSigIn: false });
    try {
      const { notifyClosed } = this.props;
      notifyClosed();
    } catch (error) {
      console.log(error);
    }
  }

  openModal() {
    this.setState({ showSigIn: true });
  }

  signInModal() {
    const { rotate, failed } = this.state;

    return (
      <Modal style={{ position: 'absolute' }} height="320px" show notifyClosed={this.closeModal} title="User sign in">
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
          <p style={{ color: 'red', display: failed ? 'block' : 'none' }}>Wrong credentials</p>
          <Input
            style={{
              height: '40px',
              border: '0px',
            }}
            className="w-100 pl-2"
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
              border: '0px',
            }}
            className="w-100 pl-2"
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
                  display: rotate === 'rotate' ? 'flex' : 'none',
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
    const response = await axios.post(`${ApiServer}/oauth/token`, data);
    if (response.status === 200) {
      console.log(response);
      cookies.set('token', response.data.access_token);
      window.location.href = '/user';
    } else {
      this.username.className = `${this.username.className} wrong-cre`;
      this.password.className = `${this.password.className} wrong-cre`;
      this.setState({
        rotate: 'none',
        failed: true,
      });
    }
  }

  render() {
    const { showSigIn } = this.state;
    return (
      <div>
        {showSigIn ? this.signInModal() : <div />}
      </div>
    );
  }
}

export default withCookies(SignInModal);
