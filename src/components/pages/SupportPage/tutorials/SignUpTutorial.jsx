import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NextArrowIcon from '@material-ui/icons/NavigateNext';

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

function SignUpTutorial() {
  return (
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
    </div>
  );
}

export default SignUpTutorial;
