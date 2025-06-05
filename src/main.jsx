import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // ⚠️ this must exist (or be removed if not using)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
