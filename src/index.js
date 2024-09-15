import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Css/Components/button.css";
import "./Css/Components/alart.css";
import "./Css/Components/loading.css";
import "./Css/Components/googel.css";
import "./Pages/Auth/Auth.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { HashRouter, BrowserRouter } from "react-router-dom";
import MenuContext from "./Context/MenuContext";
import WindowContext from "./Context/WindowContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <HashRouter>
          <App />
        </HashRouter>
      </MenuContext>
    </WindowContext>
  </React.StrictMode>
);
