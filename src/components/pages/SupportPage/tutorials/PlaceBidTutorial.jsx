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

const YoutubeHolder = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25;
  height: 0;
`;

export function PlaceBidVideo() {
  return (
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
    </YoutubeHolder>
  );
}

export function PlaceBidTutorial() {
  return (
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
        Once you're there, introduce your max bid for the car and click on
        {' '}
        <b>"bid"</b>
        . If
                you don't have enaough funds, a modal will appear showing you how much
                you should have. Click on the "green button" ADD FUNDS, in order to make a
                deposit with that amount. Once you make the deposit, you can find the car again
                and you'll be able the place the bid with the amount you tried before.
      </p>
    </div>
  );
}

export default PlaceBidTutorial;
