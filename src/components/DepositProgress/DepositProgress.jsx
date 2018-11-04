import React from 'react';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';

function DepositProgress({amount}) {
    return (
        <Container 
            className="d-flex flex-fill justify-content-end mr-3"
            backgroundColor="#3a70b4"
        >
            <Text 
                className="my-2 py-1 pr-3"
                fontSize="0.875em"
                lineHeight={1.36}
                color="#ffffff"
            >
                ($) {amount} / 10 000
            </Text>
        </Container>
    )
}

export default DepositProgress;