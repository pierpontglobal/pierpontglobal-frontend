import React from 'react';
import TimeAgo from 'react-timeago';
import ConditionBtn from '../ConditionBtn/ConditionBtn';
import ColorBtn from './ColorBtn/ColorBtn';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';
import Span from '../styles/Span/Span';

const ContentText = ({ children, className = 'mb-0' }) => (
  <Text
    className={className}
    fontSize="0.875em"
    lineHeight={1.64}
  >
    {children}
  </Text>
);

function CarDetailCard({ car }) {
  return (
    <Container
      style={{ width: '100%' }}
      className="pl-3 py-3 mb-3"
      maxWidth="22em"
      backgroundColor="#fafafa"
      boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
    >
      <Text
        fontSize="2em"
        fontWeight={300}
        lineHeight={1.34}
      >
        {car.title}
      </Text>
      <ContentText>
        <Span fontWeight={600}>Sale Date: </Span>
        <Span
          fontSize="14px"
          fontWeight={600}
          lineHeight={1.33}
          className="mb-2"
          fontColor="#0bb761"
        >
          <TimeAgo date={car.saleDate} />
        </Span>
      </ContentText>
      <ContentText>
        <Span fontWeight={600}>VIN: </Span>
        {car.vin}
      </ContentText>
      <ContentText className="d-flex">
        <Span
          style={{ width: '30%' }}
          className="d-flex"
          fontWeight={600}
        >
                    Exterior:
          <ColorBtn color={car.exteriorColor} />
        </Span>
        <Span
          style={{ width: '30%' }}
          className="d-flex pr-4"
          fontWeight={600}
        >
                    Interior:
          <ColorBtn color={car.interiorColor} />
        </Span>
      </ContentText>
      <Container width="96px">
        { car.score ? <ConditionBtn score={car.score} /> : <ConditionBtn score={null} />}
      </Container>
    </Container>
  );
}

export default CarDetailCard;
