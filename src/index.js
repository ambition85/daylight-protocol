import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/reset.css";
import "./assets/css/global.css";
import "aos/dist/aos.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
