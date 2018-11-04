import React from 'react';
import Text from '../styles/Text/Text';
import Selection from './Selection/Selection';

function SortBar({header, className}) {
    return (
        <div 
            className={`d-flex flex-fill flex-row pr-3 ${className ? className : ''}`}
        >
            <Text
                className="d-flex mb-0 flex-fill" 
                fontWeight={600}
                lineHeight={1.31}
            >
                {header}
            </Text>
            <Selection />
        </div>
    );
}

export default SortBar;