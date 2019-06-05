import React, { useState } from 'react';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import posed from 'react-pose';
import MediaQuery from 'react-responsive';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import axios from 'axios';
import { ApiServer } from '../../Defaults';
import BookmarkBorderMui from '@material-ui/icons/BookmarkBorder';
import BookmarkMui from '@material-ui/icons/Bookmark';
import ConditionBtn from '../ConditionBtn/ConditionBtn';
import PriceTag from './PriceTag/PriceTag';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import IframeModal from '../iframe-modal/IframeModal';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Heart = (props) => {
  return (
    <i class="fas fa-heart"></i>
  );
}

const CarContainer = styled.div`
  width: ${props => props.useNew ? '380px' : '98%'};
  height: auto;
  margin: ${props => props.useNew ? '12px' : '4px'};
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: ${props => props.useNew ? '0px 0px 4px 2px rgba(0,0,0,0.06)' : '3px 3px 6px rgba(0,0,0,0.16)'};
  display: grid;
  grid-template-columns: ${props => props.useNew ? 'auto' : '1fr 2fr 2fr'};
  grid-template-rows: ${props => props.useNew ? '2fr 1fr minmax(100px, 120px)' : 'auto'};
  background-color: #fff;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  border: ${props => props.useNew ? '' : '1px solid rgba(0,0,0,0.16)'};
  @media only screen and (max-width: 768px) {
    grid-template-rows: ${props => props.showDetail === 'closed' ? '2fr 60px minmax(100px, 120px)' : '2fr 140px minmax(100px, 120px)'};
    grid-template-columns: auto;
    width: 100%;
    margin: 0px 6px;
  }
`;

const Container = styled.div`
  padding: 0px 16px;
  display: flex;
`;

const ImageWrapper = styled(LazyLoadImage)`
  object-fit: cover;
  width: ${props => props.useNew ? '380px' : '236px'};
  height: ${props => props.useNew ? '280px' : '120px'};
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
  @media only screen and (max-width: 768px) {
    
  }
`;

const DetailedCR = styled(Container)`
  display: flex;
  flex-direction: column;
  min-width: 160px;
  @media only screen and (max-width: 768px) {
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
  width: 80%;
  @media only screen and (max-width: 768px) {
    width: 50%;
    margin-top: 0px;
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media only screen and (max-width: 68px) {
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
  padding: 4px;
  @media only screen and (min-width: 600px) {
    height: auto !important;
  }
  @media only screen and (max-width: 600px) {
    visibility: ${props => props.state};
  }
`;

const DetailGroup = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: ${props => props.useNew ? 'row' : 'column'};
  align-items: ${props => props.useNew ? 'center' : 'flex-start'};
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
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
  border-width: 0px 3.5px 3.5px 0px;
  margin: 4px;
  position: relative;
  top: -5px;
  left: 0;
  @media only screen and (min-width: 768px) {
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
      margin: 0px;
      justify-content: space-between;
    }
`;

const BookmarkIcon = styled(BookmarkMui)`

`;

const BookmarBorderIcon = styled(BookmarkBorderMui)`

`;

const BookmarkArea = styled.div`
  position: absolute;
  top: 4px;
  right: 6px;
  z-index: 200;
  padding: 8px;
  background-color: transparent;
  transition: all 0.2s;
  & > i {
    color: ${props => props.active ? 'red' : '#e4e4e4'};
    font-size: ${props => props.useNew ? '1.9rem' : '1.0rem'};
  }
  &:hover {
    & > i {
      color: red;
    }
  }
`;

const CarTitle = styled.div`
  width: 100%;
  height: auto;
  padding: ${props => props.useNew ? '8px' : '4px'};
  display: flex;
  justify-content: ${props => props.useNew ? 'center' : 'flex-start'};;
  align-items: center;
  & > span {
    font-weight: ${props => props.useNew ? '400' : '600'};
    font-size: ${props => props.useNew ? '1.35rem' : '1.08rem'};
  }
  @media only screen and (max-width: 768px) {
    justify-content: space-between;
  }
`;

const ExpandDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 60;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const CarouselWrapper = styled(Carousel)`
  position: relative;
`;

function gotToCarDetail(vin, event, history, position, caller, cookies) {
  if (!!event && !!event.target) {
    if (event.target.tagName === 'LI' || event.target.tagName === 'SPAN' || event.target.tagName === 'DIV') {
      if (event.target.id) {
        if (event.target.id === 'autocheck-btn') {
          return;
        }
      }
      cookies.set('list_caller', caller, { path: '/' });
      history.push(`/marketplace/car?vin=${vin}&position=${position}`);
    }
  }
}

function CarCard({
  key, car, requestFunction, history, intl, position, caller, cookies, handleBookmark, useNewDesign
}) {
  const [openDetails, setOpenDetails] = useState('closed');
  const [openAutocheck, setOpenAutocheck] = useState(false);
  const [autocheckSource, changeAutocheckSource] = useState('');
  // const [carBookmarked, changeBookmark] = useState(car.bookmarked);

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
        onClick={e => gotToCarDetail(vin, e, history, position, caller, cookies)}
        showDetail={openDetails}
        on
        useNew={useNewDesign}
      >
        <BookmarkArea useNew={useNewDesign} active={car.bookmarked} data-cy="bookmark-area" onClick={() => handleBookmark(vin, car.bookmarked)}>
          <Heart />
        </BookmarkArea>
        <CarouselWrapper
          showIndicators={false}
          showStatus={false}
          showThumbs={false}
          data-cy="car-carousel"
          useNew={useNewDesign}
        >
          {images.map((image, i) => (
            <ImageWrapper
              effect="blur"
              id="image-carousel"
              key={i}
              src={image}
              threshold={1000}
              delayTime={1000}
              useNew={useNewDesign}
            />
          ))}
        </CarouselWrapper>
        <DetailsContainer useNew={useNewDesign}>
          <DetailTitle>
            <CarTitle useNew={useNewDesign}>
              <span>{`${car.year || ''} ${car.make || ''} ${car.model || ''} ${car.trimLevel || ''}`}</span>
            </CarTitle>
            <ExpandDetails>
              <DropDownIcon pose={openDetails} onClick={() => setOpenDetails(state => (state === 'open' ? 'closed' : 'open'))} />
            </ExpandDetails>
          </DetailTitle>
          <input hidden name="VIN" value={vin} readOnly />
          <DetailContent useNew={useNewDesign} pose={openDetails} state={(openDetails === 'open') ? 'show' : 'hidden'}>
            <DetailGroup useNew={useNewDesign}>
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
            </DetailGroup>
            <DetailGroup>
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
            </DetailGroup>
          </DetailContent>
        </DetailsContainer>
        <CRPriceContainer>
          <DetailedCR>
            <ConditionBtn label={<FormattedMessage id="label.condition" />} score={cr} />
            <AutoCheckBtn onClick={() => { changeAutocheckSource(crUrl); setOpenAutocheck(true); }}>
              <span id="autocheck-btn">{labels.autocheckBtn}</span>
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

export default withCookies(withRouter(injectIntl(CarCard)));
