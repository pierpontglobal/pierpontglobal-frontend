import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

function SubscribeTutorial() {
  return (
    <div>
      Nagivate to the
      <Button>
        <Link to="/user">Profile page</Link>
      </Button>
      and then go to the "Notifications" section in the settings side.
      <br />
      <br />
      To subscribe or unsubscribe just click the button to switch the desitred behaviour.
      Note that if you unsubcribe you'll only be receiving notifications by our app or email,
      this notification WILL NOT reach to your phone directly. So if you want the notification
appears in the screen of your phone, choose
      {' '}
      <b>"SUBSCRIBE FROM PUSH NOTIFICATIONS"</b>
      .
    </div>
  );
}

export default SubscribeTutorial;
