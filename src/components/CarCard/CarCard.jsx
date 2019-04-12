import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';
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
  grid-template-columns: 25% 35% 40%;
  background-color: #fff;

  /* Because the Carousel image has a fixed height, this is needed for almost all possibilities. */
  @media only screen and (max-width: 600px) {
    grid-template-rows: 50% 100%;
    grid-template-columns: 100%;
  }
  @media only screen and (max-width: 600px) and (min-width: 500px) {
    grid-template-rows: 260px;
    grid-template-columns: 100%;
  }
  @media only screen and (max-width: 500px) and (min-width: 400px) {
    grid-template-rows: 235px;
    grid-template-columns: 100%;
  }
  @media only screen and (max-width: 400px) and (min-width: 300px) {
    grid-template-rows: 210px;
    grid-template-columns: 100%;
  }
  @media only screen and (max-width: 300px) and (min-width: 200px) {
    grid-template-rows: 180px;
    grid-template-columns: 100%;
  }
  @media only screen and (max-width: 200px) {
    grid-template-rows: 160px;
    grid-template-columns: 100%;
  }
`;

const Container = styled.div`
  padding: 0px 16px;
  display: flex;
`;

const ImageWrapper = styled.img`
  object-fit: cover;
  width: 236px;
  height: 120px;

  /* Because the Carousel image has a fixed height, this is needed for almost all possibilities. */
  @media only screen and (max-width: 600px) and (min-width: 500px) {
    height: 260px;
  }
  @media only screen and (max-width: 500px) and (min-width: 400px) {
    height: 235px;
  }
  @media only screen and (max-width: 400px) and (min-width: 300px) {
    height: 210px;
  }
  @media only screen and (max-width: 300px) and (min-width: 200px) {
    height: 180px;
  }
  @media only screen and (max-width: 200px) {
    height: 160px;
  }
`;

const DropDown = posed.div({
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
  @media only screen and (max-width: 600px) {
    margin-top: 5%;
  }
`;

const DetailedCR = styled(Container)`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: 50%;
    margin-top: 0px;
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
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  justify-items: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: 50%;
    margin-top: 0%;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const DetailTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailsView = posed.div({
  open: { height: 'auto' },
  closed: { height: 0 },
});

const DetailContent = styled(DetailsView)`
  @media only screen and (min-width: 600px) {
    height: auto !important;
  }
  @media only screen and (max-width: 600px) {
    visibility: ${props => props.state};
  }
`;

const DetailLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
`;

const DropDwonIcon = styled(DropDown)`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 12px 12px 0 12px;
  border-color: #000 transparent transparent transparent;
  display: block;
  @media only screen and (min-width: 600px) {
    display: none;
  }
`;

const DetailValue = styled.span`
  font-size: 0.85rem;
  margin-left: 2%;
  @media only screen and (max-width: 600px) {
    margin-left: 0px;
  }
`;

const AutoCheckBtn = styled.button`
  border-radius: 4px;
  background-color: #3e78c0;
  max-height: 24px;
  font-size: 0.75em;
  font-weight: bold;
  line-height: 1.33;
  color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
  border-style: none;
  margin-top: 15%;
  &:hover {
    cursor: pointer;
    background-color: #4c87cc !important;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 8%;
    margin: 8px;
    max-height: none;
    padding: 2px;
    width: 100%;
  }
`;

const CRPriceContainer = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
    justify-items: center;
    align-content: space-between;
    align-items: center;
    @media only screen and (max-width: 600px) {
      margin: 5% 0px;
      justify-content: space-between;
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
    <>
      <CarContainer key={key} id="car-card"
        onClick={(e) => ( console.log(e.target) )} >
        <Carousel
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
        >
          {images.map((image, i) => (
            <ImageWrapper id="image-carousel" key={i} src={image} />
          ))}
        </Carousel>
        <DetailsContainer>
          <DetailTitle>
            <div><span style={{ fontSize: '16px', fontWeight: 600 }}>{`${car.year} ${car.make} ${car.model} ${car.trimLevel}`}</span></div>
            <DropDwonIcon pose={openDetails} onClick={() => setOpenDetails(state => (state === 'open' ? 'closed' : 'open'))} />
          </DetailTitle>
          <hr style={{ margin: '0 0 5px' }} />
          <input hidden name="VIN" value={vin} />
          <DetailContent pose={openDetails} state={(openDetails === 'open') ? 'show' : 'hidden'}>
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
          </DetailContent>
        </DetailsContainer>
        <CRPriceContainer>
          <DetailedCR>
            <ConditionBtn label="Condition" score={cr} />
            <AutoCheckBtn onClick={() => (window.open(crUrl, '', 'width=500,height=500'))}>AutoCheck</AutoCheckBtn>
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
        </CRPriceContainer>
      </CarContainer>
    </>
  );
}

export default CarCard;
