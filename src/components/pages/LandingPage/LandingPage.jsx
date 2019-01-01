import React from 'react';
import AppNav from '../../AppNav/AppNav';
import VideoBar from '../../Bars/VideoBar';
import Registration from '../../Forms/RegisterForm';
import ManheimLogo from './manheim.png';
import Text from '../../styles/Text/Text';
import Modal from '../../Modal/Modal';

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
      modal = (<Modal show notifyClosed={this.closeModal} title="User sign in" />);
    }

    return (
      <div>
        <AppNav />
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
        Endorced by the best
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
