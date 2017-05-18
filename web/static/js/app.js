import "phoenix_html"
import socket from "./socket"
import React from "react";
import {render} from "react-dom";
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import "font-awesome/scss/font-awesome.scss";
import "../css/app.scss";
import store from "./web/store/store";
import App from "./web/containers/App";

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}/>
    </Router>
  </Provider>,
  document.getElementById("app")
)
