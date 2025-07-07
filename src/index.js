import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { store } from "./app/store";

import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
setTimeout(() => {
  console.clear();
}, 2000);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

serviceWorkerRegistration.register();
