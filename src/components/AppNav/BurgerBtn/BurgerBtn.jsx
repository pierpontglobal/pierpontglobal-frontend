import React from 'react';

function BurgerBtn({onClick}) {
    return (
        <i 
            className="fas fa-bars img-fluid align-self-center d-md-none"
            onClick={onClick}
            style={{
                fontSize: '1.7em',
                opacity: 0.85
            }} 
        />
    );
}

export default BurgerBtn;