import React from 'react';
import BidInput from './BidInput/BidInput';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';
import Btn from '../Btn/Btn';

function BidPanel({ currentBid }) {
  return (
    <Container
      className="d-flex flex-row pt-3 px-3 justify-content-between mb-3"
      maxHeight="105px"
      backgroundColor="#3e78c0"
    >
      <div className="d-flex flex-column">
        <Text
          className="mb-0"
          opacity={0.87}
          fontSize="0.75em"
          lineHeight={1.33}
          fontColor="#ffffff"
        >
                    Current bid:
        </Text>
        <Text
          className="mb-0"
          fontSize="2.5em"
          fontWeight={300}
          lineHeight={1.33}
          fontColor="#ffffff"
        >
          {`${currentBid}`}
        </Text>
      </div>
      <div className="d-flex flex-column">
        <Container
          className="d-flex mb-1 justify-content-end"
          height="60px"
        >
          <BidInput />
          <Btn
            className="w-100"
            maxWidth="96px"
            color="#0bb761"
            hoverColor="#23d17a"
          >
                        BID
          </Btn>
        </Container>
        <Text
          fontSize="0.75em"
          lineHeight={1.33}
          fontColor="rgba(255, 255, 255, 0.87)"
        >
                    You will have to retract your bid until: 01/13 at 9:00 AM ET
        </Text>
      </div>
    </Container>
  );
}

export default BidPanel;
