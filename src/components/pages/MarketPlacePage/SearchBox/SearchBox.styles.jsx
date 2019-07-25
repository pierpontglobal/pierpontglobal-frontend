import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

export const SearchInput = styled.input`
background: white;
outline: none;
border: none;
cursor: text;
width: 100%;
`;

export const AnimatedBoxIcons = posed.i({
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 200 }
  },
  invisible: {
    rotate: 360,
    opacity: 0,
    transition: { duration: 200 }
  }
});

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

export const SearchBoxLayout = styled.span`
position: absolute;
margin: 40px auto;
left: 0;
right: 0;
display: grid;
overflow: hidden;
padding: 0 20px;
height: 72px;
font-size: 24px;
border-radius: 8px;
width: 90%;
max-width: 768px;
box-shadow: rgba(47, 64, 163, 0.3) 0px 0px 20px -10px !important;
background: white;
grid-template-columns: auto 40px 40px;
align-items: center;
z-index: 100;
@media only screen and (max-width: 768px) {
  grid-template-columns: auto 40px 40px 40px;
}
`;
