import "phoenix_html"
import socket from "./socket"
import React from "react";
import {render} from "react-dom";
import { Provider } from 'react-redux'
import store from "./web/store/store";
import App from "./web/containers/App"

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
)
