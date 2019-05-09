/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import NextArrowIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom';

const StepsWrapper = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    max-height: 280px;
    overflow-y: auto;
  }
`;

const Step = styled.span`
  padding: 8px;
  border-radius: 8px;
  background-color: #3e78c0;
  color: white;
`;

const NextArrow = styled(NextArrowIcon)`
  @media only screen and (max-width: 768px) {
    transform: rotate(90deg);
  }
`;

const ResponsiveImageCentered = styled.img`
  margin: 0 auto;
  box-shadow: 0px 0xp 4px 2px rgb(0, 0, 0, 0.8);
  width: ${props => (props.imageWidth ? props.imageWidth : '40%')};
  float: left;
  border-radius: 10%;
  margin-right: 1.5rem;
  @media only screen and (max-width: 768px) {
    width: 80%;
    float: none;
    margin: auto;
    display: block;
  }
`;

const YoutubeHolder = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25;
  height: 0;
`;

const ImageText = styled.div`
  ::after {
    clear: both;
  }
`;

const Button = styled.button`
  padding: 4px;
  background-color: transparent;
  color: #3e78c0;
  font-weight: 600;
  border-radius: 8px;
  font-style: italic;
  border: none;
  box-shadow: none;
  &:hover {
    text-decoration: underline;
    animation: 0.5s;
  }
`;

const tutorials = ([
  {
    id: 1,
    category: 'basics',
    title: 'How to Sign Up',
    body: [
      {
        heading: 'Sign up process',
        content:
  <div>
    <StepsWrapper>
      <Step>Home Page</Step>
      <NextArrow />
      <Step>Fill out form</Step>
      <NextArrow />
      <Step>Click confirmation button in email</Step>
      <NextArrow />
      <Step>Complete information</Step>
      <NextArrow />
      <Step>Select username and password</Step>
    </StepsWrapper>
    <p style={{ marginTop: '16px' }}>
      To sign up in Pierpont Global, just go to the "Home" page a fill out
      the sign up form placed there.
      After that, a confirmation email will be sent to the specified email in the next seconds.
      Once you click the "confirmation button" you'll be redirected to Pierpont Global in order
      to continue the sign up process.
      Here, location information will be set automatically based on your location,
      click next if everytinh looks well to you and select a
      username and a password for your account.
    </p>
    <p>
      We beleive this is such an easy sign up process, if you have any
      troubles when signin up, please, do not hesitate to
      <Button>
        <Link to="contact-us">contact us!</Link>
      </Button>
    </p>
  </div>,
      },
    ],
  },
  {
    id: 2,
    category: 'basics',
    title: 'Creating a dealer',
    // video: {
    //   url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    //   sample: 'https://via.placeholder.com/550',
    // },
    body: [
      {
        heading: 'Steps to register a dealer',
        content:
  <div>
    <p>
      To start using our app you must complete your dealer information. This includes your dealer
      name, your dealer phone and your credit or debit card information.
      A Pop up like the following will appear in your profile page if you haven't complete
      any of this information.
    </p>
    <div>
      <ResponsiveImageCentered alt="Register dealer image | Pierpont Global, Incc" src="/images/supportpage/register-form.png" />
      <ImageText style={{ margin: '16px' }}>
        <p>
          First, introduce your dealer name and your dealer phone. Then, you're
          ready to introduce your dealer card and subscription details.
          If you've any coupon, introduce it and the price will automatically be
          ajusted depending on your coupon dicount percentage.
          Then, introduce your card number, the expiration date and the security code.<br />
          <b>Note: </b> We'll charge almost <i>US$1.00</i> dollar to confirm your credit card.
          <br /><br />
          Here you have the option to sign out or go to to
          <Button>
            <Link to="/marketplace">Marketplace page</Link>
          </Button> to start viewing the cars in our rich inventory!
        </p>
      </ImageText>
    </div>
  </div>,
      },
    ],
  },
  {
    id: 3,
    category: 'basics',
    title: 'Adding / Removing Cards',
    body: [
      {
        heading: 'Adding a card',
        content:
  <div>
    Nagivate to the
    <Button>
      <Link to="/user">Profile page</Link>
    </Button>
    and then go to the "Payment Methods" section in the settings side.
    <ResponsiveImageCentered style={{ marginTop: '16px' }} imageWidth="55%" src="/images/supportPage/payment-methods-section.png" />
    <ImageText style={{ marginTop: '16px' }}>
      <p>
        Here you can click <b>"+ Add payment method"</b>, and a pop up dialog will
        appear asking you the information for the new card.
      </p>
      <br />
      <p>
        Here you will add the new credit card number, expiration date and security
        code (CVC) located at the back of the card.
      </p>
    </ImageText>
  </div>,
      },
      {
        heading: 'Removing a card',
        content:
  <div>
    To remove a card just click the <b>"DELETE"</b> button located at the
    end of each card as you can see in the previous image where the card is being displayed.
  </div>,
      },
    ],
  },
  {
    id: 4,
    category: 'basics',
    title: 'Push notifications',
    body: [
      {
        heading: 'What is it?',
        content:
  <div>
    Push notifications are alert-style messages that appear at the top or top-right
    corner of your web browser. On a smartphone, they appear at the center
    of your screen. Push notifications provide value and convenience to browser
    and smartphone users. Push notifications allow marketers to reach prospects
    and customers directly. In summary, this are notifications in your phone
    like notifications from whatsapp, instagram, etc..
  </div>,
      },
      {
        heading: 'Subscribe / unsubscribe',
        content:
  <div>
    Nagivate to the
    <Button>
      <Link to="/user">Profile page</Link>
    </Button>
    and then go to the "Notifications" section in the settings side.
    <br /><br />
    To subscribe or unsubscribe just click the button to switch the desitred behaviour.
    Note that if you unsubcribe you'll only be receiving notifications by our app or email,
    this notification WILL NOT reach to your phone directly. So if you want the notification
    appears in the screen of your phone, choose <b>"SUBSCRIBE FROM PUSH NOTIFICATIONS"</b>.
  </div>,
      },
    ],
  },
  {
    id: 5,
    category: 'bids',
    title: 'Place a bid',
    video: {
      youtube: true,
      iframe:
  <YoutubeHolder>
    <iframe
      title="Place a bid | Pierpont Global"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      src="https://www.youtube.com/embed/92VxQ8EbZ14"
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </YoutubeHolder>,
    },
    body: [
      {
        heading: 'How to place a bid?',
        content:
  <div>
    <p>
      Nagivate to the
      <Button>
        <Link to="/marketplace">Marketplace page</Link>
      </Button>
      and find the car you like most, you can use our advanced filters located in the left panel.
      Once you have it, click on it an you'll be redirected to the detail page
      of the selected car.
    </p>
    <br />
    <p>
      Once you're there, introduce your max bid for the car and click on <b>"bid"</b>. If
      you don't have enaough funds, a modal will appear showing you how much
      you should have. Click on the "green button" ADD FUNDS, in order to make a
      deposit with that amount. Once you make the deposit, you can find the car again
      and you'll be able the place the bid with the amount you tried before.
    </p>
  </div>,
      },
    ],
  },
]);

export default tutorials;
