import React from 'react';
import MorePopUp from './MorePopUp';
import './style.css';

const style = {
  backgroundColor: '#FAFAFA',
  border: 'none',
  width: '16.7px',
  height: '16.7px',
};

const labelStyle = {
  fontSize: '0.875em',
  lineHeight: 1.36,
  color: '#000000',
};

function OptionBtn({
  selected, values, origin, onChange,
}) {
  const valuesComplete = values.map(v => (
    <div key={v.key} className="d-flex mb-2">
      <label style={{ width: '100%' }} className="pure-material-checkbox">
        <input
          type="checkbox"
          defaultChecked={selected.includes(v.key)}
          onChange={
            (value) => {
              onChange(origin, value.target.checked, v.key);
            }
          }
        />
        <span style={{ float: 'left' }}>
          {v.key}

          <div style={{ position: 'absolute', right: 10, top: 0 }}>
            {'('}
            {v.doc_count}
            {')'}
          </div>
        </span>
      </label>
    </div>
  ));

  const valuesPartial = Object.assign([], valuesComplete);

  if (values) {
    return (
      <div className="d-flex flex-column pl-3">
        {valuesPartial.splice(0, 10).map(v => (v))}
        <MorePopUp options={valuesComplete} />
      </div>
    );
  }
  return <div />;
}

export default OptionBtn;
