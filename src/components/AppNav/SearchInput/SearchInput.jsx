import React from 'react';
import Input from '../../styles/Input/Input';

function SearchInput({className}) {
    return (
        <Input
            className={`w-100 h-100 pl-2 border-0 ${className}`} 
            type="text"
            backgroundColor="#EEEEEE"
            lineHeight={1.31}
            fontColor="#707070"
            maxWidth="260px"
            maxHeight="40px"
            borderRadius="4px" 
            placeholder="Search"
        />
        
    );
}

export default SearchInput;