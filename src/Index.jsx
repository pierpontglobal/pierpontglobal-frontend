// @flow

import React from "react";
import { render } from "react-dom";
import App from "./App";

const appDiv = document.getElementById("app");

if (appDiv == null) {
  throw new Error("Div not found");
}

const renderApp = () => {
  render(<App />, appDiv);
};
renderApp();

if (module.hot) {
  module.hot.accept("./App", () => {
    renderApp();
  });
}
