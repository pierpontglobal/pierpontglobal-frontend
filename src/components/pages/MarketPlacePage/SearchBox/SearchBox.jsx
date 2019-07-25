import React, { useState } from 'react'
import { SearchInput, SearchBoxLayout, BoxIcons } from './SearchBox.styles'
import MediaQuery from 'react-responsive';

function SearchBox({ handelChange, toggleFilter }) {
  const [text, setText] = useState('');

  return <SearchBoxLayout>
    <SearchInput placeholder="Search terms" value={text} onChange={(node) => setText(node.target.value)} type='text' />
    <BoxIcons
      className="material-icons"
      pose={text.length > 0 ? 'visible' : 'invisible'}
      type="close"
      onClick={() => { setText('') }}>
      close
    </BoxIcons>
    <BoxIcons onClick={() => { handelChange(text) }} className="material-icons" pose='visible' type="search">search</BoxIcons>

    <MediaQuery maxDeviceWidth={768}>
      <BoxIcons onClick={() => { toggleFilter() }} className="material-icons" pose='visible' type="search">filter_list</BoxIcons>
    </MediaQuery>
  </SearchBoxLayout>
}

export default SearchBox;
