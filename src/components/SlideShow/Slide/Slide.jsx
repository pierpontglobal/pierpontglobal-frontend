import React from 'react';

function Slide({ image }) {
  return (
    <div className="d-flex" style={{ maxHeight: '120px', alignItems: 'center' }}>
      <img
        style={{
          width: '100%',
          height: '100%',
        }}
        className="img-fluid"
        src={image}
        alt="Pierpont"
      />
    </div>
  );
}

export default Slide;
