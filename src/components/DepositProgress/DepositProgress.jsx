import React from 'react';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';

function DepositProgress({ amount }) {
  const widthProgress = 100 * (amount / 10000);

  return (
    <Container
      style={{
        borderRadius: '5px',
      }}
      className="flex-fill justify-content-end mr-3 shadow"
      backgroundColor="#3e78c0"
    >
      <Text
        className="my-2 py-1 pr-3"
        fontSize="0.875em"
        lineHeight={1.36}
        style={{ color: '#ffffff', float: 'right' }}
      >
              ($)
        {' '}
        {amount}
        {' '}
/ 10000
      </Text>
      <div style={{
        height: '100%',
        backgroundColor: '#3a70b4',
        width: `${widthProgress}%`,
        float: 'left',
      }}
      />
    </Container>
  );
}

export default DepositProgress;
