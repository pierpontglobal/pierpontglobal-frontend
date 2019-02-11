import React from 'react';
import './style.css';

const style = {
  borderRadius: '4px',
  backgroundColor: '#3e78c0',
  maxHeight: '24px',
  fontSize: '0.75em',
  fontWeight: 'bold',
  lineHeight: 1.33,
  color: '#ffffff',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.18)',
  borderStyle: 'none',
};
function AutoCheckBtn({ crUrl, className }) {
  return (
    <button
      type="button"
      className={`AutoCheckBtn ${className && className}`}
      style={style}
      onClick={() => (window.open(crUrl, '', 'width=500,height=500'))}
    >
    AutoCheck
    </button>
  );
}

export default AutoCheckBtn;
