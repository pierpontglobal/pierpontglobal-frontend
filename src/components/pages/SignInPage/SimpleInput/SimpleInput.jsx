import React from "react";
import { LightInput } from "./SimpleInput.styles";

const SimpleInput = props => (
  <LightInput full={props.value.length > 0}>
    <input {...props} />
    <span>{props.label}</span>
  </LightInput>
);

export default SimpleInput;
