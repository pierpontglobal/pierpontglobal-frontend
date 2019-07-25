import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

export const CardLayout = styled.div`
background: white;
display: grid;
margin-bottom: 24px;
border-radius: 8px;
box-shadow: rgba(47, 64, 163, 0.3) 0px 0px 20px -10px !important;
width: 100%;
height: 200px;
padding: 16px;
overflow: hidden;
transition: 1s;
grid-template-columns: 1fr 1.2fr 2fr;
@media only screen and (max-width: 480px){
  
}
`;

export const CarouselWrapper = styled(Carousel)`
  margin: -16px 0 0 -16px;
  height: 200px;
`;

export const ImageWrapper = styled(LazyLoadImage)`
  object-fit: cover;
  width: 280px;
  height: 200px;

  @media only screen and (max-width: 480px) {
    height: 200px;
  }
`;