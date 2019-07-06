import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InputWrapper = styled.div`
  & > input {
    border: none;
    padding: 8px;
    box-shadow: 0px 0px 6px 2px rgb(0, 0, 0, 0.08);
    min-width: 120px;
  }
  & > select {
    border: none;
    box-shadow: 0px 0px 6px 2px rgb(0, 0, 0, 0.08);
    text-indent: 8px;
    min-width: 120px;
  }
`;

const Title = styled.div`
  & > span {
    font-weight: 600;
    font-size: 1.08rem;
  }
`;

class ConstructionFilter extends React.Component {
  state = {
    textValue: '',
    selectValue: ''
  }
  handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    this.setState({
      [id]: value,
      selectValue: value,
      textValue: value,
    }, () => {
      this.props.handleChange({id: id, value: value});
    })
  }
  render() {
    const { name, type, options, displayName } = this.props;
    const { textValue, selectValue } = this.state;
    return(
      <Wrapper>
        <Title>
          <span>{displayName}</span>
        </Title>
        <InputWrapper>
          {
            type.toLowerCase() === "select" ? (
              <select id={name} value={selectValue} onChange={this.handleChange}>
                {
                  options.map(opt => (
                    <option value={opt.value}>{opt.name}</option>
                  ))
                }
              </select>
            ) : (
              <input id={name} type="text" value={textValue} onChange={this.handleChange} />
            )
          }
        </InputWrapper>
      </Wrapper>
    )
  }
}

export default ConstructionFilter;