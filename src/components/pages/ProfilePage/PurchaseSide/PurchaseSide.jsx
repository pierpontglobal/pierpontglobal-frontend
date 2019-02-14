import React from 'react';
import axios from 'axios';
import UnderLine from '../../../Underline/Underline';
import RoundBadge from '../../../RoundBadge/RoundBadge';
import BidCard from '../../../BidCard/BidCard';
import PurchaseCard from '../../../PurchaseCard/PurchaseCard';
import { ApiServer } from '../../../../Defaults';

const bidStyle = {
  fontSize: '1em',
  fontWeight: 600,
  lineHeight: 1.31,
  color: '#000000',
};

const headingStyle = {
  fontSize: '1em',
  fontWeight: 600,
  lineHeight: 1.31,
  padding: '20px 40px',
  color: '#000000',
};

function bidFormatter(bid) {
  const formattedBid = {
    key: bid.vin,
    orderNumber: `${bid.bid_collector_id}B${bid.id}A${bid.car_id}`,
    bid: parseFloat(bid.amount),
    date: bid.auction_start_date,
    carTitle: `${bid.year} ${bid.car_maker} ${bid.car_model} ${bid.trim}`,
  };
  return formattedBid;
}

function parseBids(bids) {
  const receivedBids = [];
  for (let i = 0; i < bids.length; i += 1) {
    const formattedBid = bidFormatter(bids[i]);
    receivedBids.push(formattedBid);
  }
  return receivedBids;
}

async function retrieveActiveBids() {
  const bidsResponse = (await axios.get(`${ApiServer}/api/v1/user/bids`)).data;
  console.log(bidsResponse);
  return bidsResponse;
}

class PurchaseSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: [],
      purchases: [],
    };
    this.updateBids = this.updateBids.bind(this);
  }

  componentDidMount() {
    this.updateBids();
  }

  async updateBids() {
    const rawBids = await retrieveActiveBids();
    const processedBids = parseBids(rawBids);
    this.setState({ bids: processedBids });
  }

  render() {
    const { bids, purchases } = this.state;
    console.log(bids);

    return (
      <div style={headingStyle}>
        <div className="card shadow content-holder-box">
          <div style={{ padding: '20px' }}>
            <h4>Your bids</h4>
            <p style={{ color: 'darkgrey' }}>All the bids will be locked 1 houre before the bid process start.</p>
          </div>
          <hr style={{ margin: 0 }} />
          <div className="content-main card">
            {bids.map(bid => (
              <BidCard
                key={bid.orderNumber}
                auctionDate={bid.date}
                bid={bid.bid.toFixed(2)}
                orderNumber={bid.orderNumber}
                carTitle={bid.carTitle}
              />
            ))}
          </div>
        </div>

        <div className="card shadow content-holder-box">
          <UnderLine className="justify-content-between">
            <h4 className="mb-0">Your purchases</h4>
          </UnderLine>
          {purchases.map(o => (
            <PurchaseCard
              key={o.orderNumber}
              orderNumber={o.orderNumber}
              car={o.car}
              steps={o.steps}
            />
          ))}
        </div>

      </div>
    );
  }
}

export default PurchaseSide;
