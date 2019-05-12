import React from 'react';
import Text from '../../styles/Text/Text';
import Icon from '../../styles/Icon/Icon';

function PrevBtn({ car }) {
  const footerText = text => (
    <Text
      className="mb-0"
      opacity={0.54}
      fontSize="0.75em"
      lineHeight={1.33}
    >
      {text}
    </Text>
  );
  return (
    <div className="d-flex flex-row ml-auto pr-2 pr-md-0 mx-auto">
      <div className="d-flex align-items-center pr-3">
        <i style={{ color: '#4276c1' }} className="material-icons">
          arrow_back
        </i>
      </div>
      <div className="pt-2 pr-md-5">
        <Text
          className="mb-0"
          fontWeight={600}
          lineHeight={1.31}
          fontColor="#3e78c0"
        >
          Previous Vehicle
        </Text>
        {footerText(car.title)}
        {footerText(car.price)}
      </div>
    </div>
  );
}

export default PrevBtn;
