import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';
import SlideShow from '../SlideShow/SlideShow';
import AutoCheckBtn from '../AutoCheckBtn/AutoCheckBtn';
import ConditionBtn from '../ConditionBtn/ConditionBtn';
import PriceTag from './PriceTag/PriceTag';
import Text from '../styles/Text/Text';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import posed from 'react-pose';
import { DefaultTheme } from '../../Defaults';

import ScaleText from 'react-scale-text';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const CarContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.16);
  box-shadow: 3px 3px 6px rgba(0,0,0,0.16);
  display: grid;
  grid-template-columns: 25% 35% 15% 25%;
  background-color: #fafafa;

  @media only screen and (min-width: 600px) {
    margin-left: 0;
    margin-right: 0;
    flex-direction: row;
  }
`;

const Container = styled.div`
  padding: 0px 16px;
  display: flex;
`

const ConditionContainer = styled.div`
  padding: 0 10px 10px 10px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-content: space-between;
  align-items: center;

  @media only screen and (min-width: 600px) {
    width: 40%;
    padding: 10px;
    align-items: flex-start;
    justify-items: flex-start;
    justify-content: flex-start;
    justify-items: flex-start;
  }
    
  @media only screen and (min-width: 768px) {
  }
`;

const ImageWrapper = styled.img`
  object-fit: cover;
  width: 236px;
  height: 120px;
`;

const DropDown = posed.i({
  open: {
    rotate: 180,
  },
  closed: {
    rotate: 0,
  },
});

const DetailsContainer = styled(Container)`
  flex-direction: column;
  justify-content: space-evenly;
`;

const DetailsView = posed.div({
  open: { height: '90px' },
  closed: { height: 0 },
});


const SpecificDetailsContainer = styled(DetailsView)`
  overflow: hidden;

  @media only screen and (min-width: 600px) {
    overflow: visible;
  }
`;

const ImgContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`;

const DetailedCR = styled(Container)`
  flex-direction: column;
  margin-top: 10%;
`;

const PhoneDropDown = styled(DropDown)`
  color: ${DefaultTheme.palette.primary.main} !important;
  position: absolute;
  top: 5px;
  right: 10px;
  display: block !important;
`;

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
  return `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
}

const TimeAgoContainer = styled.div`
    
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  color: rgb(${props => pickHex([24, 183, 11], [255, 167, 0], [255, 0, 0], props.diffDays)});
  display: flex;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  justify-items: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin-top: 10%;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
`;

const DetailValue = styled.span`
  font-size: 0.85rem;
  margin-left: 2%;
`;

function CarCard({ key, car, requestFuntion }) {
  const [openDetails, setOpenDetails] = useState('closed');

  const {
    vin,
    odometer,
    engine,
    transmission,
    images,
    saleDate,
    cr,
    crUrl,
    wholePrice,
  } = car;

  const diference = saleDate - new Date();
  const timeDiff = Math.abs(diference);
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return (
    <>
      <CarContainer key={key}
        onClick={(e) => ( e.target.tagName === 'DIV' ? window.location.href = `/marketplace/car?vin=${vin}` : null )} >
          <Carousel
              showIndicators={false}
              showStatus={false}
              showThumbs={false}
            >
              {images.map(image => (
                <div>
                  <ImageWrapper src={image} />
                </div>
              ))}
            </Carousel>
            <DetailsContainer>
              <div style={{ width: '100%', fontSize: '16px' }}>
                {car.year}
                {' '}
                {car.make}
                {' '}
                {car.model}
                {' '}
                {car.trimLevel}
              </div>
              <hr style={{ margin: '0 0 5px' }} />
              <div
                name="VIN"
                value={vin}
              />
              <Detail>
                <DetailLabel>Odometer: </DetailLabel>
                <DetailValue>{numberWithCommas(odometer)}</DetailValue>
              </Detail>
              <Detail>
                <DetailLabel>Engine: </DetailLabel>
                <DetailValue>{engine}</DetailValue>
              </Detail>
              <Detail>
                <DetailLabel>Transmission: </DetailLabel>
                <DetailValue>{transmission}</DetailValue>
              </Detail>
            </DetailsContainer>
            <DetailedCR>
              <ConditionBtn
                score={cr}
              />
              <AutoCheckBtn crUrl={crUrl} />
            </DetailedCR>
            <PriceContainer>
              <TimeAgoContainer diffDays={diffDays}>
                <TimeAgo date={saleDate} />
              </TimeAgoContainer>
              <PriceTag
                price={wholePrice}
                vin={vin}
                requestFuntion={requestFuntion}
              />
            </PriceContainer>
      </CarContainer>
    </>
  );
}

export default CarCard;
