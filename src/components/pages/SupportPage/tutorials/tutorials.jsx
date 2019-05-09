/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import SignUpTutorial from './SignUpTutorial';
import CreateDealerTutorial from './CreateDealerTutorial';
import AddingCardTutorial from './AddingCardTutorial';
import RemovingCardTutorial from './RemovingCardTutorial';
import PushNotificationTutorial from './PushNotificationTutorial';
import SubscribeTutorial from './SubscribeTutorial';
import { PlaceBidTutorial, PlaceBidVideo } from './PlaceBidTutorial';

const tutorials = ([
  {
    id: 1,
    category: 'basics',
    title: 'How to Sign Up',
    body: [
      {
        heading: 'Sign up process',
        content: <SignUpTutorial />,
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
        content: <CreateDealerTutorial />,
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
        content: <AddingCardTutorial />,
      },
      {
        heading: 'Removing a card',
        content: <RemovingCardTutorial />,
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
        content: <PushNotificationTutorial />,
      },
      {
        heading: 'Subscribe / unsubscribe',
        content: <SubscribeTutorial />,
      },
    ],
  },
  {
    id: 5,
    category: 'bids',
    title: 'Place a bid',
    video: {
      youtube: true,
      iframe: <PlaceBidVideo />,
    },
    body: [
      {
        heading: 'How to place a bid?',
        content: <PlaceBidTutorial />,
      },
    ],
  },
]);

export default tutorials;
