import React from 'react';
import { gray } from 'ansi-colors';
import AppNav from '../../AppNav/AppNav';
import VideoBar from '../../Bars/VideoBar';
import Registration from '../../Forms/RegisterForm';
import ManheimLogo from './manheim.png';
import Text from '../../styles/Text/Text';
import Modal from '../../Modal/Modal';
import Input from '../../styles/Input/Input';
import Button from '../../Btn/Btn';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ signIn: true });
  }

  closeModal() {
    this.setState({ signIn: false });
  }

  render() {
    let modal = ('');
    if (this.state.signIn == true) {
      modal = (
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
            onSubmit={this.saveAndContinue}
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
              marginTop="20px"
              color="#3e78c0"
              height="50px"
              width="160px"
              style={{
                color: gray,
              }}
            >
            Sign In
            </Button>
          </form>
        </Modal>
      );
    }

    return (
      <div>
        <AppNav openModal={this.openModal} />
        <VideoBar />
        <Registration openModal={this.openModal} />

        <div style={{
          width: '100%',
          height: '384px',
          background: '#f6f8fa',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <img
            style={{
              width: '152.5px',
              height: '152.5px',
              marginBottom: '40px',
            }}
            src={ManheimLogo}
            alt="Manheim logo"
          />

          <Text style={{
            fontSize: '48px',
            color: '#393e44',
          }}
          >
        Endorsed by the best
          </Text>

          <Text style={{ color: '#393e44' }}>
        Pierpont Global is a licensed partner of Manheim and Cox Automitive Inc.
          </Text>
        </div>

        <div style={{
          width: '100%',
          height: '500px',
          background: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <Text style={{
            fontSize: '48px',
            color: '#393e44',
          }}
          >
        You'll have access to
          </Text>

          <Text style={{ color: '#393e44' }}>
        A platform designed to make buying vehicles much easier.
          </Text>

        </div>
        { modal }
      </div>
    );
  }
}

export default LandingPage;
