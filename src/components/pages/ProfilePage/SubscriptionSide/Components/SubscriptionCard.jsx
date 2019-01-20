import React from 'react';
import { Card } from 'semantic-ui-react';
import PlanLogo from './images/Logo4aWhite.png';

function SubscriptionCard({ planName, endDate }) {
  return (
    <Card style={{ width: '400px', backgroundColor: 'rgb(59, 68, 75)' }} className="shadow">
      <div className="card-container">
        <div className="subscription-logo">
          <img alt="Plan logo" className="plan-logo" src={PlanLogo} />
        </div>
        <div className="subscription-details">
          <h2 style={{ fontWeight: '200' }}>{ planName }</h2>
          <h6>Sold by: PierpontGlobal, LLC</h6>
          <h6>
              Valid until:
            {' '}
            {endDate}
          </h6>
        </div>
      </div>
    </Card>
  );
}

export default SubscriptionCard;
