import React from 'react';

const editStyle = {
    width: 'auto',
    height: '40px',
    color: '#707070',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#eeeeee',
    fontSize: '14px',
    lineHeight: 1.36,
}

const noEditStyle = {
    width: 'auto',
    height: '40px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#707070',
    fontSize: '14px',
    lineHeight: 1.36
}

const fontStyle = {
    fontSize: '0.875em',
    lineHeight: 1.36,
    color: '#707070',
}

function FormInput({label, editable, value, onChange}) {
    return (
        <div className="d-flex flex-row mb-4 mt-2 pl-3">
            <p className="d-flex flex-fill" style={fontStyle}>
                <span
                    className="align-self-center" 
                    style={{width: '104px'}}
                >
                    {label}:
                </span>
                <input 
                    type="text" 
                    value={value}
                    onChange={onChange}
                    disabled={!editable}
                    style={editable ? editStyle : noEditStyle}
                    className="align-self-start pl-3 ml-4 flex-fill"
                />
            </p> 
        </div>
    );
}

export default FormInput;