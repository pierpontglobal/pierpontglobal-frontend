import React from 'react';
import Container from '../styles/Container/Container';

function ConditionBtn({score, className}) {
    return (
        <Container 
            className={`d-flex justify-content-between border-0 ${className ? className : ''}`}
            maxHeight="24px"
            borderRadius="4px"
            fontSize="0.8125em"
            lineHeight={1.31}
            backgroundColor="#eeeeee"
        >
            <p className="flex-fill mb-0 align-self-center text-center">Condition</p>
            <Container
                className="d-flex flex-fill py-2 border-0"
                maxWidth="24px"
                borderRadius="4px"
                backgroundColor="#18b70b"
                fontSize="0.75em"
                fontWeight="bold"
                lineHeight={1.33}
                fontColor="#ffffff"
            >
                <p className=" flex-fill mb-0 align-self-center text-center">{score}</p>
            </Container>
        </Container> 
    );
}

export default ConditionBtn;