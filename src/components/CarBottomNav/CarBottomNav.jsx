import React from 'react';
import styled from 'styled-components';
import PrevBtn from './PrevBtn/PrevBtn';
import NextBtn from './NextBtn/NextBtn';

const Container = styled.div`
  background-color: #fafafa;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  min-height: 72px;
`;

function CarBottomNav({ prev, next }) {
  return (
    <Container>
      <PrevBtn car={prev} />
      <NextBtn car={next} />
    </Container>
  );
}

export default CarBottomNav;
