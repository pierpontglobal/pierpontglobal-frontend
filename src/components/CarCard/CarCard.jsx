import React from 'react';
import TimeAgo from 'react-timeago';
import SlideShow from '../SlideShow/SlideShow';
import Detail from './Detail/Detail';
import AutoCheckBtn from '../AutoCheckBtn/AutoCheckBtn';
import ConditionBtn from '../ConditionBtn/ConditionBtn';
import PriceTag from './PriceTag/PriceTag';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function pickHex(color1, color2, color3, weight) {
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

function CarCard({ key, car }) {
  const {
    vin,
    odometer,
    engine,
    transmission,
    images,
    saleDate,
    cr,
  } = car;

  const diference = saleDate - new Date();
  const timeDiff = Math.abs(diference);
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return (
    <Container
      style={{
        cursor: 'pointer',
      }}
      key={key}
      className="d-flex flex-row mb-3 pr-3 pl-2 pl-md-0"
      backgroundColor="#fafafa"
      maxHeight="120px"
      boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
      onClick={(e) => { const _res = e.target.tagName === 'DIV' ? window.location.href = `/marketplace/car?vin=${vin}` : null; }}
    >
      <Container
        className="d-flex mr-md-3 w-auto"
        maxWidth="212px"
      >
        <SlideShow images={images} />
      </Container>
      <Container style={{ width: '220px' }} className="py-1 py-3 pb-3 ml-auto ml-md-0 mr-md-5">
        <Detail
          name=""
          value={(
            <span style={{ fontWeight: '600', fontSize: '13px' }}>
              {car.year}
              {' '}
              {car.make}
              {' '}
              {car.model}
              {' '}
              {car.trimLevel}
            </span>
)}
          className="mb-md-0 w-100"
        />
        <hr style={{ margin: '0 0 5px' }} />
        <Detail
          name="VIN"
          value={vin}
          className="mb-md-0 w-100"
        />
        <Detail
          name="Odometer"
          value={numberWithCommas(odometer)}
          className="mb-md-0"
        />
        <Detail
          name="Engine"
          value={engine}
          className="mb-md-0"
        />
        <Detail
          name="Transmission"
          value={transmission}
          className="mb-md-3"
        />
      </Container>
      <Container
        className="d-none d-md-block py-3 w-100"
        maxWidth="96px"
      >
        <ConditionBtn
          score={cr}
          className="w-100 mb-2"
        />
        <AutoCheckBtn className="w-100 py-1 mt-1" />
      </Container>
      <Container className="py-1 py-3 w-auto ml-md-auto">
        <Text
          fontSize="0.75em"
          fontWeight={600}
          lineHeight={1.33}
          className="mb-2 text-right"
          fontColor={diference < 0 ? 'rgb(169,169,169)' : `rgb(${pickHex([24, 183, 11], [255, 167, 0], [255, 0, 0], diffDays)})`}
        >
          {diference < 0 ? 'Started' : ''}
          {' '}
          <TimeAgo date={saleDate} />
        </Text>
        <PriceTag
          price="Not available price"
          className="text-right mb-0"
        />
      </Container>
    </Container>
  );
}

export default CarCard;
