import React from 'react';
import Countdown from 'react-countdown-now';
import Btn from '../Btn/Btn';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';
import './styles.css';
import posed from 'react-pose';

const Completionist = () => <span>Bid process started!</span>;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const ExpandableDiv = posed.div({
  retracted: {
    height: '80px',
  },
  expanded: {
    height: '360px',
  },
});

const RotatableIcon = posed.i({
  retracted: {
    rotate: 0,
  },
  expanded: {
    rotate: 180,
  },
});

const renderer = ({
  days, hours, minutes, seconds, completed,
}) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  }
  // Render a countdown
  return (
    <span style={{ fontWeight: 800 }}>
      {`${days} Days ${hours.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}`}
    </span>
  );
};

class BidCard extends React.Component {
  constructor(props) {
    super(props);

    const {
      auctionDate, bid, orderNumber, carTitle,
    } = this.props;

    this.state = {
      status: false,
      auctionDate,
      bid,
      orderNumber,
      carTitle,
    };
  }

  render() {
    const {
      auctionDate, bid, orderNumber, carTitle, status,
    } = this.state;

    return (
      <ExpandableDiv pose={status ? 'expanded' : 'retracted'} style={{ height: '80px' }}>
        <div style={{
          display: 'flex',
          borderBottom: 'solid 1px #dedede',
          padding: '10px',
          justifyContent: 'space-between',
        }}
        >
          <div className="pt-md-3 pt-1">
            <div>
              <Text
                opacity={0.87}
                fontSize="1em"
                fontWeight={600}
                lineHeight={1.25}
                className="mb-0"
              >
                {carTitle}
              </Text>
              <Text
                opacity={0.54}
                fontSize="0.75em"
                lineHeight={1.67}
                className="mb-0"
              >
                {`Order Number: ${orderNumber}`}
              </Text>
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}
          >
            <div className="d-flex flex-column pr-3">
              <Text
                opacity={0.54}
                size="0.75em"
                lineHeight={1.67}
                className="mb-0 text-right"
              >
                Auction goes on
              </Text>
              <Countdown
                date={auctionDate}
                renderer={renderer}
              />
              <Text
                fontSize="0.75em"
                lineHeight={1.67}
                className="mb-0 text-right"
              >
                Your bid:
                <span style={{ color: '#0bb761' }}>
                  {' '}
                  $
                  {numberWithCommas(bid)}
                </span>
              </Text>
            </div>
            <RotatableIcon onClick={() => { this.setState({ status: !status }); }} style={{ color: 'rgb(59, 68, 75)', marginRight: '10px', cursor: 'pointer' }} className="fas fa-angle-down" />
          </div>
        </div>
      </ExpandableDiv>
    );
  }
}

export default BidCard;
