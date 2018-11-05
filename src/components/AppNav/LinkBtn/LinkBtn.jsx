import React from 'react';

const linkStyle = {
    fontWeight: 600,
    opacity: 0.54,
    color: '#000000',
    lineHeight: 1.31
}

function LinkBtn({children, selected, className = ''}) {
    return (
        <a 
            className={className}
            style={linkStyle} 
            href="#"
        >
            {children} 
        </a>
    );
}

export default LinkBtn;