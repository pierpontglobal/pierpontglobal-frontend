import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import FilterList from '@material-ui/icons/FilterList';
import styled from 'styled-components';
import SearchInput from '../AppNav/SearchInput/SearchInput';

const FilterIcon = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: flex-end;
  }
`;

function SortBar({ header, className, filterPanelToggle }) {
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
      <FilterIcon>
        <IconButton color="primary" onClick={filterPanelToggle}>
          <FilterList />
          <span style={{ fontSize: '0.75em' }}>Filters</span>
        </IconButton>
      </FilterIcon>
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
