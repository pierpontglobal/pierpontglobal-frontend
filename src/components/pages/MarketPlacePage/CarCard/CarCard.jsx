import React from 'react';
import { CardLayout, CarouselWrapper, ImageWrapper } from './CarCard.styles'

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
    </CardLayout>
  )
}

export default CarCard;