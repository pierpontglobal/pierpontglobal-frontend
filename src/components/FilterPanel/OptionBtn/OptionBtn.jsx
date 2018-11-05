import React from 'react';
import './style.css';

const style = {
    backgroundColor: '#FAFAFA',
    border: "none",
    width: '16.7px',
    height: '16.7px'
}

const labelStyle = {
    fontSize: '0.875em',
    lineHeight: 1.36,
    color: '#000000'
}
function OptionBtn({selected, values, onChange}) {
    return (
        <div className="d-flex flex-column pl-3">
            {values.map(v =>
                <div className="d-flex mb-2">
                    <input
                        className="mr-3 OptionBtn"
                        style={style} 
                        type="radio"
                        value={v}
                        checked={selected === v}
                        onChange={onChange} 
                    />
                    <label 
                        style={labelStyle}
                        className="align-self-center"
                    >
                        {v}
                    </label>
                </div>)}
        </div>
    );
}

export default OptionBtn;