import React from 'react';

const style = {
    fontSize: '1.15em',
    fontWeight: 700
}
function Tab({icon, children}) {
    return (
        <p 
            className="text-center"
            style={style}
        >
            <i className={icon} /> {children}
        </p>
    );
}

export default Tab;