import React from 'react';

function Divider({className}) {
    return (
        <div className={`py-1 mx-2 ${className}`}>
            <div 
                style={{
                    width: '0',
                    height: '2em',
                    borderLeft: 'solid 1px #707070'
                }}
            />
        </div>
    );
}

export default Divider;