import React from 'react';
import Input from '../../styles/Input/Input';

function BidInput() {
    return (
        <Input
            className="input text-center p-0 mr-3 border-0"
            maxWidth="180px"
            backgroundColor="#3A70B4"
            borderRadius="4px"
            type="number"
            fontColor="#ffffff" 
            placeholder="Your max bid, $"
            placeholderColor="#ffffff"
            placeholderOpacity={0.54}
        />
    );
}

export default BidInput;