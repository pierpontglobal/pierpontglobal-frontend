import React from "react";
import { LightInput } from "./SimpleInput.styles";

const SimpleInput = props => (
  <LightInput full={props.value.length > 0}>
    <input type={props.type} onChange={props.onChange} />
    <span>{props.label}</span>
  </LightInput>
);

export default SimpleInput;
