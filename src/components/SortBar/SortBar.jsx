import React from 'react';
import PropTypes from 'prop-types';
import Selection from './Selection/Selection';
import SearchInput from '../AppNav/SearchInput/SearchInput';

function SortBar({ header, className }) {
  const query = header.length > 0 ? header : '';
  return (
    <div
      className={`d-flex flex-fill flex-row ${className || ''}`}
      style={{
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
      }}
    >
      <SearchInput defaultValue={query} className="d-none d-md-flex mr-auto align-self-center" />
    </div>
  );
}

SortBar.propTypes = {
  header: PropTypes.any,
  className: PropTypes.string,
};

SortBar.defaultProps = {
  header: {},
  className: '',
};

export default SortBar;
