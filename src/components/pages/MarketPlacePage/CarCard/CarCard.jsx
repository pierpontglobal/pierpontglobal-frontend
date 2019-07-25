import React from 'react';
import { CardLayout, CarouselWrapper, ImageWrapper, DetailsContainer, DetailValue, DetailTitle, CarTitle, DetailContent, DetailGroup, Detail, DetailLabel } from './CarCard.styles'
import { FormattedMessage, injectIntl } from 'react-intl';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const CarCard = ({ car }) => {
  return (
    <CardLayout>
      <CarouselWrapper
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        data-cy="car-carousel"
      >
        {car.images.map((image, i) => (
          <ImageWrapper
            effect="blur"
            id="image-carousel"
            key={i}
            src={image}
            threshold={1000}
            delayTime={1000}
          />
        ))}
      </CarouselWrapper>
      <DetailsContainer>
        <DetailTitle>
          <CarTitle>
            <span>{car.title}</span>
          </CarTitle>
        </DetailTitle>
        <input hidden name="VIN" value={car.vin} readOnly />
        <DetailContent>
          <DetailGroup>
            <Detail>
              <DetailLabel>
                <FormattedMessage id="car.vin" />:
              </DetailLabel>
              <DetailValue>{car.vin}</DetailValue>
            </Detail>
            <Detail>
              <DetailLabel>
                <FormattedMessage id="car.odometer" />
              </DetailLabel>
              <DetailValue>{numberWithCommas(car.odometer)}</DetailValue>
            </Detail>
          </DetailGroup>
          <DetailGroup>
            <Detail>
              <DetailLabel>
                <FormattedMessage id="car.engine" />
              </DetailLabel>
              <DetailValue>{car.engine}</DetailValue>
            </Detail>
            <Detail>
              <DetailLabel>
                <FormattedMessage id="car.transmission" />
              </DetailLabel>
              <DetailValue>{car.transmission}</DetailValue>
            </Detail>
          </DetailGroup>
        </DetailContent>
      </DetailsContainer>
    </CardLayout>
  )
}

export default injectIntl(CarCard);