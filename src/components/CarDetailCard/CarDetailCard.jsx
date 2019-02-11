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

function pickHex(color1, color2, color3, weightRaw) {
  const weight = weightRaw > 5 ? 5 : weightRaw;
  if (weight == null) {
    return [169, 169, 169];
  } if (weight === 2.5) {
    return color2;
  } if (weight < 2.5) {
    const w1 = weight / 2.5;
    const w2 = 1 - w1;
    const rgb = [Math.round(color2[0] * w1 + color3[0] * w2),
      Math.round(color2[1] * w1 + color3[1] * w2),
      Math.round(color2[2] * w1 + color3[2] * w2)];
    return rgb;
  }
  const w1 = (weight - 2.5) / 2.5;
  const w2 = 1 - w1;
  const rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)];
  return rgb;
}

function CarDetailCard({ car }) {
  const diference = Date.parse(car.saleDate) - new Date();
  const timeDiff = Math.abs(diference);
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

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
          fontColor={diference < 0 ? 'rgb(169,169,169)' : `rgb(${pickHex([24, 183, 11], [255, 167, 0], [255, 0, 0], diffDays)})`}
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
