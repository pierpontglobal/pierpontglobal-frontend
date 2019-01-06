import React from 'react';
import AppNav from '../../AppNav/AppNav';
import VideoBar from '../../Bars/VideoBar';
import Registration from '../../Forms/RegisterForm';
import ManheimLogo from './manheim.png';
import Text from '../../styles/Text/Text';
import './font/flaticon.css';
import './landing_page.css';
import imac from './images/imac.png';
import magnifier from './images/magnifier.png';
import pin from './images/pin.png';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };
  }

  render() {
    return (
      <div>
        <AppNav openModal={this.openModal} notSearchable />
        <VideoBar />

        <Registration textColor="#ffffff" height="500px" backgroundColor="#9aa7b5" openModal={this.openModal} />

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

          <Text
            className="big-title"
            style={{
              color: '#393e44',
            }}
          >
            Endorsed by the best
          </Text>

          <Text className="title-follow-up" style={{ color: '#393e44' }}>
            Pierpont Global is a licensed partner of Manheim and Cox Automitive Inc.
          </Text>
        </div>

        <div style={{
          padding: '40px',
          width: '100%',
          height: 'auto',
          background: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <Text
            className="big-title"
            style={{
              color: '#393e44',
            }}
          >
            You'll have access to
          </Text>

          <Text className="title-follow-up" style={{ color: '#393e44' }}>
            A platform designed to make buying vehicles much easier.
          </Text>

          <div className="cards-holder-3">
            <div className="card-info">
              <img src={magnifier} className="landing-page-icon" />
              <Text className="subtitle-medium">Search Listings</Text>
              <Text className="subtitle-follow-up">Our platform ties together thousands of listings, from dozens of Manheim Auction locations, giving you access to infinitely more vehicle options to buy from.</Text>
            </div>
            <div className="card-info">
              <img src={imac} className="landing-page-icon" />
              <Text className="subtitle-medium">Place Bids</Text>
              <Text className="subtitle-follow-up">Bid on vehicles right from your computer. Using our provided pricing information and condition reports, you’ll have all the info you need to place well calculated bids.</Text>
            </div>
            <div style={{ marginBottom: '30px' }} className="card-info">
              <img src={pin} className="landing-page-icon" />
              <Text className="subtitle-medium">Delivery</Text>
              <Text className="subtitle-follow-up">We handle the process of delivering the vehicles from the auction to your neary port, while giving you tracking updates along the way. We will get you the best ground transport rates, shipping rates, as well as import customs and tax rates. With all invoices provided in real time.</Text>
            </div>
          </div>


        </div>

        <div style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          width: '100%',
          height: 'auto',
          background: '#f6f8fa',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <div className="cards-holder-2">
            <div className="column-5">
              <Text className="subtitle-medium">
                Sign up now –
                <span style={{
                  fontWeight: 'bold',
                }}
                >
                  {' '}
                  Be one of the first to gain access.
                </span>
              </Text>
              <Text style={{ fontStyle: 'italic', fontSize: '16px', textAlign: 'left' }} className="subtitle-follow-up">“Ever since using this platform, running my business has been so much easier. I never realized how inefficient I was working when buying vehicles before.”</Text>
              <Text style={{ alignSelf: 'flex-end', marginTop: '50px' }} className="subtitle-follow-up">— Jorge Abreu, Abreu Motors</Text>
            </div>
            <div
              style={{
                padding: '10px',
                backgroundColor: '#ffffff',
                height: '360px',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
              }}
              className="shadow column-5"
            >
              <Registration height="500px" backgroundColor="#ffffff" openModal={this.openModal} />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default LandingPage;
