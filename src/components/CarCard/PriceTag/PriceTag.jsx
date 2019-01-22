import React from 'react';
import Text from '../../styles/Text/Text';

function PriceTag({ price, className }) {
  return (
    <Text
      className={className}
      fontSize="calc(1.3em + (1.5 - 1.3) * ((20vw - 21em)/(35 - 21)))"
      fontWeight={100}
      lineHeight={1.34}
    >
      {price}
    </Text>
  );
}

export default PriceTag;
