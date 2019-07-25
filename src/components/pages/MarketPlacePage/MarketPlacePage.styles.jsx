import styled from 'styled-components';
import posed from 'react-pose';


export const MarketPlaceLayout = styled.div`
overflow: auto;
position: relative;
background: #F7FCFF;
padding-top: 112px;
@media only screen and (max-width: 768px) {
  grid-template-columns: auto;
}
`

const FilterHide = posed.div({
  showF: {
    x: 0
  },
  hideF: {
    x: -296
  }
});

export const FilterLayout = styled(FilterHide)`
background: white;
margin-top: 24px;
border-radius: 0 8px 8px 0;
box-shadow: rgba(47, 64, 163, 0.3) 0px 0px 20px -10px !important;
width: 296px;
max-width: 100vw;
justify-self: start;
align-self: start;
overflow: hidden;
position: absolute;
z-index: 10;
float: left;
`;

export const CarsHolder = styled.div`
width: calc(100% - (356px - 2vw));
position: absolute;
left: 0;
right: 0;
max-width: 1028px;
height: auto;
margin: 8px 16px 16px calc(356px - 2vw);
padding: 32px;
z-index: 0;
@media only screen and (min-width: 1640px) {
  margin: 8px auto;
  padding: 32px;
  width: 100%;
}
@media only screen and (max-width: 768px){
  margin: 8px auto;
  padding: 24px;
  width: 100%;
}
`;
