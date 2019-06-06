import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchInput from '../AppNav/SearchInput/SearchInput';
import { FormattedMessage } from 'react-intl';

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
        marginTop: '10px',
      }}
    >
      <SearchInput defaultValue={query} />
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
