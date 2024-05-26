import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CountProvider } from "./assets/store/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CountProvider>
    <App />
  </CountProvider>
);
