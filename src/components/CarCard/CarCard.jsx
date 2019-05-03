import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import posed from 'react-pose';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ConditionBtn from '../ConditionBtn/ConditionBtn';
import PriceTag from './PriceTag/PriceTag';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import IframeModal from '../iframe-modal/IframeModal';

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

const ImageWrapper = styled(LazyLoadImage)`
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

const DropDown = posed.i({
  open: {
    rotate: 225,
  },
  closed: {
    rotate: 45,
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
  min-width: 200px;
  @media only screen and (max-width: 600px) {
    width: 50%;
    margin-top: 0px;
    min-width: '';
  }
`;

function pickHex(color1, color2, color3, weightRaw) {
  const weight = weightRaw > 5 ? 5 : weightRaw;
  if (weight === null) {
    return [169, 169, 169];
  } if (weight === 2.5) {
    return color2;
  } if (weight < 2.5) {
    const w1 = weight / 2.5;
    const w2 = 1 - w1;
    const rgb = [Math.round(color2[0] * w1 + color3[0] * w2),
      Math.round(color2[1] * w1 + color3[1] * w2),
      Math.round(color2[2] * w1 + color3[2] * w2)];
    return `${rgb[0]} , ${rgb[1]} , ${rgb[2]}`;
  }
  const w1 = (weight - 2.5) / 2.5;
  const w2 = 1 - w1;
  const rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2)];
  return `${rgb[0]} , ${rgb[1]} , ${rgb[2]}`;
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
  @media only screen and (max-width: 748px) {
    padding: 4px 8px;
  }
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

const DropDownIcon = styled(DropDown)`
  box-sizing: border-box;
  height: 4vw;
  width: 4vw;
  border-style: solid;
  border-color: black;
  border-width: 0px 3px 3px 0px;
  margin: 4px;
  position: relative;
  top: -5px;
  left: 0;
  @media only screen and (min-width: 600px) {
    display: none;
  }
`;

const DetailValue = styled.span`
  font-size: 0.85rem;
  margin-left: 4px;
  @media only screen and (max-width: 600px) {
    margin-left: 4px;
  }
`;

const AutoCheckBtn = styled.button`
  border-radius: 4px;
  background-color: #3e78c0;
  font-size: 0.75em;
  font-weight: bold;
  line-height: 1.33;
  color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
  border-style: none;
  margin-top: 10px;
  padding: 8px;
  &:hover {
    cursor: pointer;
    background-color: #4c87cc !important;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 8%;
    margin: 8px;
    max-height: none;
    padding: 4px;
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

function gotToCarDetail(vin, event, history) {
  if (!!event && !!event.target) {
    if (event.target.tagName === 'LI' || event.target.tagName === 'SPAN' || event.target.tagName === 'DIV') {
      if (event.target.id) {
        if (event.target.id === 'autocheck-btn') {
          return;
        }
      }
      history.push(`/marketplace/car?vin=${vin}`);
    }
  }
}

function CarCard({
  key, car, requestFunction, history, intl,
}) {
  const [openDetails, setOpenDetails] = useState('closed');
  const [openAutocheck, setOpenAutocheck] = useState(false);
  const [autocheckSource, changeAutocheckSource] = useState('');

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

  const difference = saleDate - new Date();
  const timeDiff = Math.abs(difference);
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const labels = {
    autocheckBtn: intl.formatMessage({ id: 'label.autocheck' }),
  };

  return (
    <>
      <CarContainer
        key={key}
        id="car-card"
        onClick={e => gotToCarDetail(vin, e, history)}
        on
      >
        <Carousel
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
        >
          {images.map((image, i) => (
            <ImageWrapper
              effect="blur"
              id="image-carousel"
              key={i}
              src={image}
              threshold={1000}
              delayTime={1000}
            />
          ))}
        </Carousel>
        <DetailsContainer>
          <DetailTitle>
            <div>
              <span style={{ fontSize: '16px', fontWeight: 600 }}>{`${car.year || ''} ${car.make || ''} ${car.model || ''} ${car.trimLevel || ''}`}</span>
            </div>
            <DropDownIcon pose={openDetails} onClick={() => setOpenDetails(state => (state === 'open' ? 'closed' : 'open'))} />
          </DetailTitle>
          <hr style={{ margin: '0 0 5px' }} />
          <input hidden name="VIN" value={vin} />
          <DetailContent pose={openDetails} state={(openDetails === 'open') ? 'show' : 'hidden'}>
            <Detail>
              <DetailLabel>
                <FormattedMessage id="car.vin" />
              </DetailLabel>
              <DetailValue>{vin}</DetailValue>
            </Detail>
            <Detail>
              <DetailLabel>
                <FormattedMessage id="car.odometer" />
              </DetailLabel>
              <DetailValue>{numberWithCommas(odometer)}</DetailValue>
            </Detail>
            <Detail>
              <DetailLabel>
                <FormattedMessage id="car.engine" />
              </DetailLabel>
              <DetailValue>{engine}</DetailValue>
            </Detail>
            <Detail>
              <DetailLabel>
                <FormattedMessage id="car.transmission" />
              </DetailLabel>
              <DetailValue>{transmission}</DetailValue>
            </Detail>
          </DetailContent>
        </DetailsContainer>
        <CRPriceContainer>
          <DetailedCR>
            <ConditionBtn label={<FormattedMessage id="label.condition" />} score={cr} />
            <AutoCheckBtn onClick={() => { changeAutocheckSource(crUrl); setOpenAutocheck(true); }}>
              <span id="autocheck-btn">{ labels.autocheckBtn }</span>
            </AutoCheckBtn>
          </DetailedCR>
          <PriceContainer>
            <TimeAgoContainer diffDays={diffDays}>
              <TimeAgo date={saleDate} />
            </TimeAgoContainer>
            <PriceTag
              price={wholePrice}
              vin={vin}
              requestFunction={requestFunction}
            />
          </PriceContainer>
        </CRPriceContainer>
      </CarContainer>
      <IframeModal open={openAutocheck} src={autocheckSource} width="90%" height="90%" handleClose={() => { changeAutocheckSource(''); setOpenAutocheck(false); }} />
    </>
  );
}

export default withRouter(injectIntl(CarCard));
