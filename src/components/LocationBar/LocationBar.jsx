import React from 'react';
import Text from '../styles/Text/Text';
import Span from '../styles/Span/Span';

const lStyle = {
  fontSize: '1em',
  lineHeight: 1.31,
};
const bStyle = {
  fontSize: '0.75em',
  lineHeight: 1.33,
  fontColor: 'rgba(0, 0, 0, 0.54)',
};
function LocationBar({ currentLocation, transportPrice, to }) {
  return (
    <div className="d-flex flex-row justify-content-between px-md-4 py-3 px-1">
      <Text
        className="mb-0"
        fontSize="1em"
        lineHeight={1.31}
      >
        <i className="fas fa-map-marker-alt mr-md-2" style={{ color: '#3e78c0', fontSize: '20px' }} />
        <Span fontWeight={600}>Location:</Span>
        {' '}
        {currentLocation}
      </Text>
      <div className="d-flex flex-column">
        <p
          className="mb-0"
          style={lStyle}
        >
          <span style={{ fontWeight: 600 }}>Ground transport:</span>
          <span
            className="ml-1"
            style={{ color: '#3e78c0' }}
          >
            {`$ ${transportPrice}`}
            <i className="fas fa-info-circle ml-2" style={{ color: '#3e78c0', fontSize: '20px', cursor: 'pointer' }} />
          </span>
        </p>
        <p
          className="mb-0"
          style={bStyle}
        >
          {to}
        </p>
      </div>
    </div>
  );
}

export default LocationBar;
