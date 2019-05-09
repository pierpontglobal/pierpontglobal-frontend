import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

function CreateDealerTutorial() {
  return (
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
Then, introduce your card number, the expiration date and the security code.
            <br />
            <b>Note: </b>
            {' '}
            We'll charge almost
            {' '}
            <i>US$1.00</i>
            {' '}
            dollar to confirm your credit card.
            <br />
            <br />
            Here you have the option to sign out or go to to
            <Button>
              <Link to="/marketplace">Marketplace page</Link>
            </Button>
            {' '}
            to start viewing the cars in our rich inventory!
          </p>
        </ImageText>
      </div>
    </div>
  );
}

export default CreateDealerTutorial;
