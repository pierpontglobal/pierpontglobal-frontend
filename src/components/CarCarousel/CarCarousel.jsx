import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function CarCarousel({images}) {
  return (
    <div className="mb-3">
      <ImageGallery
        items={images.map(i => ({original: i, thumbnail: i}))}
        disableThumbnailScroll={true}
        showPlayButton={false}
      />
    </div>
  );
}

export default CarCarousel;