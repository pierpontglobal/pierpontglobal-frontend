import React from 'react';
import UnderLine from '../../../Underline/Underline';
import RoundBadge from '../../../RoundBadge/RoundBadge';
import BidCard from '../../../BidCard/ BidCard';
import PurchaseCard from '../../../PurchaseCard/PurchaseCard';

const bidStyle = {
    fontSize: '1em',
    fontWeight: 600,
    lineHeight: 1.31,
    color: '#000000'
}
function PurchaseSide({purchases, bids}) {
    return (
        <div className="d-flex flex-column">
            <UnderLine>
                <p
                    className="border-0 p-0 m-0"
                    style={bidStyle}
                >
                    Your bids
                </p>
            </UnderLine>
            {bids.map(bid => <BidCard
                key={bid.orderNumber}
                auctionDate={bid.date}
                bid={bid.amount}
                orderNumber={bid.orderNumber}
                carTitle={bid.carTitle} 
            />)}
            <UnderLine>
                <div
                    className="d-flex flex-fill justify-content-between"
                    style={bidStyle}
                >
                    <span>Your purchases</span> 
                    <RoundBadge count={purchases.length} /> 
                </div>
            </UnderLine>
            {purchases.map(o => <PurchaseCard 
                    key={o.orderNumber}
                    orderNumber={o.orderNumber}
                    car={o.car}
                    steps={o.steps}
                />)}

        </div>
    );
}

export default PurchaseSide;