import React from 'react';
import Text from '../../styles/Text/Text';
import Select from '../../styles/Select/Select';

function Selection() {
    return (
        <div className="d-flex flex-fill justify-content-end">
            <Text 
                opacity={0.54}
                lineHeight={1.31}
                className="mb-0"
            > 
                Sort By: 
            </Text>
            <Select
                maxWidth="190px" 
                className="border-0 ml-3 flex-fill"
            >
                <option>Price</option>
            </Select>
        </div>
    );
}

export default Selection;