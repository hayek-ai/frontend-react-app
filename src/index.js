import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import store from "./store/store";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
