import React from 'react';
import Text from '../../styles/Text/Text';
import Icon from '../../styles/Icon/Icon';

function NextBtn({ car }) {
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
    <div className="d-flex flex-row mx-auto">
      <div className="pt-2 pr-3 text-right">
        <Text
          className="mb-0"
          fontWeight={600}
          lineHeight={1.31}
          fontColor="#3e78c0"
        >
          Next Vehicle
        </Text>
        {footerText(car.title)}
        {footerText(car.price)}
      </div>
      <div className="d-flex align-items-center">
        <i style={{ color: '#4276c1' }} className="material-icons">
          arrow_forward
        </i>
      </div>
    </div>
  );
}

export default NextBtn;
