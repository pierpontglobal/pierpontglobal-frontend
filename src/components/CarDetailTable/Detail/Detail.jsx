import React from 'react';
import Container from '../../styles/Container/Container';
import Span from '../../styles/Span/Span';
import _ from 'lodash';

function Detail({stripe, title, text}) {
    return (
        <Container
            className="mb-0 pl-3" 
            height="28px"
            fontSize="0.875em"
            lineHeight={2}
            backgroundColor={stripe && '#f2f2f2'}
        >
            <Span fontWeight={600}>
                {_.upperFirst(title)}:&nbsp;
            </Span>
            {text}
        </Container>
    )
}

export default Detail;