import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { App } from "./containers/app/App";
import {Header} from "./components/header/Header";

ReactDOM.render(
  <HashRouter>
    <Header />
    <App />
  </HashRouter>,
  document.getElementById("root")
);
