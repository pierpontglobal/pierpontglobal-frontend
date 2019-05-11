import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormatMessage } from 'react-intl';

const ResponsiveImageCentered = styled.img`
  margin: 0 auto;
  box-shadow: 0px 0xp 4px 2px rgb(0, 0, 0, 0.8);
  width: ${props => (props.imageWidth ? props.imageWidth : '40%')};
  float: left;
  margin-right: 1.5rem;
  @media only screen and (max-width: 768px) {
    width: 80%;
    float: none;
    margin: auto;
    display: block;
  }
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

const AddingCardTutorial = () => (
  <div>
    Nagivate to the
    <Button>
      <Link to="/user">Profile page</Link>
    </Button>
    and then go to the "Payment Methods" section in the settings side.
    <ResponsiveImageCentered style={{ marginTop: '16px' }} imageWidth="55%" src="/images/supportPage/payment-methods-section.png" />
    <ImageText style={{ marginTop: '16px' }}>
      <p>
        Here you can click
        {' '}
        <b>"+ Add payment method"</b>
        , and a pop up dialog will
                appear asking you the information for the new card.
      </p>
      <br />
      <p>
        Here you will add the new credit card number, expiration date and security
        code (CVC) located at the back of the card.
      </p>
    </ImageText>
  </div>
);

export default AddingCardTutorial;
