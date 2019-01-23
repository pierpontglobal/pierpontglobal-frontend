import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './styles.css';

function CarCarousel({ images }) {
  return (
    <div className="mb-3">
      <ImageGallery
        items={images.map(i => ({ original: i, thumbnail: `${i}?width=354&height=200` }))}
        disableThumbnailScroll
        showPlayButton={false}
        onSlide={(_index) => {
          const containers = window.document.getElementsByClassName('image-gallery-image');
          for (let i = 0; i < containers.length; i += 1) {
            const imageTemp = containers[i].getElementsByTagName('img')[0];
            if (imageTemp.naturalWidth < imageTemp.naturalHeight) {
              imageTemp.classList.add('portrait');
            }
          }
        }}
      />
    </div>
  );
}

export default CarCarousel;
