import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store";

import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  rootElement
);
