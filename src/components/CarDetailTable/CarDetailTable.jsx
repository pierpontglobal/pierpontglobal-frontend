import React from 'react';
import Detail from './Detail/Detail';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';

function CarDetailTable({ car }) {
  return (
    <Container
      className="d-flex flex-column"
      backgroundColor="#fafafa"
      boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
    >
      <Text
        className="mb-0 py-3 pl-3"
        fontWeight={600}
        lineHeight={1.31}
      >
                    Vehicle Specifications
      </Text>
      <div>
        {Object.keys(car).map(
          (key, i) => (
            <Detail
              stripe={i === 0 || i % 2 === 0}
              title={key}
              text={car[key] ? (Array.isArray(car[key]) ? `${car[key].length} Elements` : car[key]) : ('Not available')}
            />
          ),
        )}
      </div>
    </Container>
  );
}

export default CarDetailTable;
