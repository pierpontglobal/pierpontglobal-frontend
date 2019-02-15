import React from 'react';
import Countdown from 'react-countdown-now';
import Btn from '../Btn/Btn';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';
import './styles.css';
import posed from 'react-pose';
import SimpleButton from './SimpleButton';
import { allSettled } from 'rsvp';

const Completionist = () => <span>Bid process started!</span>;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const ExpandableDiv = posed.div({
  retracted: {
    height: '80px',
  },
  expanded: {
    height: '280px',
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
      auctionDate, bid, orderNumber, carTitle, vin, data,
    } = this.props;

    this.state = {
      status: false,
      auctionDate,
      bid,
      orderNumber,
      carTitle,
      vin,
      data,
    };
  }

  render() {
    const {
      auctionDate, bid, orderNumber, carTitle, status, vin, data,
    } = this.state;


    const auctionDateFormatted = new Date(auctionDate);
    const auctionDateTime = auctionDateFormatted.getTime();
    const bidRemovalTimeLimit = auctionDateTime - (1 * 60 * 60 * 1000); // Represents one hour
    const bidRemovalDateLimit = auctionDateFormatted.setTime(bidRemovalTimeLimit);
    const passBidRemovalAction = new Date() > bidRemovalDateLimit;

    return (
      <ExpandableDiv
        pose={status ? 'expanded' : 'retracted'}
        style={{
          height: '80px',
          borderBottom: 'solid 1px #dedede',
          overflow: 'hidden',
        }}
      >
        <div style={{
          display: 'flex',
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
            <button
              className="border-0 fas fa-car"
              type="button"
              style={{
                background: 'transparent',
                color: 'rgb(59, 68, 75)',
                textAlign: 'center',
                margin: '10px',
                lineHeight: '12px',
                cursor: 'pointer',
              }}
              onClick={() => { window.location.href = `/marketplace/car?vin=${vin}`; }}
            >
              <br />
              <span style={{ fontFamily: 'Raleway', fontSize: '12px', lineHeight: '12px' }}>
              View lot
              </span>
            </button>
            <RotatableIcon onClick={() => { this.setState({ status: !status }); }} style={{ color: 'rgb(59, 68, 75)', marginRight: '10px', cursor: 'pointer' }} className="fas fa-angle-down" />
          </div>
        </div>
        <div style={{ padding: '0 30px' }}>
          <hr />
          <div style={{ width: '80%', float: 'left' }}>
            <div className="auction-detail-conatiner">
              <div className="auction-detail-name">Car ID</div>
              <div>{data.car_id ? data.car_id : 'Not Available'}</div>
            </div>
            <div className="auction-detail-conatiner">
              <div className="auction-detail-name">Car maker</div>
              <div>{data.car_maker ? data.car_maker : 'Not Available'}</div>
            </div>
            <div className="auction-detail-conatiner">
              <div className="auction-detail-name">Car model</div>
              <div>{data.car_model ? data.car_model : 'Not Available'}</div>
            </div>
            <div className="auction-detail-conatiner">
              <div className="auction-detail-name">Year</div>
              <div>{data.year ? data.year : 'Not Available'}</div>
            </div>
            <div className="auction-detail-conatiner">
              <div className="auction-detail-name">Trim</div>
              <div>{data.trim ? data.trim : 'Not Available'}</div>
            </div>
            <div className="auction-detail-conatiner">
              <div className="auction-detail-name">Vin</div>
              <div>{data.vin ? data.vin : 'Not Available'}</div>
            </div>
            <div className="auction-detail-conatiner">
              <div className="auction-detail-name">Channel</div>
              <div>{data.channel ? data.channel : 'Not Available'}</div>
            </div>
          </div>
          <div style={{ width: '20%', float: 'left' }}>
            <SimpleButton text="Modify bid amount" iconClass="fas fa-pen" />
            <SimpleButton
              text="Cancel bid"
              iconClass="fas fa-times"
              disabledText="You are passed the time available for cancelling a bid"
              disabled={passBidRemovalAction}
            />
          </div>
        </div>
      </ExpandableDiv>
    );
  }
}

export default BidCard;
