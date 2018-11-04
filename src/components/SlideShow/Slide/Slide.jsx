import React from 'react';

function Slide({image}) {
    return (
        <div className="d-flex" style={{maxHeight: '120px'}}>
            <img 
                className="img-fluid" 
                src={image} 
                alt="Pierpont"
            />
        </div>
    );
}

export default Slide;