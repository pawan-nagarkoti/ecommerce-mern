import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UIProvider } from "./contexts/UIContext.jsx";
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <UIProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </UIProvider>
  </BrowserRouter>
  // </StrictMode>
);
