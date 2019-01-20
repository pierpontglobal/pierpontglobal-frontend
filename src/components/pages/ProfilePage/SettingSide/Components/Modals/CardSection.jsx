import React from 'react';
import { CardElement } from 'react-stripe-elements';

function CardSection() {
  return (
    <label style={{ width: '100%' }}>
      <h4>Card details</h4>
      <p>Pierpont Global accepts all the mayor credit / debit card issuer brands</p>

      {/* <div style={{ marginBottom: '20px' }}>
        <p style={{
          fontSize: '18px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          justifyItems: 'flex-start',
          alignContent: 'center',
          alignItems: 'center',
        }}
        >
          <label style={{ margin: '0 10px 0 0' }} onClick={() => { console.log('clicked'); }} className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round" />
          </label>
        Use your address as billing address
        </p>
      </div> */}

      <CardElement style={{ base: { fontSize: '14px' } }} />
    </label>
  );
}

export default CardSection;
