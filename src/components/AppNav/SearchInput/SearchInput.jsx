import React from 'react';
import Input from '../../styles/Input/Input';

let searchBox = null;

function search(e) {
  if (e.key === 'Enter') {
    window.location.href = `/marketplace?q=${searchBox.value}`;
  }
}

function SearchInput({ className, defaultValue }) {
  return (
    <Input
      className={`w-100 h-100 pl-2 border-0 ${className}`}
      type="text"
      backgroundColor="#EEEEEE"
      lineHeight={1.31}
      fontColor="#707070"
      maxWidth="260px"
      maxHeight="40px"
      borderRadius="4px"
      placeholder="Search"
      defaultValue={defaultValue}
      ref={(node) => { searchBox = node; }}
      onKeyPress={search}
    />

  );
}

export default SearchInput;
