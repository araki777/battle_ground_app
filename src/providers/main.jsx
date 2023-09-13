import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "jotai";
import Login from "../layouts/Login";
import Home from "../layouts/Home";
import "../styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/home"} element={<Home />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
