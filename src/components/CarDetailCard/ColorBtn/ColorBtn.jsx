import React from 'react';
import styled from 'styled-components';

const ColorDiv = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  margin-left: 4px; /* Adjusting ml-1 */
  align-self: center;
  padding-top: 12px; /* Adjusting pt-3 */
  border: 0;
`;

function ColorBtn({ color }) {
  return <ColorDiv color={color} />;
}

export default ColorBtn;
