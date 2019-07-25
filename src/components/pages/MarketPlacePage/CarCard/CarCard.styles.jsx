import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import posed from 'react-pose';

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
grid-template-columns: 200px 1.2fr 2fr;
@media only screen and (max-width: 480px){
  
}
`;

export const DetailValue = styled.span`
  font-size: 0.85rem;
  margin-left: 4px;
  & > span {
    font-size: 0.70rem;
  }
  @media only screen and (max-width: 600px) {
    margin-left: 4px;
  }
`;

export const Container = styled.div`
  padding: 0px 16px;
  display: flex;
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

export const DetailsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding: 0 32px 0 32px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media only screen and (max-width: 680px) {
    padding: 4px 8px;
  }
`;

export const CarTitle = styled.div`
  width: 100%;
  height: auto;
  padding: ${props => props.useNew ? '8px' : '4px'};
  display: flex;
  justify-content: ${props => props.useNew ? 'center' : 'flex-start'};;
  align-items: center;
  white-space: ${props => props.useNew ? 'wrap' : 'nowrap'};
  & > span {
    font-weight: ${props => props.useNew ? '400' : '600'};
    font-size: ${props => props.useNew ? '1.18rem' : '0.88rem'};
  }
  @media only screen and (max-width: 768px) {
    justify-content: space-between;
  }

  @media only screen and (max-width: 488px) {
    justify-content: space-between;
    white-space: nowrap;
    & > span {
      font-weight: 600;
      font-size: 1.08rem;
    }
  }
`;

export const DetailTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${props => props.useNew ? '1.0rem' : '0.8rem'};
  @media only screen and (max-width: 480px) {
    margin-top: 12px;
  }
`;

const DetailsView = posed.div({
  open: { height: 'auto' },
  closed: { height: 0 },
});

export const DetailContent = styled(DetailsView)`
  padding: 4px;
  @media only screen and (min-width: 600px) {
    height: auto !important;
  }
  @media only screen and (max-width: 600px) {
    visibility: ${props => props.state};
  }
`;

export const DetailGroup = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const DetailLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  & > span {
    font-size: 0.75rem;
  }
`;