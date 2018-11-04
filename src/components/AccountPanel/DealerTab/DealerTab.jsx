import React from 'react';
import Container from '../../styles/Container/Container';
import Img from '../../styles/Img/Img';
import Text from '../../styles/Text/Text';

function DealerTab({dealer}) {
    return (
        <Container 
            className="d-flex flex-row pl-3 pt-3 mb-3"
            backgroundColor="#eeeeee"
            backdropFilter="blur(29.8px)"
            webkitBackdropFilter="blur(29.8px)"
        >
            <Img
                className="mr-4 border-0"
                height="40px"
                width="40px"
                borderRadius="50%" 
                src={dealer.image} 
                alt="pierpont"
            />
            <div>
                <Text 
                    className="mb-0"
                    opacity={0.87}
                    fontWeight={600}
                    lineHeight={1.25}
                >
                    {dealer.name}
                </Text>
                <Text 
                    opacity={0.54}
                    fontSize="0.75em"
                    lineHeight={1.33}
                >
                    {dealer.address}
                </Text>
                <Text
                    className="mb-0" 
                    fontSize="0.875em"
                    lineHeight={1.43}
                    fontColor="#3a7abf"
                >
                    {dealer.email}
                </Text>
                <Text 
                    fontSize="0.875em"
                    lineHeight={1.43}
                >
                    {dealer.number}
                </Text>
            </div>
        </Container>
    );
}

export default DealerTab;