import React from 'react';
import RBCarousel from 'react-bootstrap-carousel';
import Slide from './Slide/Slide';
import './styles.css';

function SlideShow({ images }) {
  return (
    <RBCarousel
      autoplay={false}
      slideshowSpeed={2000}
      indicators={false}
      version={4}
      style={{

      }}
    >
      {images.map((u, i) => <Slide key={i} image={u} />)}
    </RBCarousel>
  );
}

export default SlideShow;
