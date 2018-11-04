import React from 'react';
import Button from '../styles/Button/Button'; 

function Btn({onClick, children, color, hoverColor, className = '', maxWidth = 'none'}) {
    return (
        <Button
            className={`border-0 ${className}`}
            maxWidth= {maxWidth}
            borderRadius= '4px'
            backgroundColor= {color}
            fontSize= "1em"
            fontWeight= {600}
            lineHeight= {1.31}
            fontColor= "#ffffff"
            hoverColor={hoverColor}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

export default Btn;