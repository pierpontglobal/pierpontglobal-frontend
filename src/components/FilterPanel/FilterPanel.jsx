import React from 'react';
import Item from './Item/Item';
import PriceItem from './PriceItem/PriceItem';
import OptionBtn from './OptionBtn/OptionBtn';

const style = {
  backgroundColor: '#FAFAFA',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.18)',
};
function FilterPanel({ availableArguments }) {
  console.log(availableArguments);

  return (
    <div
      className="w-100"
      style={style}
    >
      <Item name="Make">
        <OptionBtn
          selected="Honda"
          values={['Honda', 'Toyota']}
          onChange={onOptionClick}
        />
      </Item>
      <Item name="Model">
        <h3>Hi there</h3>
      </Item>
      <Item name="Trim">
        <h3>Hi there</h3>
      </Item>
      <Item name="Year">
        <h3>Hi there</h3>
      </Item>
      <Item name="Color">
        <h3>Hi there</h3>
      </Item>
      <Item name="Engine">
        {' '}
        <h3>Hi there</h3>
        {' '}
      </Item>
      <Item name="Interior">
        {' '}
        <h3>Hi there</h3>
        {' '}
      </Item>
      <PriceItem />
    </div>
  );
}

const onOptionClick = e => console.log(e.target.value);

export default FilterPanel;
