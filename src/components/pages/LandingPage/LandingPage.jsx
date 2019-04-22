import React from 'react';
import Img from 'react-image';
import VideoBar from '../../Bars/VideoBar';
import Registration from '../../Forms/RegisterForm';
import ManheimLogo from './manheim.png';
import './font/flaticon.css';
import './landing_page.css';
import Button from '../../Btn/Btn';
import Notifications from '../../notifications/Notifications';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <VideoBar />
        <Registration
          textColor="#ffffff"
          height="500px"
          background="rgb(65,77,93)"
          background="linear-gradient(0deg, rgba(65,77,93,1) 0%, #3e78c0 100%)"
          openModal={this.openModal}
        />
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

          <p
            className="big-title"
            style={{
              color: '#393e44',
            }}
          >
            Featuring Inventory from Manheim
          </p>

          <p className="title-follow-up" style={{ color: '#393e44' }}>
            Pierpont Global is a licensed partner of Manheim and Cox Automotive Inc.
          </p>
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
          <p
            className="big-title"
            style={{
              color: '#393e44',
            }}
          >
            You`ll have access to
          </p>

          <p className="title-follow-up" style={{ color: '#393e44' }}>
            A platform designed to make buying vehicles much easier .
          </p>

          <div className="cards-holder-3">
            <div className="card-info">
              <Img
                alt="magnifier"
                className="landing-page-icon"
                src={[
                  '/images/marketplace/magnifier/magnifier.webp',
                  '/images/marketplace/magnifier/magnifier.jp2',
                  '/images/marketplace/magnifier/magnifier.jxr',
                  '/images/marketplace/magnifier/magnifier.png',
                ]}
                loader={
                  <div style={{ width: '200px', height: '200px', background: '#dedede' }} />
                }
              />
              <p className="subtitle-medium">Search Listings</p>
              <p className="subtitle-follow-up">Our platform ties together thousands of listings, from dozens of Manheim Auction locations, giving you access to infinitely more vehicle options to buy from.</p>
            </div>
            <div className="card-info">
              <Img
                alt="imac"
                className="landing-page-icon"
                src={[
                  '/images/marketplace/imac/imac.webp',
                  '/images/marketplace/imac/imac.jp2',
                  '/images/marketplace/imac/imac.jxr',
                  '/images/marketplace/imac/imac.png',
                ]}
                loader={
                  <div style={{ width: '200px', height: '200px', background: '#dedede' }} />
                }
              />
              <p className="subtitle-medium">Place Bids</p>
              <p className="subtitle-follow-up">Bid on vehicles right from your computer. Using our provided pricing information and condition reports, you’ll have all the info you need to place well calculated bids.</p>
            </div>
            <div style={{ marginBottom: '30px' }} className="card-info">
              <Img
                alt="pin"
                className="landing-page-icon"
                src={[
                  '/images/marketplace/pin/pin.webp',
                  '/images/marketplace/pin/pin.jp2',
                  '/images/marketplace/pin/pin.jxr',
                  '/images/marketplace/pin/pin.png',
                ]}
                loader={
                  <div style={{ width: '200px', height: '200px', background: '#dedede' }} />
                }
              />
              <p className="subtitle-medium">Delivery</p>
              <p className="subtitle-follow-up">We handle the process of delivering the vehicles from the auction to your near port, while giving you tracking updates along the way. We will get you the best ground transport rates, shipping rates, as well as import customs and tax rates. With all invoices provided in real time.</p>
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
              <p className="subtitle-medium">
                Sign up now –
                <span style={{
                  fontWeight: 'bold',
                }}
                >
                  {' '}
                  Be one of the first to gain access.
                </span>
              </p>
              <p style={{ fontStyle: 'italic', fontSize: '16px', textAlign: 'left' }} className="subtitle-follow-up">“Ever since using this platform, running my business has been so much easier. I never realized how inefficient I was working when buying vehicles before.”</p>
              <p style={{ alignSelf: 'flex-end', marginTop: '50px' }} className="subtitle-follow-up">— Jorge Abreu, Abreu Motors</p>
            </div>
            <div
              style={{
                padding: '20px',
                background: '#ffffff',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}
              className="shadow column-5"
            >
              <Registration backgroundColor="rgb(255, 255, 255, 0.8)" openModal={this.openModal} />
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          width: '100%',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '600px',
        }}
        >
          <Img
            style={{
              position: 'absolute',
              minHeight: '100%',
              minWidth: '100%',
              width: 'auto',
              height: 'auto',
              bottom: '0',
            }}
            alt="Customs"
            className="image-landing"
            src={[
              '/images/marketplace/section1_bg/section1_bg.webp',
              '/images/marketplace/section1_bg/section1_bg.jp2',
              '/images/marketplace/section1_bg/section1_bg.jxr',
              '/images/marketplace/section1_bg/section1_bg.png',
            ]}
            loader={
              <div style={{ width: '100%', height: '100px', background: '#dedede' }} />
                  }
          />

          <div style={{
            position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
          />

          <div style={{ position: 'absolute' }} className="cards-holder-1">
            <div style={{ color: '#ffffff' }} className="column-1">
              <p className="big-title">
              What makes Pierpont unique?
              </p>
              <p style={{ fontSize: '16px', textAlign: 'center', maxWidth: '350px' }} className="subtitle-follow-up">Be apart of a new generation. Were constantly building relationships and new partnerships with U.S. based auction houses, transporting companies, automotive service providers, as well as U.S. and Dominican customs</p>
              <Button
                type="button"
                style={{ marginTop: '12px', maxWidth: '300px' }}
                width="80%"
                maxWidth="300px"
                color="#3e78c0"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth', // Optional, adds animation
                  });
                }}
              >
            Sign up now &gt;&gt;
              </Button>
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
          <div className="cards-holder-1">
            <div className="column-1">
              <p className="big-title">
              Built for dealers by dealers.
              </p>
            </div>
            <div className="cards-holder-2">
              <div
                style={{
                  padding: '10px',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
                className="column-5"
              >

                <Img
                  style={{
                    maxWidth: '600px',
                  }}
                  alt="Customs"
                  className="image-landing"
                  src={[
                    '/images/marketplace/loader1/loader1.webp',
                    '/images/marketplace/loader1/loader1.jp2',
                    '/images/marketplace/loader1/loader1.jxr',
                    '/images/marketplace/loader1/loader1.png',
                  ]}
                  loader={
                    <div style={{ width: '100%', height: '100px', background: '#dedede' }} />
                  }
                />

                <p style={{ width: '100%', textAlign: 'left' }} className="subtitle-medium">
                Logistics
                </p>
                <p>
                  It`s difficult getting a car from one location to another safely and securely,
                  especially when you are in another country. That`s
                  why we`ve created an innovative solution where
                  we facilitate transporting from auction to port, and shipping from U.S.
                  to Dominican Republic, without you having to lift a finger at all.
                </p>
              </div>

              <hr className="phoneDivisor" />

              <div
                style={{
                  padding: '10px',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
                className="column-5"
              >
                <Img
                  style={{
                    maxWidth: '600px',
                  }}
                  alt="Customs"
                  className="image-landing"
                  src={[
                    '/images/marketplace/customs1/customs1.webp',
                    '/images/marketplace/customs1/customs1.jp2',
                    '/images/marketplace/customs1/customs1.jxr',
                    '/images/marketplace/customs1/customs1.png',
                  ]}
                  loader={
                    <div style={{ width: '100%', height: '100px', background: '#dedede' }} />
                  }
                />

                <p style={{ width: '100%', textAlign: 'left' }} className="subtitle-medium">
                Customs
                </p>

                <p>
                  We have experts take your vehicle through customs and handle all
                  legal aspects of the vehicle leaving the United States. We make
                  sure all necessary paperwork is processed accordingly, and make
                  sure your vehicle leaves the port on its designated shipping vessel
                  in a timely manner, with little to no obstacles
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          width: '100%',
          height: 'auto',
          minHeight: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
        >

          <Img
            style={{
              position: 'absolute',
              minHeight: '100%',
              minWidth: '100%',
              width: 'auto',
              height: 'auto',
              bottom: 0,
            }}
            alt="Customs"
            className="image-landing"
            src={[
              '/images/marketplace/landing_bottom/landing_bottom.webp',
              '/images/marketplace/landing_bottom/landing_bottom.jp2',
              '/images/marketplace/landing_bottom/landing_bottom.jxr',
              '/images/marketplace/landing_bottom/landing_bottom.png',
            ]}
            loader={
              <div style={{ width: '100%', height: '100px', background: '#dedede' }} />
                  }
          />

          <div style={{
            position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
          />

          <div style={{ position: 'absolute' }} className="cards-holder-1">
            <div style={{ color: '#ffffff' }} className="column-1">
              <p className="big-title">
                Start working smarter.
              </p>
              <p
                style={{
                  fontSize: '16px',
                  textAlign: 'center',
                  maxWidth: '350px',
                }}
                className="subtitle-follow-up"
              >
                More options. Better pricing. Less headaches.
              </p>
              <Button
                type="button"
                marginTop="96px"
                marginBottom="10px"
                style={{ marginTop: '96px', maxWidth: '300px' }}
                width="80%"
                maxWidth="300px"
                color="#3e78c0"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                SIGN ME UP
              </Button>
              <p style={{ textAlign: 'center' }}>
                By continuing you agree to our
                <br />
                Terms of use
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default LandingPage;
