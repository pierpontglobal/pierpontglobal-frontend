import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';
import SlideShow from '../SlideShow/SlideShow';
import Detail from './Detail/Detail';
import AutoCheckBtn from '../AutoCheckBtn/AutoCheckBtn';
import ConditionBtn from '../ConditionBtn/ConditionBtn';
import PriceTag from './PriceTag/PriceTag';
import Container from '../styles/Container/Container';
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
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 600px) {
    height: 177px;
    margin-left: 0;
    margin-right: 0;
    flex-direction: row;
  }
    
  @media only screen and (min-width: 768px) {
  }
`;

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

const DropDown = posed.i({
  open: {
    rotate: 180,
  },
  closed: {
    rotate: 0,
  },
});

const DetailsContainer = styled.div`
  width: 100%;
  padding: 10px;
  position: relative;
  
  @media only screen and (min-width: 600px) {
    width: 30%;
  }
    
  @media only screen and (min-width: 768px) {
  }
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
  height: 250px;
  overflow: hidden;

  @media only screen and (min-width: 600px) {
    width: 30%;
    height: 177px;
  }
    
  @media only screen and (min-width: 768px) {
  }
`;

const DetailedCR = styled.div`
  width: 50%;
`;

const PhoneDropDown = styled(DropDown)`

  color: ${DefaultTheme.palette.primary.main} !important;
  position: absolute;
  top: 5px;
  right: 10px;
  display: block !important;

  @media only screen and (min-width: 600px) {
    display: none !important;
  }
    
  @media only screen and (min-width: 768px) {
  }
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

  @media only screen and (min-width: 600px) {
  }
    
  @media only screen and (min-width: 768px) {
  }
`;

const PriceContainer = styled.div`
  
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  justify-items: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  @media only screen and (min-width: 600px) {
    
  }
    
  @media only screen and (min-width: 768px) {
  }
  
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
    <CarContainer
      key={key}
      backgroundColor="#fafafa"
      onClick={(e) => { const _res = e.target.tagName === 'DIV' ? window.location.href = `/marketplace/car?vin=${vin}` : null; }}
    >
      <ImgContainer>
        <Carousel
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
        >
          {images.map(image => (
            <div>
              <img src={image} />
            </div>
          ))}
        </Carousel>
      </ImgContainer>

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
        <PhoneDropDown
          pose={openDetails}
          onClick={() => setOpenDetails(openDetails === 'open' ? 'closed' : 'open')}
          className="fas fa-caret-down"
        />
        <SpecificDetailsContainer pose={openDetails} class>
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
        </SpecificDetailsContainer>
      </DetailsContainer>
      <ConditionContainer>
        <DetailedCR>
          <ConditionBtn
            score={cr}
            className="w-100 mb-2"
          />
          <AutoCheckBtn crUrl={crUrl} className="w-100 py-1 mt-1" />
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
      </ConditionContainer>

    </CarContainer>
  );
}

export default CarCard;
