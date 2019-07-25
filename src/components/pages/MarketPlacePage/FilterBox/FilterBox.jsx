import React, { useState, useEffect, useRef } from 'react';
import { FilterBasicLayout, Title, HR, BoxIcons, HiddenBox, TagBox, FormControlLabelNoSpace, LabelBasicLayout, FilterLayout } from './FilterBox.styles';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

const FilterCheckBox = ({ checked, onChange }) => {
  return (
    <Checkbox
      checked={checked}
      onChange={onChange}
      value="checkedA"
      color="action"
      inputProps={{
        'aria-label': 'action checkbox',
      }}
    />
  )
}

const FilterTag = ({ title, remove }) => {
  return (
    <FilterLayout>
      <span>{title}</span>
      <i style={{ cursor: 'pointer' }} onClick={remove} className="material-icons">
        cancel
      </i>
    </FilterLayout>
  )
}

function removeFromArray(array, element) {
  let tempArray = array.slice(0);
  const result = tempArray.filter(function (value, index, arr) {
    return value !== element;
  });
  return result || [];
}

function addToArray(array, element) {
  let tempArray = array.slice(0);
  tempArray.push(element)
  return tempArray;
}

export const FilterMultiple = ({ title = "NaN", filterElements = [], onSelect = (elements) => { } }) => {
  const [selectedElements, setSelectedElements] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return
    }
    onSelect(selectedElements);
  }, [selectedElements])

  return (<>
    <FilterBasicLayout>
      <Title>{title}</Title>
      <BoxIcons pose={expanded ? 'active' : 'inactive'} className="material-icons" onClick={() => setExpanded(!expanded)}>
        expand_more
      </BoxIcons>
      <TagBox>
        {selectedElements.map((element) => {
          return <FilterTag remove={() => setSelectedElements(removeFromArray(selectedElements, element))} title={element} />
        })}
      </TagBox>
      <HiddenBox pose={expanded ? 'show' : 'hide'}>
        <FormGroup column>
          {filterElements.map(({ element, amount }) => {
            const checked = selectedElements.includes(element);
            const handelOnChange = async () => {
              setSelectedElements(checked ? removeFromArray(selectedElements, element) : addToArray(selectedElements, element))
            }
            return (
              <LabelBasicLayout>
                <FormControlLabelNoSpace
                  control={<FilterCheckBox onChange={handelOnChange} />}
                  label={
                    <span>{element}</span>
                  }
                  checked={checked}
                />
                <span>({amount})</span>
              </LabelBasicLayout>
            );
          })}
        </FormGroup>
      </HiddenBox>
    </FilterBasicLayout>
    <HR />
  </>
  );
}
