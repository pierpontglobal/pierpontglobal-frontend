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
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
    model,
    make,
  } = car;
  return (
    <Container
      key={key}
      className="d-flex flex-row mb-3 pr-3 pl-2 pl-md-0"
      backgroundColor="#fafafa"
      maxHeight="120px"
      boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
    >
      <Container
        className="d-flex mr-md-3 w-auto"
        maxWidth="212px"
      >
        <SlideShow images={images} />
      </Container>
      <Container className="py-1 py-3 pb-3 ml-auto ml-md-0 mr-md-5 w-auto">
        <Detail
          name="Title"
          value={`${make} ${model}`}
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
          fontColor="#0bb761"
        >
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
