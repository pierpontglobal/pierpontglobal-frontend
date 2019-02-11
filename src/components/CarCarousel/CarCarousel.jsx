import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './styles.css';

function CarCarousel({ images }) {
  return (
    <div>
      <ImageGallery
        items={images.map(i => ({ original: i, thumbnail: `${i}?width=354&height=200` }))}
        disableThumbnailScroll
        showPlayButton={false}
      />
    </div>
  );
}

export default CarCarousel;
