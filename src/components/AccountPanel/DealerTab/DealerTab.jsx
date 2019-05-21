import React from 'react';
import styled from 'styled-components';
import Container from '../../styles/Container/Container';
import Text from '../../styles/Text/Text';
import Building from './building.svg';

const TabBottom = styled.div`
  content: '';
  width: 0;
  height: 0;
  border-left: 180px solid transparent;
  border-right: 120px solid transparent;
  border-top: 30px solid #eeeeee;
  clear: both;
  margin-bottom: 16px;
`;

function DealerTab({ dealer }) {
  return (
    <>
      <Container
        className="d-flex flex-row pl-3 pt-3"
        backgroundColor="#eeeeee"
        backdropFilter="blur(29.8px)"
        webkitBackdropFilter="blur(29.8px)"
        style={{
          paddingBottom: '15px',
          paddingTop: '10px',
          justifyContent: 'space-around',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          className="border-0"
          height="70px"
          width="70px"
          src={(dealer && dealer.image) ? dealer.image || Building : Building}
          alt="pierpont"
        />
        <div style={{
          maxWidth: '160px',
        }}
        >
          <Text
            className="mb-0"
            opacity={0.87}
            fontWeight={600}
            lineHeight={1.25}
          >
            { (dealer && dealer.name) ? dealer.name : ''}
          </Text>
          <Text
            opacity={0.54}
            fontSize="0.75em"
            lineHeight={1.33}
          >
            { (dealer && dealer.address) ? dealer.address : ''}
          </Text>
          <Text
            className="mb-0"
            fontSize="0.875em"
            lineHeight={1.43}
            fontColor="#3a7abf"
            style={{
              cursor: 'pointer',
            }}
            onClick={() => { window.location.href = `mailto:${dealer.email}`; }}
          >
            { (dealer && dealer.email) ? dealer.email : ''}
          </Text>
          <Text
            fontSize="0.875em"
            lineHeight={1.43}
          >
            { (dealer && dealer.number) ? dealer.number : ''}
          </Text>
        </div>
      </Container>
      <TabBottom />
    </>
  );
}

export default DealerTab;
