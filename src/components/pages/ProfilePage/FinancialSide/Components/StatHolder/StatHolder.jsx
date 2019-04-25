import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 0px 4px 2px #ccc;
  padding: 8px;
  display: grid;
  grid-template-rows: 35% 65%;
  max-height: 220px;
  overflow: hidden;
  z-index: 1;
  margin: 16px 8px;
  max-width: 270px;
  @media only screen and (max-width: 768px) {
    max-width: none;
    width: 90%;
    min-height: 160px;
  }
`;

const CardHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  min-width: 250px;
  min-height: 70px;
  font-size: 30px;
  @media only screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

const CardLogo = styled.i`
  color: rgb(89, 89, 89, 0.9) !important;
  font-size: 16px;
`;

const CardTitle = styled.span`
  font-size: 1.05rem;
  padding: 0 10px;
  margin-left: 16px;
  width: 100%;
`;

const CardValue = styled.p`
  font-family: copse economica sans-serif;
`;

function StatHolder ({logo, title, value}) {
  return (
    <Card>
      <CardHeader>
        <CardLogo className={logo} />
        <CardTitle>{ title }</CardTitle>
      </CardHeader>
      <CardContent>
        <CardValue>{value}</CardValue>
      </CardContent>
    </Card>
  );
}

export default StatHolder;
