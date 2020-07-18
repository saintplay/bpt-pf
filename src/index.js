import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import esEs from "antd/es/locale/es_ES";

import "antd/dist/antd.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <ConfigProvider locale={esEs}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
