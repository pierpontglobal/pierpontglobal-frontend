import React, { useEffect } from 'react';
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
  useEffect(() => {
    setTimeout(() => {
      window.changeWWPosition('moveToTop');
    }, 1000);
    return () => {
      setTimeout(() => {
        window.changeWWPosition('normal');
      }, 1000);
    };
  }, []);
  return (
    <Container>
      <PrevBtn car={prev} />
      <NextBtn car={next} />
    </Container>
  );
}

export default CarBottomNav;
