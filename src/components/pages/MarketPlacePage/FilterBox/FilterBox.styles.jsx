import styled from 'styled-components';
import posed from 'react-pose';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const FilterBasicLayout = styled.div`
width: 100%;
padding: 16px;
display: grid;
grid-template-columns: 85% 15%;
grid-template-rows: auto;
align-items: center;
overflow: hidden;
`;

export const Title = styled.h6`
margin: 0;
`;

export const HR = styled.hr`
margin: 0;
`;

export const AnimatedBoxIcons = posed.i({
  active: {
    rotate: 180,
    transition: { duration: 50 }
  },
  inactive: {
    rotate: 0,
    transition: { duration: 50 }
  }
});

export const Box = posed.div({
  hide: {
    height: 0
  },
  show: {
    height: 'auto'
  }
});

export const HiddenBox = styled(Box)`
width: 100%;
height: 0;
display: flex;
justify-content: left;
flex-direction: column;
overflow: hidden;
grid-column-start: 1;
grid-column-end: 3;
`;

export const TagBox = styled.div`
width: 100%;
height: auto;
overflow: hidden;
grid-column-start: 1;
grid-column-end: 3;
`;

export const BoxIcons = styled(AnimatedBoxIcons)`
border-radius: 50%;
display: flex !important;
align-items: center;
justify-content: center;
justify-items: center;
align-content: center;
line-height: 48px;
width: 40px;
height: 40px;
transition: 0.5s;
cursor: pointer;
:hover {
  background: #F5F5F5;
}
:active{
  background: #ECECEC;
}
`;

export const LabelBasicLayout = styled.div`
width: 100%;
display: grid;
grid-template-columns: 85% 15%;
align-items: center;
`;

export const FormControlLabelNoSpace = styled(FormControlLabel)`
margin: 0 !important;
`;

export const FilterLayout = styled.div`
margin: 4px;
display: grid;
float: left;
padding: 8px 0 8px 8px;
height: 32px;
border-radius: 12px;
font-weight: bold;
color: white;
background: #28adf6;
width: auto;
justify-content: center;
justify-items: center;
align-items: center;
align-content: center;
grid-template-columns: auto 30px;
`;