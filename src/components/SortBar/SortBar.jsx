import React from 'react';
import Text from '../styles/Text/Text';
import Selection from './Selection/Selection';
import SearchInput from '../AppNav/SearchInput/SearchInput';

function SortBar({ header, className }) {
  return (
    <div
      className={`d-flex flex-fill flex-row ${className || ''}`}
      style={{
        padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center', justifyItems: 'center',
      }}
    >
      <SearchInput defaultValue={header} className="d-none d-md-flex mr-auto align-self-center" />
      <Selection />
    </div>
  );
}

export default SortBar;
