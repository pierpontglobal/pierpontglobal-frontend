import React from 'react';

function Underline({children, className}) {
    return (
        <div 
            className={`d-flex px-3 py-3 border-bottom ${className ? className : ''}`}
            style={{marginBottom: '15px'}}
        >
            {children}
        </div>
    );
}

export default Underline;