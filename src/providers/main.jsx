import React from "react";
import ReactDOM from "react-dom/client";
import App from "../layouts/App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "jotai";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
