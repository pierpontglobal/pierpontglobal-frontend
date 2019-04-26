import React from 'react';
import axios from 'axios';
import UnderLine from '../../../Underline/Underline';
import BidCard from '../../../BidCard/BidCard';
import PurchaseCard from '../../../PurchaseCard/PurchaseCard';
import { ApiServer } from '../../../../Defaults';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const HeadingStyle = styled.div`
  font-size: 1em;
  font-weight: 600;
  line-height: 1.31;
  padding: 20px 40px;
  color: #000000;
  @media only screen and (max-width: 768px) {
    padding: 20px 10px;
  }
`;

function bidFormatter(bid) {
  const formattedBid = {
    key: bid.vin,
    orderNumber: `${bid.bid_collector_id}B${bid.id}A${bid.car_id}`,
    bid: parseFloat(bid.amount),
    date: bid.auction_start_date,
    carTitle: `${bid.year ? bid.year : ''} ${bid.car_maker ? bid.car_maker : ''} ${bid.car_model ? bid.car_model : ''} ${bid.trim ? bid.trim : ''}`,
    data: bid,
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
      <HeadingStyle>
        <div className="card shadow content-holder-box">
          <div style={{ padding: '20px' }}>
            <h4>
              <FormattedMessage id="label.your-bids" />
            </h4>
            <p style={{ color: 'darkgrey' }}>
              <FormattedMessage id="label.lock-bid-msg" />
            </p>
          </div>
          <hr style={{ margin: 0 }} />
          <div className="content-main card">
            {bids.sort((a, b) => new Date(b.date) - new Date(a.date)).map(bid => (
              <BidCard
                vin={bid.key}
                key={bid.orderNumber}
                auctionDate={bid.date}
                bid={bid.bid.toFixed(2)}
                orderNumber={bid.orderNumber}
                carTitle={bid.carTitle}
                data={bid.data}
              />
            ))}
          </div>
        </div>

        <div className="card shadow content-holder-box">
          <UnderLine className="justify-content-between">
            <h4 className="mb-0">
              <FormattedMessage id="label.your-purchases" />
            </h4>
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

      </HeadingStyle>
    );
  }
}

export default PurchaseSide;
