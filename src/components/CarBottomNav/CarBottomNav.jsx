import React from 'react';
import PrevBtn from './PrevBtn/PrevBtn';
import NextBtn from './NextBtn/NextBtn';
import Container from '../styles/Container/Container';

function CarBottomNav({
  prev, next,
}) {
  return (
    <Container
      className="d-flex flex-row justify-content-between px-2 px-md-0"
      minHeight="72px"
      backgroundColor="#fafafa"
    >
      <PrevBtn car={prev} />
      <NextBtn car={next} />
    </Container>
  );
}

export default CarBottomNav;
